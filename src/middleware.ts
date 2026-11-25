import { NextResponse, type NextRequest } from "next/server";

// Nonce-based Content-Security-Policy, following the Next.js CSP guide
// (https://nextjs.org/docs/app/guides/content-security-policy).
//
// A fresh nonce is generated for every page request and passed to Next.js in
// the request's Content-Security-Policy header. Next.js reads it from there and
// adds it to every script it renders (framework chunks, RSC payload), so
// script-src needs no 'unsafe-inline'. 'strict-dynamic' lets those trusted
// scripts load further scripts (e.g. Calendly's widget). The root layout reads
// headers(), which renders each page per request so the nonce is fresh.
//
// The other security headers (HSTS, X-Frame-Options, COOP, CORP, ...) are set
// for every route in next.config.mjs. Only the CSP lives here, because it must
// change on every request.
//
// Third parties allowed: Supabase (website + HRMS projects, data), Calendly
// (booking widget), YouTube (video modal), Google Maps (contact map),
// LinkedIn (post embeds). img-src allows any https image (Unsplash, CMS images).
const isDev = process.env.NODE_ENV !== "production";

function buildCsp(nonce: string) {
  return [
    "default-src 'self'",
    // 'self' and the Calendly host are fallbacks for browsers without
    // 'strict-dynamic' support; modern browsers rely on the nonce.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://assets.calendly.com${isDev ? " 'unsafe-eval'" : ""}`,
    // Emotion/MUI inject <style> tags and framer-motion sets style attributes,
    // so inline styles stay allowed.
    "style-src 'self' 'unsafe-inline' https://assets.calendly.com",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    "media-src 'self' blob:",
    `connect-src 'self' https://*.supabase.co wss://*.supabase.co https://calendly.com https://*.calendly.com${isDev ? " ws:" : ""}`,
    "frame-src https://calendly.com https://*.calendly.com https://www.youtube.com https://www.youtube-nocookie.com https://www.google.com https://maps.google.com https://www.linkedin.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");
}

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      // Pages only: skip API routes, Next.js static assets, image optimisation
      // and any file with an extension (images, video, robots.txt, sitemap.xml).
      source: "/((?!api|_next/static|_next/image|.*\\..*).*)",
      // Router prefetches don't render a document, so they need no nonce.
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};

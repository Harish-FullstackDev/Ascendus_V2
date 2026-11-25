// Security headers sent on every route. The Content-Security-Policy is not set
// here: it carries a per-request nonce, so src/middleware.ts builds it.
//
// No Access-Control-Allow-Origin is sent: pages and API routes are only called
// from this site, which never needs CORS. Cross-Origin-Embedder-Policy is left
// out on purpose: require-corp would block the Calendly, YouTube, Maps and
// LinkedIn embeds.
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
  devIndicators: false,
  trailingSlash: true,
  images: {
    // Serve AVIF first (smallest), WebP as fallback for browsers without AVIF.
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/contact-us', destination: '/contact/', permanent: true },
      { source: '/bookacall', destination: '/book-a-consultation/', permanent: true },
      { source: '/termsOfService', destination: '/legal/terms/', permanent: true },
      { source: '/privacyPolicy', destination: '/legal/privacy/', permanent: true },
      { source: '/securityPrivacyPolicy', destination: '/legal/security/', permanent: true },
      { source: '/cookiePolicy', destination: '/legal/cookies/', permanent: true },
      // The What We Do section was removed; send its old URLs to Services.
      { source: '/whatWeDo/:path*', destination: '/services/', permanent: true },
      { source: '/what-we-do/:path*', destination: '/services/', permanent: true },
      { source: '/who-we-are', destination: '/about-us/', permanent: true },
      { source: '/ascenduspartner', destination: '/sst-partner/', permanent: true },
      { source: '/ascenduserrors', destination: '/sst-errors/', permanent: true },
      // Applications are taken by the HRMS portal (Apply Now on each job page).
      { source: '/careers/apply', destination: '/careers/', permanent: false },
    ];
  },
};

export default nextConfig;

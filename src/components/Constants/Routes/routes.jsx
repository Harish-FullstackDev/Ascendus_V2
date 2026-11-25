export const validRoutes = [
  "/",
  "/blog/",
  "/case-studies/",
  "/whitepapers/",
  "/industry-reports/",
  "/about-us/",
  "/book-a-consultation/",
  "/careers/",
  "/contact/",
  "/legal/privacy/",
  "/sst-errors/",
  "/sst-partner/",
  "/legal/terms/",
  "/legal/disclaimer/",
  "/trustcenter/",
  "/services/",
  "/solutions/",
];

// Dynamic routes that reuse CareersLayout's dark parallax hero (job
// description pages, the application form) need the same navbar theme as
// "/careers/" itself, but their slug can't be listed literally above.
// Every /services/* and /solutions/* page opens on the same dark hero, so
// they share the dark navbar theme too.
export const isValidRoute = (pathname) =>
  validRoutes.includes(pathname) ||
  pathname.startsWith("/careers/") ||
  pathname.startsWith("/services/") ||
  pathname.startsWith("/solutions/");

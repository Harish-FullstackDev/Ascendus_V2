// Candidate accounts, applications and the apply form live on the external
// HRMS portal. No trailing slash; the portal handles sign-in (it adds ?next=
// itself), so links never carry login params. NEXT_PUBLIC_HRMS_URL (.env) is
// the same origin lib/jobs.js uses, so both always point at one portal; the
// literal is the fallback when it is not set.
export const HRMS_PORTAL_URL = (process.env.NEXT_PUBLIC_HRMS_URL || "https://hrmsportal-virid.vercel.app").replace(/\/$/, "");

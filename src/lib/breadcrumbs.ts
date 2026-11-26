// Maps a URL path segment to its display label for breadcrumb trails.
// Add an entry here whenever a new route is created.
export const ROUTE_LABELS: Record<string, string> = {
  "about-us": "About Us",
  "why-ascendus": "Why Ascendus",
  services: "Services",
  solutions: "Solutions",
  sap: "SAP & Enterprise Applications",
  microsoft: "Microsoft & Cloud Solutions",
  "digital-engineering": "Digital Engineering",
  "digital-transformation": "Digital Transformation",
  "e-invoicing": "E-Invoicing",
  "s4hana-transformation": "SAP S/4HANA Transformation",
  implementation: "Implementation",
  "migration-conversion": "Migration & System Conversion",
  "application-management": "Application Management Services",
  "support-maintenance": "Support & Maintenance",
  "rollout-services": "Rollout Services",
  btp: "SAP BTP",
  integration: "SAP Integration",
  ariba: "SAP Ariba",
  "analytics-reporting": "SAP Analytics & Reporting",
  ehs: "SAP EHS",
  "customer-experience": "SAP Customer Experience",
  "time-and-material": "SAP T&M",
  "saudi-arabia": "Saudi Arabia – ZATCA",
  uae: "UAE",
  "sap-integration": "SAP E-Invoicing Integration",
  "erp-integration": "ERP E-Invoicing Integration",
  "invoice-automation": "Invoice Automation",
  azure: "Microsoft Azure",
  "microsoft-365": "Microsoft 365",
  "power-bi-analytics": "Power BI & Analytics",
  "power-platform": "Power Platform",
  sharepoint: "SharePoint Solutions",
  "cloud-migration": "Cloud Migration & Management",
  "dynamics-365": "Microsoft Dynamics 365",
  rollout: "Rollout",
  aws: "Amazon Web Services",
  "google-cloud": "Google Cloud Platform",
  "custom-software": "Custom Software Development",
  "enterprise-applications": "Enterprise Application Development",
  "product-engineering": "Product Engineering",
  "saas-development": "SaaS Development",
  "web-applications": "Web Application Development",
  "mobile-applications": "Mobile Application Development",
  "api-integration": "API Development & Integration",
  "ui-ux-design": "UI/UX Design",
  "application-modernisation": "Application Modernisation",
  "quality-engineering": "Quality Engineering & Testing",
  "business-process-optimisation": "Business Process Optimisation",
  "technology-advisory": "Enterprise Technology Advisory",
  "data-analytics": "Data & Analytics",
  "ai-automation": "AI & Intelligent Automation",
  cybersecurity: "Cybersecurity Solutions",
  iot: "Internet of Things",
  "infrastructure-management": "IT Infrastructure Management",
  "managed-it-services": "Managed IT Services",
  "application-support": "Application Support Services",
  "website-development": "Enterprise Website Development",
  "ecommerce-development": "E-Commerce Development",
  "s4hana-on-premise": "S/4HANA On-Premise",
  "s4hana-public-cloud": "S/4HANA Public Cloud",
  "s4hana-private-cloud": "S/4HANA Private Cloud",
  "business-technology-platform": "Business Technology Platform",
  "analytics-cloud": "Analytics Cloud",
  "customer-relationship-management": "Customer Relationship Management",
  "finance-and-controlling": "Finance & Controlling",
  "human-capital-management": "Human Capital Management",
  successfactors: "SuccessFactors",
  procurement: "Procurement",
  "supply-chain-management": "Supply Chain Management",
  "book-a-consultation": "Book a Consultation",
  legal: "Legal",
  terms: "Terms & Conditions",
  privacy: "Privacy Policy",
  security: "Security & Privacy Policy",
  cookies: "Cookie Policy",
  disclaimer: "Disclaimer",
  privacyCommitment: "Privacy Commitment",
  "ascendus-partner": "Ascendus Partner Program",
  partnership: "Partnership",
  "sst-errors": "Errors",
  trustcenter: "Trust Center",
  whitepapers: "Whitepapers",
  "case-studies": "Case Studies",
  "industry-reports": "Industry Reports",
  careers: "Careers",
  "open-positions": "Open Positions",
  apply: "Job Application",
  blog: "Blog",
  contact: "Contact",
};

// Labels for a full path, for segments whose ROUTE_LABELS entry means
// something else elsewhere (e.g. "security" is also /legal/security).
const PATH_LABELS: Record<string, string> = {
  "/services/microsoft/security": "Microsoft Security",
};

// Path prefixes that are only grouping folders, with no page of their own.
// Their crumb is shown as plain text and left out of the JSON-LD.
const NO_PAGE = new Set(["/legal"]);

export type BreadcrumbItem = { name: string; item: string | null };

// Builds breadcrumb items (Home first) from a path like "/services/sap/application-management".
// Falls back to a title-cased version of the segment when it isn't in ROUTE_LABELS.
export function buildBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split("/").filter(Boolean);
  const items: BreadcrumbItem[] = [{ name: "Home", item: "/" }];

  let running = "";
  for (const segment of segments) {
    running += `/${segment}`;
    const label =
      PATH_LABELS[running] ||
      ROUTE_LABELS[segment] ||
      segment
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    // Trailing slash to match the canonical URLs (trailingSlash is on), so
    // crumb links don't go through a 308 redirect.
    items.push({ name: label, item: NO_PAGE.has(running) ? null : `${running}/` });
  }

  return items;
}

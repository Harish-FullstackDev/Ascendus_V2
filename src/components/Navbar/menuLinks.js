// Shared by the navbar mega menu, the footer columns and the /services and
// /solutions landing pages, so all of them always list the same pages.
//
// Each top-level entry is a category (SAP, Cloud, ERP…). Categories are not
// pages of their own: their href is an anchor on the landing page. An item
// either links to a page (href) or groups further items (children), e.g.
// SAP → Implementation → RISE with SAP.
export const SERVICES = [
  {
    id: "sap",
    name: "SAP",
    href: "/services#sap",
    items: [
      {
        name: "Implementation",
        children: [
          { name: "RISE with SAP", href: "/services/rise-with-sap" },
          { name: "GROW with SAP", href: "/services/grow-with-sap" },
        ],
      },
      {
        name: "Line of Business",
        children: [
          { name: "SAP SuccessFactors", href: "/services/sap-successfactors" },
          { name: "SAP Ariba", href: "/services/sap-ariba" },
          { name: "SAP CX", href: "/services/sap-cx" },
          { name: "SAP Analytics Cloud", href: "/services/sap-analytics-cloud" },
        ],
      },
      { name: "AMS", href: "/services/sap-ams" },
      { name: "Conversion (ECC – S/4HANA)", href: "/services/sap-conversion-ecc-to-s4hana" },
      { name: "Rollout", href: "/services/sap-rollout" },
      { name: "Migration", href: "/services/sap-migration" },
      { name: "T&M", href: "/services/sap-tm" },
    ],
  },
  {
    id: "microsoft",
    name: "Microsoft",
    href: "/services#microsoft",
    items: [
      {
        name: "Implementation",
        children: [
          { name: "Microsoft Dynamics 365", href: "/services/microsoft-dynamics-365" },
          { name: "Power BI", href: "/services/power-bi" },
        ],
      },
      { name: "AMS", href: "/services/microsoft-ams" },
      { name: "Migration", href: "/services/microsoft-migration" },
      { name: "Rollout", href: "/services/microsoft-rollout" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud",
    href: "/services#cloud",
    items: [
      { name: "Google Cloud Platform", href: "/services/google-cloud-platform" },
      { name: "Amazon Web Services", href: "/services/amazon-web-services" },
      { name: "Azure", href: "/services/azure" },
    ],
  },
  {
    id: "digital-transformation",
    name: "Digital Transformation",
    href: "/services#digital-transformation",
    items: [
      { name: "Robotic Process Automation", href: "/services/robotic-process-automation" },
      { name: "AI & Machine Learning", href: "/services/ai-ml" },
      { name: "E-Invoicing", href: "/services/e-invoicing" },
      { name: "Internet of Things", href: "/services/internet-of-things" },
      { name: "Big Data", href: "/services/big-data" },
      { name: "Cyber Security", href: "/services/cyber-security" },
    ],
  },
  {
    id: "design-development",
    name: "Design & Development",
    href: "/services#design-development",
    items: [
      { name: "Full Stack Development", href: "/services/full-stack-development" },
      { name: "UI/UX Design", href: "/services/ui-ux-design" },
      { name: "Software Development", href: "/services/software-development" },
    ],
  },
];

export const SOLUTIONS = [
  {
    id: "erp",
    name: "ERP",
    href: "/solutions#erp",
    items: [
      { name: "S/4HANA On-Premise", href: "/solutions/s4hana-on-premise" },
      { name: "S/4HANA Public Cloud", href: "/solutions/s4hana-public-cloud" },
      { name: "S/4HANA Private Cloud", href: "/solutions/s4hana-private-cloud" },
    ],
  },
  {
    id: "business-technology",
    name: "Business Technology",
    href: "/solutions#business-technology",
    items: [
      { name: "Business Technology Platform", href: "/solutions/business-technology-platform" },
      { name: "Analytics Cloud", href: "/solutions/analytics-cloud" },
    ],
  },
  {
    id: "crm",
    name: "Customer Experience",
    href: "/solutions#crm",
    items: [
      { name: "Customer Relationship Management", href: "/solutions/customer-relationship-management" },
    ],
  },
  {
    id: "finance-controlling",
    name: "Finance & Controlling",
    href: "/solutions#finance-controlling",
    items: [
      { name: "Finance & Controlling", href: "/solutions/finance-and-controlling" },
    ],
  },
  {
    id: "hcm",
    name: "HCM",
    href: "/solutions#hcm",
    items: [
      { name: "Human Capital Management", href: "/solutions/human-capital-management" },
      { name: "SuccessFactors", href: "/solutions/successfactors" },
    ],
  },
  {
    id: "supply-spend-management",
    name: "Supply Spend Management",
    href: "/solutions#supply-spend-management",
    items: [
      { name: "Procurement", href: "/solutions/procurement" },
    ],
  },
  {
    id: "supply-chain-management",
    name: "Supply Chain Management",
    href: "/solutions#supply-chain-management",
    items: [
      { name: "Supply Chain Management", href: "/solutions/supply-chain-management" },
    ],
  },
];

export const MENUS = [
  { label: "Services", href: "/services", items: SERVICES },
  { label: "Solutions", href: "/solutions", items: SOLUTIONS },
];

// Every page a menu reaches, flattened — for active-state checks and route lists.
export const flattenLinks = (categories) =>
  categories.flatMap((category) =>
    category.items.flatMap((item) => (item.children ? item.children : [item]))
  );

// ---------------------------------------------------------------------------
// Ascendus navbar (Figma 2278:2725 Services, 2279:4200 Industries).
//
// The footer and the /services and /solutions landing pages above still read
// SERVICES / SOLUTIONS / MENUS; the new navbar reads only what follows. Links
// reuse an existing page where one matches; every other href is the planned
// slug for a page that is not built yet.
// ---------------------------------------------------------------------------

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// A link under /services/: the existing page when one matches, else the slug.
const service = (name, href) => ({ name, href: href ?? `/services/${slug(name)}` });

// Services mega menu, column by column as Figma lays it out (column 2 stacks
// two groups).
export const NAV_SERVICE_COLUMNS = [
  [
    {
      name: "SAP & Enterprise Applications",
      items: [
        service("SAP S/4HANA Transformation"),
        service("SAP Implementation"),
        service("SAP Migration & System Conversion", "/services/sap-migration"),
        service("SAP Application Management Services", "/services/sap-ams"),
        service("SAP Support & Maintenance"),
        service("SAP Rollout Services", "/services/sap-rollout"),
        service("SAP BTP"),
        service("SAP Integration"),
        service("SAP Ariba", "/services/sap-ariba"),
        service("SAP SuccessFactors", "/services/sap-successfactors"),
        service("SAP Analytics & Reporting", "/services/sap-analytics-cloud"),
        service("SAP EHS"),
        service("SAP Customer Experience", "/services/sap-cx"),
      ],
    },
  ],
  [
    {
      name: "E-Invoicing & Tax Technology",
      items: [
        service("Saudi Arabia – ZATCA E-Invoicing"),
        service("UAE E-Invoicing"),
        service("SAP E-Invoicing Integration"),
        service("ERP E-Invoicing Integration"),
        service("Invoice Automation"),
        service("E-Invoicing Implementation", "/services/e-invoicing"),
        service("E-Invoicing Support"),
      ],
    },
    {
      name: "Microsoft & Cloud Solutions",
      items: [
        service("Microsoft Azure", "/services/azure"),
        service("Microsoft 365"),
        service("Power BI & Analytics", "/services/power-bi"),
        service("Power Platform"),
        service("SharePoint Solutions"),
        service("Cloud Migration & Management"),
        service("Microsoft Security"),
      ],
    },
  ],
  [
    {
      name: "Digital Engineering & Product Development",
      items: [
        service("Custom Software Development", "/services/software-development"),
        service("Enterprise Application Development"),
        service("Product Engineering"),
        service("SaaS Development"),
        service("Web Application Development"),
        service("Mobile Application Development"),
        service("API Development & Integration"),
        service("UI/UX Design", "/services/ui-ux-design"),
        service("Application Modernisation"),
        service("Quality Engineering & Testing"),
      ],
    },
  ],
  [
    {
      name: "Digital Transformation & Managed Services",
      items: [
        service("Business Process Optimisation"),
        service("Enterprise Technology Advisory"),
        service("Data & Analytics", "/services/big-data"),
        service("AI & Intelligent Automation", "/services/ai-ml"),
        service("Cybersecurity Solutions", "/services/cyber-security"),
        service("IT Infrastructure Management"),
        service("Managed IT Services"),
        service("Application Support Services"),
        service("Enterprise Website Development"),
        service("E-Commerce Development"),
      ],
    },
  ],
];

export const NAV_INDUSTRIES = [
  "Manufacturing",
  "Retail & Distribution",
  "Energy & Utilities",
  "Banking & Financial Services",
  "Healthcare",
  "Engineering & Construction",
  "Transportation & Logistics",
  "Government & Public Sector",
  "Education",
  "Telecommunications",
].map((name) => ({ name, href: `/industries/${slug(name)}` }));

// Top-level navbar, left to right. Entries with `mega` open a hover panel:
// "columns" (grouped Services) or "grid" (flat Industries).
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services", mega: "columns", columns: NAV_SERVICE_COLUMNS },
  { label: "Industries", href: "/industries", mega: "grid", links: NAV_INDUSTRIES },
  { label: "Why Ascendus", href: "/why-ascendus" },
  // Insights has no page of its own yet; it opens the blog and stays lit on
  // the other insight listings.
  { label: "Insights", href: "/blog", match: ["/blog", "/case-studies", "/whitepapers", "/industry-reports"] },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

// Every page a navbar mega menu reaches, flattened.
export const navMegaLinks = (entry) =>
  entry.mega === "columns" ? entry.columns.flat().flatMap((group) => group.items) : entry.links ?? [];

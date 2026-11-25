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
          { name: "RISE with SAP", href: "/services/sap/s4hana-transformation" },
          { name: "GROW with SAP", href: "/services/sap/implementation" },
        ],
      },
      {
        name: "Line of Business",
        children: [
          { name: "SAP SuccessFactors", href: "/services/sap/successfactors" },
          { name: "SAP Ariba", href: "/services/sap/ariba" },
          { name: "SAP CX", href: "/services/sap/customer-experience" },
          { name: "SAP Analytics Cloud", href: "/services/sap/analytics-reporting" },
        ],
      },
      { name: "AMS", href: "/services/sap/application-management" },
      { name: "Conversion (ECC – S/4HANA)", href: "/services/sap/migration-conversion" },
      { name: "Rollout", href: "/services/sap/rollout-services" },
      { name: "Migration", href: "/services/sap/migration-conversion" },
      { name: "T&M", href: "/services/sap/time-and-material" },
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
          { name: "Microsoft Dynamics 365", href: "/services/microsoft/dynamics-365" },
          { name: "Power BI", href: "/services/microsoft/power-bi-analytics" },
        ],
      },
      { name: "AMS", href: "/services/microsoft/application-management" },
      { name: "Migration", href: "/services/microsoft/cloud-migration" },
      { name: "Rollout", href: "/services/microsoft/rollout" },
    ],
  },
  {
    id: "cloud",
    name: "Cloud",
    href: "/services#cloud",
    items: [
      { name: "Google Cloud Platform", href: "/services/microsoft/google-cloud" },
      { name: "Amazon Web Services", href: "/services/microsoft/aws" },
      { name: "Azure", href: "/services/microsoft/azure" },
    ],
  },
  {
    id: "digital-transformation",
    name: "Digital Transformation",
    href: "/services#digital-transformation",
    items: [
      { name: "Robotic Process Automation", href: "/services/digital-transformation/ai-automation" },
      { name: "AI & Machine Learning", href: "/services/digital-transformation/ai-automation" },
      { name: "E-Invoicing", href: "/services/e-invoicing" },
      { name: "Internet of Things", href: "/services/digital-transformation/iot" },
      { name: "Big Data", href: "/services/digital-transformation/data-analytics" },
      { name: "Cyber Security", href: "/services/digital-transformation/cybersecurity" },
    ],
  },
  {
    id: "design-development",
    name: "Design & Development",
    href: "/services#design-development",
    items: [
      { name: "Full Stack Development", href: "/services/digital-engineering/web-applications" },
      { name: "UI/UX Design", href: "/services/digital-engineering/ui-ux-design" },
      { name: "Software Development", href: "/services/digital-engineering/custom-software" },
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
// SERVICES / SOLUTIONS / MENUS; the new navbar reads only what follows.
// ---------------------------------------------------------------------------

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const service = (name, href) => ({ name, href });

// Services mega menu, column by column as Figma lays it out (column 2 stacks
// two groups). Each group href is its category overview page; item hrefs are
// the service page URLs.
export const NAV_SERVICE_COLUMNS = [
  [
    {
      name: "SAP & Enterprise Applications",
      href: "/services/sap",
      items: [
        service("SAP S/4HANA Transformation", "/services/sap/s4hana-transformation"),
        service("SAP Implementation", "/services/sap/implementation"),
        service("SAP Migration & System Conversion", "/services/sap/migration-conversion"),
        service("SAP Application Management Services", "/services/sap/application-management"),
        service("SAP Support & Maintenance", "/services/sap/support-maintenance"),
        service("SAP Rollout Services", "/services/sap/rollout-services"),
        service("SAP BTP", "/services/sap/btp"),
        service("SAP Integration", "/services/sap/integration"),
        service("SAP Ariba", "/services/sap/ariba"),
        service("SAP SuccessFactors", "/services/sap/successfactors"),
        service("SAP Analytics & Reporting", "/services/sap/analytics-reporting"),
        service("SAP EHS", "/services/sap/ehs"),
        service("SAP Customer Experience", "/services/sap/customer-experience"),
      ],
    },
  ],
  [
    {
      name: "E-Invoicing & Tax Technology",
      href: "/services/e-invoicing",
      items: [
        service("Saudi Arabia – ZATCA E-Invoicing", "/services/e-invoicing/saudi-arabia"),
        service("UAE E-Invoicing", "/services/e-invoicing/uae"),
        service("SAP E-Invoicing Integration", "/services/e-invoicing/sap-integration"),
        service("ERP E-Invoicing Integration", "/services/e-invoicing/erp-integration"),
        service("Invoice Automation", "/services/e-invoicing/invoice-automation"),
        service("E-Invoicing Implementation", "/services/e-invoicing/implementation"),
        service("E-Invoicing Support", "/services/e-invoicing/support-maintenance"),
      ],
    },
    {
      name: "Microsoft & Cloud Solutions",
      href: "/services/microsoft",
      items: [
        service("Microsoft Azure", "/services/microsoft/azure"),
        service("Microsoft 365", "/services/microsoft/microsoft-365"),
        service("Power BI & Analytics", "/services/microsoft/power-bi-analytics"),
        service("Power Platform", "/services/microsoft/power-platform"),
        service("SharePoint Solutions", "/services/microsoft/sharepoint"),
        service("Cloud Migration & Management", "/services/microsoft/cloud-migration"),
        service("Microsoft Security", "/services/microsoft/security"),
      ],
    },
  ],
  [
    {
      name: "Digital Engineering & Product Development",
      href: "/services/digital-engineering",
      items: [
        service("Custom Software Development", "/services/digital-engineering/custom-software"),
        service("Enterprise Application Development", "/services/digital-engineering/enterprise-applications"),
        service("Product Engineering", "/services/digital-engineering/product-engineering"),
        service("SaaS Development", "/services/digital-engineering/saas-development"),
        service("Web Application Development", "/services/digital-engineering/web-applications"),
        service("Mobile Application Development", "/services/digital-engineering/mobile-applications"),
        service("API Development & Integration", "/services/digital-engineering/api-integration"),
        service("UI/UX Design", "/services/digital-engineering/ui-ux-design"),
        service("Application Modernisation", "/services/digital-engineering/application-modernisation"),
        service("Quality Engineering & Testing", "/services/digital-engineering/quality-engineering"),
      ],
    },
  ],
  [
    {
      name: "Digital Transformation & Managed Services",
      href: "/services/digital-transformation",
      items: [
        service("Business Process Optimisation", "/services/digital-transformation/business-process-optimisation"),
        service("Enterprise Technology Advisory", "/services/digital-transformation/technology-advisory"),
        service("Data & Analytics", "/services/digital-transformation/data-analytics"),
        service("AI & Intelligent Automation", "/services/digital-transformation/ai-automation"),
        service("Cybersecurity Solutions", "/services/digital-transformation/cybersecurity"),
        service("IT Infrastructure Management", "/services/digital-transformation/infrastructure-management"),
        service("Managed IT Services", "/services/digital-transformation/managed-it-services"),
        service("Application Support Services", "/services/digital-transformation/application-support"),
        service("Enterprise Website Development", "/services/digital-transformation/website-development"),
        service("E-Commerce Development", "/services/digital-transformation/ecommerce-development"),
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
  // Insights and Careers were taken out of the header on request (2026-11-26).
  { label: "Contact", href: "/contact" },
];

// Every page a navbar mega menu reaches, flattened.
export const navMegaLinks = (entry) =>
  entry.mega === "columns" ? entry.columns.flat().flatMap((group) => group.items) : entry.links ?? [];

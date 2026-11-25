import PageClient from "./PageClient";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/services/sap/analytics-reporting/" },
  description: "SAP Analytics Cloud (SAC) services: combine business intelligence, planning, and predictive analytics to turn data into actionable insights.",
  openGraph: {
    title: "SAP Analytics Cloud Services | Ascendus",
    description: "SAP Analytics Cloud (SAC) services: combine business intelligence, planning, and predictive analytics to turn data into actionable insights.",
    url: "/services/sap/analytics-reporting/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  title: "SAP Analytics Cloud Services",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(
    buildBreadcrumbItems("/services/sap/analytics-reporting/")
  );
  const serviceSchema = generateServiceSchema({
    name: metadata.title,
    description: metadata.description,
    url: "/services/sap/analytics-reporting/",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PageClient />
    </>
  );
}

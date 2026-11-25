import PageClient from "./PageClient";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/services/sap-analytics-cloud/" },
  description: "SAP Analytics Cloud (SAC) services: combine business intelligence, planning, and predictive analytics to turn data into actionable insights.",
  openGraph: {
    title: "SAP Analytics Cloud Services | Support Studio Technologies",
    description: "SAP Analytics Cloud (SAC) services: combine business intelligence, planning, and predictive analytics to turn data into actionable insights.",
    url: "/services/sap-analytics-cloud/",
    images: [{ url: "/og-image.png?v=3", width: 512, height: 512, alt: "Support Studio Technologies" }],
  },
  title: "SAP Analytics Cloud Services",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(
    buildBreadcrumbItems("/services/sap-analytics-cloud/")
  );
  const serviceSchema = generateServiceSchema({
    name: metadata.title,
    description: metadata.description,
    url: "/services/sap-analytics-cloud/",
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

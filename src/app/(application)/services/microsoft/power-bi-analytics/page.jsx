import PageClient from "./PageClient";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/services/microsoft/power-bi-analytics/" },
  description: "Microsoft Power BI implementation by certified experts: data integration, interactive dashboards, real-time analytics and AI-driven insights for decisions.",
  openGraph: {
    title: "Microsoft Power BI Implementation | Ascendus",
    description: "Microsoft Power BI implementation by certified experts: data integration, interactive dashboards, real-time analytics and AI-driven insights for decisions.",
    url: "/services/microsoft/power-bi-analytics/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  title: "Power BI",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(
    buildBreadcrumbItems("/services/microsoft/power-bi-analytics/")
  );
  const serviceSchema = generateServiceSchema({
    name: metadata.title,
    description: metadata.description,
    url: "/services/microsoft/power-bi-analytics/",
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

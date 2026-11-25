import PageClient from "./PageClient";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/services/sap/s4hana-transformation/" },
  description: "RISE with SAP implementation services: integrate and manage finances, operations, and customer relationships through the SAP S/4HANA ERP suite in the cloud.",
  openGraph: {
    title: "RISE with SAP | Ascendus",
    description: "RISE with SAP implementation services: integrate and manage finances, operations, and customer relationships through the SAP S/4HANA ERP suite in the cloud.",
    url: "/services/sap/s4hana-transformation/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  title: "RISE with SAP",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(
    buildBreadcrumbItems("/services/sap/s4hana-transformation/")
  );
  const serviceSchema = generateServiceSchema({
    name: metadata.title,
    description: metadata.description,
    url: "/services/sap/s4hana-transformation/",
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

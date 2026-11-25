import PageClient from "./PageClient";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/services/sap/migration-conversion/" },
  description: "SAP ECC to S/4HANA conversion is essential for modernizing your ERP system, leveraging real-time analytics, improved performance, and simplified data models.",
  openGraph: {
    title: "SAP ECC to S/4HANA Conversion | Ascendus",
    description: "SAP ECC to S/4HANA conversion is essential for modernizing your ERP system, leveraging real-time analytics, improved performance, and simplified data models.",
    url: "/services/sap/migration-conversion/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  title: "SAP ECC to S/4HANA Conversion",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(
    buildBreadcrumbItems("/services/sap/migration-conversion/")
  );
  const serviceSchema = generateServiceSchema({
    name: metadata.title,
    description: metadata.description,
    url: "/services/sap/migration-conversion/",
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

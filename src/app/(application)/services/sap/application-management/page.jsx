import PageClient from "./PageClient";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/services/sap/application-management/" },
  description: "SAP AMS reduces costs, mitigates risks, and ensures smooth operations with tailored support and maintenance for efficient SAP technology management.",
  openGraph: {
    title: "SAP AMS Application Management | Ascendus",
    description: "SAP AMS reduces costs, mitigates risks, and ensures smooth operations with tailored support and maintenance for efficient SAP technology management.",
    url: "/services/sap/application-management/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  title: "SAP AMS Application Management",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(
    buildBreadcrumbItems("/services/sap/application-management/")
  );
  const serviceSchema = generateServiceSchema({
    name: metadata.title,
    description: metadata.description,
    url: "/services/sap/application-management/",
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

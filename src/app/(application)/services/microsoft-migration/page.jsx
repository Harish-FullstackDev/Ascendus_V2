import PageClient from "./PageClient";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/services/microsoft-migration/" },
  description: "Seamless migration from any ERP to Microsoft solutions by certified experts: secure data migration, change management and future-ready, scalable systems.",
  openGraph: {
    title: "ERP Migration to Microsoft | Ascendus",
    description: "Seamless migration from any ERP to Microsoft solutions by certified experts: secure data migration, change management and future-ready, scalable systems.",
    url: "/services/microsoft-migration/",
    images: [{ url: "/og-image.png?v=3", width: 512, height: 512, alt: "Ascendus" }],
  },
  title: "Microsoft Migration",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(
    buildBreadcrumbItems("/services/microsoft-migration/")
  );
  const serviceSchema = generateServiceSchema({
    name: metadata.title,
    description: metadata.description,
    url: "/services/microsoft-migration/",
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

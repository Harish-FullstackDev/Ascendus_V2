import PageClient from "./PageClient";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/solutions/" },
  description: "SAP ERP, business technology, CRM, finance, HCM, spend and supply chain solutions from Ascendus.",
  openGraph: {
    title: "Solutions | Ascendus",
    description: "SAP ERP, business technology, CRM, finance, HCM, spend and supply chain solutions from Ascendus.",
    url: "/solutions/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  title: "Solutions",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(buildBreadcrumbItems("/solutions/"));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <PageClient />
    </>
  );
}

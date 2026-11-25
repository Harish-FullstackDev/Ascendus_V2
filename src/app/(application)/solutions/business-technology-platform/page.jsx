import PageClient from "./PageClient";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/solutions/business-technology-platform/" },
  description: "SAP Business Technology Platform (BTP): one foundation to develop, integrate and manage cloud business applications, with built-in analytics, AI and security.",
  openGraph: {
    title: "SAP BTP Consulting & Services | Support Studio Technologies",
    description: "SAP Business Technology Platform (BTP): one foundation to develop, integrate and manage cloud business applications, with built-in analytics, AI and security.",
    url: "/solutions/business-technology-platform/",
    images: [{ url: "/og-image.png?v=3", width: 512, height: 512, alt: "Support Studio Technologies" }],
  },
  title: "SAP BTP Consulting & Services",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(
    buildBreadcrumbItems("/solutions/business-technology-platform/")
  );
  const serviceSchema = generateServiceSchema({
    name: metadata.title,
    description: metadata.description,
    url: "/solutions/business-technology-platform/",
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

import PageClient from "./PageClient";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/services/digital-engineering/web-applications/" },
  description: "Full-stack development services: end-to-end web solutions that pair advanced front-end interfaces with robust back-end systems for performance and UX.",
  openGraph: {
    title: "Full Stack Development | Ascendus",
    description: "Full-stack development services: end-to-end web solutions that pair advanced front-end interfaces with robust back-end systems for performance and UX.",
    url: "/services/digital-engineering/web-applications/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  title: "Full Stack Development",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(
    buildBreadcrumbItems("/services/digital-engineering/web-applications/")
  );
  const serviceSchema = generateServiceSchema({
    name: metadata.title,
    description: metadata.description,
    url: "/services/digital-engineering/web-applications/",
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

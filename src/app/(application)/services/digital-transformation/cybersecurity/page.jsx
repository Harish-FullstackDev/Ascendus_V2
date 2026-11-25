import PageClient from "./PageClient";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/services/digital-transformation/cybersecurity/" },
  description: "Cybersecurity services: threat detection and response, network security, endpoint protection, IAM, data encryption and incident response planning.",
  openGraph: {
    title: "Cyber Security | Ascendus",
    description: "Cybersecurity services: threat detection and response, network security, endpoint protection, IAM, data encryption and incident response planning.",
    url: "/services/digital-transformation/cybersecurity/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  title: "Cyber Security",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(
    buildBreadcrumbItems("/services/digital-transformation/cybersecurity/")
  );
  const serviceSchema = generateServiceSchema({
    name: metadata.title,
    description: metadata.description,
    url: "/services/digital-transformation/cybersecurity/",
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

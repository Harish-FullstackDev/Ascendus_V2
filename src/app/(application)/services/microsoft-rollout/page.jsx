import PageClient from "./PageClient";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/services/microsoft-rollout/" },
  description: "Microsoft Rollout Services by certified professionals: structured deployment planning, seamless integration and change management for a low-risk rollout.",
  openGraph: {
    title: "Microsoft Rollout Services | Ascendus",
    description: "Microsoft Rollout Services by certified professionals: structured deployment planning, seamless integration and change management for a low-risk rollout.",
    url: "/services/microsoft-rollout/",
    images: [{ url: "/og-image.png?v=3", width: 512, height: 512, alt: "Ascendus" }],
  },
  title: "Microsoft Rollout",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(
    buildBreadcrumbItems("/services/microsoft-rollout/")
  );
  const serviceSchema = generateServiceSchema({
    name: metadata.title,
    description: metadata.description,
    url: "/services/microsoft-rollout/",
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

import ServiceComingSoon from "@/components/Services/ComingSoon/ServiceComingSoon";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

// Placeholder until this page has content: kept out of the index and sitemap.
export const metadata = {
  alternates: { canonical: "/services/digital-engineering/enterprise-applications/" },
  description: "Enterprise Application Development from Ascendus. Full details for this service are coming soon; book a consultation to talk to our team.",
  openGraph: {
    title: "Enterprise Application Development | Ascendus",
    description: "Enterprise Application Development from Ascendus. Full details for this service are coming soon; book a consultation to talk to our team.",
    url: "/services/digital-engineering/enterprise-applications/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  robots: { index: false, follow: true },
  title: "Enterprise Application Development",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(buildBreadcrumbItems("/services/digital-engineering/enterprise-applications/"));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceComingSoon category="Digital Engineering & Product Development" title="Enterprise Application Development" />
    </>
  );
}

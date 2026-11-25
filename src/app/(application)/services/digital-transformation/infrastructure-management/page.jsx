import ServiceComingSoon from "@/components/Services/ComingSoon/ServiceComingSoon";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

// Placeholder until this page has content: kept out of the index and sitemap.
export const metadata = {
  alternates: { canonical: "/services/digital-transformation/infrastructure-management/" },
  description: "IT Infrastructure Management from Ascendus. Full details for this service are coming soon; book a consultation to talk to our team.",
  openGraph: {
    title: "IT Infrastructure Management | Ascendus",
    description: "IT Infrastructure Management from Ascendus. Full details for this service are coming soon; book a consultation to talk to our team.",
    url: "/services/digital-transformation/infrastructure-management/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  robots: { index: false, follow: true },
  title: "IT Infrastructure Management",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(buildBreadcrumbItems("/services/digital-transformation/infrastructure-management/"));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceComingSoon category="Digital Transformation & Managed Services" title="IT Infrastructure Management" />
    </>
  );
}

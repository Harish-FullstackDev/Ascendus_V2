import ServiceComingSoon from "@/components/Services/ComingSoon/ServiceComingSoon";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

// Placeholder until this page has content: kept out of the index and sitemap.
export const metadata = {
  alternates: { canonical: "/services/e-invoicing/saudi-arabia/" },
  description: "Saudi Arabia – ZATCA E-Invoicing from Ascendus. Full details for this service are coming soon; book a consultation to talk to our team.",
  openGraph: {
    title: "Saudi Arabia – ZATCA E-Invoicing | Ascendus",
    description: "Saudi Arabia – ZATCA E-Invoicing from Ascendus. Full details for this service are coming soon; book a consultation to talk to our team.",
    url: "/services/e-invoicing/saudi-arabia/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  robots: { index: false, follow: true },
  title: "Saudi Arabia – ZATCA E-Invoicing",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(buildBreadcrumbItems("/services/e-invoicing/saudi-arabia/"));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceComingSoon category="E-Invoicing & Tax Technology" title="Saudi Arabia – ZATCA E-Invoicing" />
    </>
  );
}

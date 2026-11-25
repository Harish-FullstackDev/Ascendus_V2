import PageClient from "./PageClient";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/sst-partner/" },
  description: "Apply to the Ascendus partner program — the qualification criteria, engagement model and next steps for prospective partners.",
  openGraph: {
    title: "Partner Program | Ascendus",
    description: "Apply to the Ascendus partner program — the qualification criteria, engagement model and next steps for prospective partners.",
    url: "/sst-partner/",
    images: [{ url: "/og-image.png?v=3", width: 512, height: 512, alt: "Ascendus" }],
  },
  title: "Partner Program",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(buildBreadcrumbItems("/sst-partner/"));

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

import PageClient from "./PageClient";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

const description =
  "Ascendus starts with the business challenge, then brings SAP, e-invoicing, cloud and digital engineering together, with governance and support after go-live.";

export const metadata = {
  alternates: { canonical: "/why-ascendus/" },
  description,
  openGraph: {
    title: "Why Ascendus | Enterprise Transformation Partner",
    description,
    url: "/why-ascendus/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  title: { absolute: "Why Ascendus | Enterprise Transformation Partner" },
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(buildBreadcrumbItems("/why-ascendus/"));

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

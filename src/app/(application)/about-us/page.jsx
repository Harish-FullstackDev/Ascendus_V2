import PageClient from "./PageClient";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/about-us/" },
  description: "Ascendus helps organisations modernise enterprise systems and processes, combining SAP, e-invoicing and digital engineering around clear business priorities.",
  openGraph: {
    title: "About Ascendus | Enterprise Technology & Business Transformation",
    description: "Ascendus helps organisations modernise enterprise systems and processes, combining SAP, e-invoicing and digital engineering around clear business priorities.",
    url: "/about-us/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  title: { absolute: "About Ascendus | Enterprise Technology & Business Transformation" },
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(buildBreadcrumbItems("/about-us/"));

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

import PageClient from "./PageClient";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/industry-reports/" },
  description: "Benchmark data and market analysis on SAP adoption, cloud infrastructure spending, cybersecurity threats, and AI adoption across the industries we serve.",
  openGraph: {
    title: "Industry Reports | Ascendus",
    description: "Benchmark data and market analysis on SAP adoption, cloud infrastructure spending, cybersecurity threats, and AI adoption across the industries we serve.",
    url: "/industry-reports/",
    images: [{ url: "/og-image.png?v=3", width: 512, height: 512, alt: "Ascendus" }],
  },
  title: "Industry Reports",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(buildBreadcrumbItems("/industry-reports/"));

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

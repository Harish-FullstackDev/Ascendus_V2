import PageClient from "./PageClient";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/solutions/successfactors/" },
  description: "SAP SuccessFactors cloud HCM solution: recruiting, performance and goals, learning, Employee Central, compensation, succession and workforce analytics.",
  openGraph: {
    title: "SAP SuccessFactors Solution | Ascendus",
    description: "SAP SuccessFactors cloud HCM solution: recruiting, performance and goals, learning, Employee Central, compensation, succession and workforce analytics.",
    url: "/solutions/successfactors/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  title: "SAP SuccessFactors Solution",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(
    buildBreadcrumbItems("/solutions/successfactors/")
  );
  const serviceSchema = generateServiceSchema({
    name: metadata.title,
    description: metadata.description,
    url: "/solutions/successfactors/",
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

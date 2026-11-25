import PageClient from "./PageClient";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/services/digital-transformation/ai-automation/" },
  description: "AI & Machine Learning services: NLP, computer vision, predictive analytics, recommendation systems, RPA and chatbots that turn data into smarter decisions.",
  openGraph: {
    title: "AI & Machine Learning | Ascendus",
    description: "AI & Machine Learning services: NLP, computer vision, predictive analytics, recommendation systems, RPA and chatbots that turn data into smarter decisions.",
    url: "/services/digital-transformation/ai-automation/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  title: "AI & Machine Learning",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(
    buildBreadcrumbItems("/services/digital-transformation/ai-automation/")
  );
  const serviceSchema = generateServiceSchema({
    name: metadata.title,
    description: metadata.description,
    url: "/services/digital-transformation/ai-automation/",
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

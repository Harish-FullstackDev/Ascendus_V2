import PageClient from "./PageClient";
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/services/digital-engineering/ui-ux-design/" },
  description: "UI/UX design services: user research, wireframing, prototyping, visual design and usability testing for intuitive, user-centric digital experiences.",
  openGraph: {
    title: "UI/UX Design | Ascendus",
    description: "UI/UX design services: user research, wireframing, prototyping, visual design and usability testing for intuitive, user-centric digital experiences.",
    url: "/services/digital-engineering/ui-ux-design/",
    images: [{ url: "/og-image.png?v=4", width: 1200, height: 630, alt: "Ascendus" }],
  },
  title: "UI/UX Design",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(
    buildBreadcrumbItems("/services/digital-engineering/ui-ux-design/")
  );
  const serviceSchema = generateServiceSchema({
    name: metadata.title,
    description: metadata.description,
    url: "/services/digital-engineering/ui-ux-design/",
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

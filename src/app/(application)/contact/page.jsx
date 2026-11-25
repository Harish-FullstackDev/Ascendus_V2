import PageClient from "./PageClient";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/contact/" },
  description: "Route your enquiry to the right team — new engagements, existing clients, partnerships, careers or media — with a stated response time.",
  openGraph: {
    title: "Contact Ascendus",
    description: "Route your enquiry to the right team — new engagements, existing clients, partnerships, careers or media — with a stated response time.",
    url: "/contact/",
    images: [{ url: "/og-image.png?v=3", width: 512, height: 512, alt: "Ascendus" }],
  },
  title: { absolute: "Contact Ascendus" },
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(buildBreadcrumbItems("/contact/"));

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

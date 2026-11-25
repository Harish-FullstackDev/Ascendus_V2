import PageClient from "./PageClient";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { buildBreadcrumbItems } from "@/lib/breadcrumbs";

export const metadata = {
  alternates: { canonical: "/legal/privacyCommitment/" },
  description: "The principles Ascendus follows when handling client and candidate data, and how those principles are enforced in practice.",
  openGraph: {
    title: "Our Privacy Commitment | Ascendus",
    description: "The principles Ascendus follows when handling client and candidate data, and how those principles are enforced in practice.",
    url: "/legal/privacyCommitment/",
    images: [{ url: "/og-image.png?v=3", width: 512, height: 512, alt: "Ascendus" }],
  },
  title: "Our Privacy Commitment",
};

export default function Page() {
  const breadcrumbSchema = generateBreadcrumbSchema(buildBreadcrumbItems("/legal/privacyCommitment/"));

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

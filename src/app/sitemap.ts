import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabaseClient';
import { hrmsSelect } from '@/lib/hrmsClient';
import { industryReportsData } from '@/data/industryReportsData';
import { staticBlogsData } from '@/data/blogsData';
import { staticCaseStudiesData } from '@/data/caseStudiesData';
import { SITE_URL } from '@/lib/siteUrl';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  const now = new Date().toISOString();

  // 1. Core static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about-us',
    '/why-ascendus',
    '/contact',
    '/careers',
    '/book-a-consultation',
    '/trustcenter',
    '/ascendus-partner',
    '/blog',
    '/case-studies',
    '/industry-reports',
    '/whitepapers',
    '/legal/privacy',
    '/legal/terms',
    '/legal/privacyCommitment',
    '/legal/security',
    '/legal/cookies',
    '/legal/disclaimer',
    '/services',
    '/services/sap/s4hana-transformation',
    '/services/sap/implementation',
    '/services/sap/successfactors',
    '/services/sap/ariba',
    '/services/sap/customer-experience',
    '/services/sap/analytics-reporting',
    '/services/sap/application-management',
    '/services/sap/migration-conversion',
    '/services/sap/rollout-services',
    '/services/sap/time-and-material',
    '/services/microsoft/dynamics-365',
    '/services/microsoft/power-bi-analytics',
    '/services/microsoft/application-management',
    '/services/microsoft/cloud-migration',
    '/services/microsoft/rollout',
    '/services/microsoft/google-cloud',
    '/services/microsoft/aws',
    '/services/microsoft/azure',
    '/services/digital-transformation/ai-automation',
    '/services/e-invoicing',
    '/services/digital-transformation/iot',
    '/services/digital-transformation/data-analytics',
    '/services/digital-transformation/cybersecurity',
    '/services/digital-engineering/web-applications',
    '/services/digital-engineering/ui-ux-design',
    '/services/digital-engineering/custom-software',
    '/solutions',
    '/solutions/s4hana-on-premise',
    '/solutions/s4hana-public-cloud',
    '/solutions/s4hana-private-cloud',
    '/solutions/business-technology-platform',
    '/solutions/analytics-cloud',
    '/solutions/customer-relationship-management',
    '/solutions/finance-and-controlling',
    '/solutions/human-capital-management',
    '/solutions/successfactors',
    '/solutions/procurement',
    '/solutions/supply-chain-management',
  ].map((route) => ({
    url: `${baseUrl}${route}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // 3. Industry reports — static data
  const industryReportRoutes: MetadataRoute.Sitemap = industryReportsData.map((report) => ({
    url: `${baseUrl}/industry-reports/${report.slug}/`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 4. Dynamic content from Supabase (blog, case studies, whitepapers).
  // Supabase returns { data, error } instead of throwing, so the error is
  // checked explicitly — a bad column name used to empty a section silently.
  const dynamicRoutes: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();
  const push = (path: string, date: string | null | undefined, changeFrequency: 'weekly' | 'monthly', priority: number) => {
    const url = `${baseUrl}${path}`;
    if (seen.has(url)) return;
    seen.add(url);
    dynamicRoutes.push({ url, lastModified: date ? new Date(date).toISOString() : now, changeFrequency, priority });
  };

  // Static blog posts rendered by blog/[slug] alongside the Supabase ones.
  staticBlogsData.forEach((post: any) => push(`/blog/${post.slug}/`, post.publish_date, 'weekly', 0.6));
  staticCaseStudiesData.forEach((cs: any) => push(`/case-studies/${cs.slug}/`, cs.publish_date, 'monthly', 0.7));

  const tables = [
    { table: 'blogs', select: 'slug, publish_date, created_at', base: '/blog', freq: 'weekly' as const, priority: 0.6 },
    { table: 'case_studies', select: 'slug, updated_at, publish_date', base: '/case-studies', freq: 'monthly' as const, priority: 0.7 },
    { table: 'white_papers', select: 'slug, updated_at, publish_date', base: '/whitepapers', freq: 'monthly' as const, priority: 0.6 },
  ];
  for (const t of tables) {
    try {
      // Untyped on purpose: the table name is a loop variable.
      const { data, error } = await (supabase as any).from(t.table).select(t.select);
      if (error) throw error;
      (data || []).forEach((row: any) =>
        push(`${t.base}/${row.slug}/`, row.updated_at || row.publish_date || row.created_at, t.freq, t.priority)
      );
    } catch (error) {
      console.error(`Sitemap: ${t.table} fetch failed`, error);
    }
  }

  try {
    const jobs = await hrmsSelect('jobs', { select: 'slug,updated_at', status: 'eq.published' });
    (jobs || []).forEach((row: any) => {
      dynamicRoutes.push({
        url: `${baseUrl}/careers/${row.slug}/`,
        lastModified: row.updated_at ? new Date(row.updated_at).toISOString() : now,
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      });
    });
  } catch (error) {
    console.error('Sitemap: jobs fetch failed', error);
  }

  return [...staticRoutes, ...industryReportRoutes, ...dynamicRoutes];
}

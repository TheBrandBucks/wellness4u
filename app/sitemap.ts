import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/utils/apiConfig';
import { getSeoSetting, SITE_URL } from '@/lib/seo';

interface ContentItem {
  id: string;
  _id?: string;
  updatedAt?: string;
  createdAt?: string;
  isPublished?: boolean;
}

async function getItems<T extends ContentItem>(path: string) {
  try {
    const response = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 300 } });
    if (!response.ok) return [] as T[];
    const result = await response.json();
    return (result.data || []) as T[];
  } catch {
    return [] as T[];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, homeSeo, blogsSeo, faqsSeo] = await Promise.all([
    getItems<ContentItem>('/api/v1/blogs/blogs-list'),
    getSeoSetting('page', '/'),
    getSeoSetting('page', '/blogs'),
    getSeoSetting('page', '/faqs'),
  ]);

  const staticPages = [
    { path: '/', seo: homeSeo, changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/blogs', seo: blogsSeo, changeFrequency: 'daily' as const, priority: 0.8 },
    { path: '/faqs', seo: faqsSeo, changeFrequency: 'weekly' as const, priority: 0.7 },
  ].flatMap(({ path, seo, changeFrequency, priority }) => {
    if (seo?.indexable === false) return [];

    const fallbackUrl = `${SITE_URL}${path}`;
    let url = fallbackUrl;
    if (seo?.canonicalUrl) {
      try {
        const canonicalUrl = new URL(seo.canonicalUrl, SITE_URL);
        if (canonicalUrl.origin === new URL(SITE_URL).origin) url = canonicalUrl.toString();
      } catch {
        // Ignore malformed canonical URLs and use the page's public URL.
      }
    }

    return [{ url, lastModified: new Date(), changeFrequency, priority }];
  });

  const blogEntries = await Promise.all(blogs
    .filter((item) => item.isPublished !== false)
    .map(async (item) => {
      const id = item.id || item._id;
      if (!id) return null;

      const seo = await getSeoSetting('blog', id);
      if (seo?.indexable === false) return null;

      const fallbackUrl = `${SITE_URL}/blog/${seo?.slug || id}`;
      let url = fallbackUrl;
      if (seo?.canonicalUrl) {
        try {
          const canonicalUrl = new URL(seo.canonicalUrl, SITE_URL);
          if (canonicalUrl.origin === new URL(SITE_URL).origin) url = canonicalUrl.toString();
        } catch {
          // Ignore malformed canonical URLs and use the blog's public URL.
        }
      }

      return {
        url,
        ...(item.updatedAt || item.createdAt
          ? { lastModified: new Date(item.updatedAt || item.createdAt as string) }
          : {}),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    }));

  return [
    ...staticPages,
    ...blogEntries.filter((entry): entry is NonNullable<typeof entry> => entry !== null),
  ];
}

import type { Metadata } from 'next';
import { createElement } from 'react';
import { BASE_URL } from '@/utils/apiConfig';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://beauty4u.love';

export interface SeoSetting {
  entityType: 'page' | 'blog' | 'faq';
  entityId: string;
  slug?: string | null;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl?: string | null;
  indexable: boolean;
  followLinks: boolean;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  twitterTitle?: string | null;
  twitterDescription?: string | null;
  twitterImage?: string | null;
  twitterCardType?: 'summary' | 'summary_large_image' | null;
  schemaType?: string | null;
  schemaJson?: Record<string, unknown> | null;
  imageAlt?: string | null;
}

async function fetchPublicSeo(query: string, fresh = false) {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/seo/public?${query}`, fresh
      ? { cache: 'no-store' }
      : { next: { revalidate: 60 } });
    if (!response.ok) return null;
    const result = await response.json();
    return (result.data || null) as SeoSetting | null;
  } catch {
    return null;
  }
}

export async function getSeoSetting(entityType: SeoSetting['entityType'], entityId: string) {
  return fetchPublicSeo(`entityType=${entityType}&entityId=${encodeURIComponent(entityId)}`);
}

export async function getSeoSettingBySlug(slug: string) {
  return fetchPublicSeo(`slug=${encodeURIComponent(slug)}`);
}

export async function getBlogSeoSetting(requestedId: string, blogEntityId: string) {
  return (await fetchPublicSeo(`entityType=blog&entityId=${encodeURIComponent(blogEntityId)}`, true))
    || (requestedId !== blogEntityId
      ? await fetchPublicSeo(`slug=${encodeURIComponent(requestedId)}`, true)
      : null);
}

export function buildMetadata(seo: SeoSetting | null, fallback: { title: string; description: string; path: string }): Metadata {
  const title = seo?.seoTitle || fallback.title;
  const description = seo?.metaDescription || fallback.description;
  const canonical = seo?.canonicalUrl || `${SITE_URL}${fallback.path}`;
  const twitterImage = seo?.twitterImage || seo?.ogImage;
  const twitterCard: 'summary' | 'summary_large_image' = seo?.twitterCardType
    || (twitterImage ? 'summary_large_image' : 'summary');

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: seo?.indexable ?? true, follow: seo?.followLinks ?? true },
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      url: canonical,
      siteName: 'WellWisher',
      type: seo?.entityType === 'blog' ? 'article' : 'website',
      ...(seo?.ogImage ? { images: [{ url: seo.ogImage, alt: seo.imageAlt || title }] } : {}),
    },
    twitter: {
      card: twitterCard,
      title: seo?.twitterTitle || title,
      description: seo?.twitterDescription || description,
      ...(twitterImage ? { images: [twitterImage] } : {}),
    },
  };
}

export function JsonLd({ data }: { data?: Record<string, unknown> | null }) {
  if (!data) return null;

  return createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, '\\u003c') },
  });
}

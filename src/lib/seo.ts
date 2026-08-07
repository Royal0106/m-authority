import { site } from '~/data/site'

export type SeoInput = {
  title: string
  description?: string
  /** Absolute or root-relative social share image. */
  image?: string
  /** `article` for blog posts, `website` everywhere else. */
  type?: 'website' | 'article'
  keywords?: string
}

/**
 * Build the meta tag array consumed by a route's `head()`.
 * Returns Open Graph + Twitter card tags alongside the standard description.
 */
export function seo({
  title,
  description = site.description,
  image,
  type = 'website',
  keywords,
}: SeoInput) {
  const tags: Array<Record<string, string>> = [
    { title },
    { name: 'description', content: description },
    { property: 'og:type', content: type },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:site_name', content: site.name },
    { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
  ]

  if (keywords) tags.push({ name: 'keywords', content: keywords })
  if (image) {
    tags.push({ property: 'og:image', content: image })
    tags.push({ name: 'twitter:image', content: image })
  }

  return tags
}

/** Convenience: `Blog | Man Authority` */
export function pageTitle(label: string) {
  return `${label} | ${site.name}`
}

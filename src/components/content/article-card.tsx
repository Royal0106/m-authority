import type * as React from 'react'
import { Link } from '@tanstack/react-router'
import { Bookmark, Clock } from 'lucide-react'
import { cn, formatDateShort, padIndex } from '~/lib/utils'
import { categoryLabels, type Article } from '~/data/articles'
import { ImageFrame } from '~/components/media/image-frame'
import { Badge } from '~/components/ui/badge'
import { Avatar } from '~/components/content/avatar'

/* -------------------------------------------------------------------------- */
/*  Shared bits                                                                 */
/* -------------------------------------------------------------------------- */

function ArticleMeta({
  article,
  tone = 'light',
  showAvatar = true,
}: {
  article: Article
  tone?: 'light' | 'dark'
  showAvatar?: boolean
}) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2 text-[11px]',
        tone === 'dark' ? 'text-white/45' : 'text-muted',
      )}
    >
      {showAvatar ? (
        <>
          <Avatar name={article.author.name} size="sm" />
          <span>By {article.author.name}</span>
          <span aria-hidden="true">·</span>
        </>
      ) : null}
      <time dateTime={article.date}>{formatDateShort(article.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{article.readTime} min read</span>
    </div>
  )
}

function articleTo(slug: string) {
  return { to: '/blog/$slug', params: { slug } } as const
}

/* -------------------------------------------------------------------------- */
/*  Stacked card (default grid item)                                            */
/* -------------------------------------------------------------------------- */

export function ArticleCard({
  article,
  tone = 'light',
  ratio = 'aspect-[4/3]',
  className,
  showExcerpt = false,
}: {
  article: Article
  tone?: 'light' | 'dark'
  ratio?: string
  className?: string
  showExcerpt?: boolean
}) {
  return (
    <article className={cn('group flex h-full flex-col', className)}>
      <Link
        {...articleTo(article.slug)}
        className={cn(
          'flex h-full flex-col overflow-hidden rounded-[3px] border',
          'transition-[transform,box-shadow,border-color] duration-500 ease-premium',
          'hover:-translate-y-1 hover:shadow-elevated',
          tone === 'dark'
            ? 'border-white/8 bg-ink-800 hover:border-gold-400/40'
            : 'border-cream-300 bg-white hover:border-gold-300',
        )}
      >
        <ImageFrame seed={article.slug} ratio={ratio} zoomOnHover />
        <div className="flex flex-1 flex-col gap-2.5 p-4">
          <Badge variant={tone === 'dark' ? 'categoryLight' : 'category'}>
            {categoryLabels[article.category] ?? article.category}
          </Badge>
          <h3
            className={cn(
              'font-sans text-[14.5px] font-bold leading-snug transition-colors duration-300',
              tone === 'dark'
                ? 'text-white group-hover:text-gold-300'
                : 'text-heading group-hover:text-gold-600',
            )}
          >
            {article.title}
          </h3>
          {showExcerpt ? (
            <p
              className={cn(
                'text-[12.5px] leading-relaxed',
                tone === 'dark' ? 'text-white/50' : 'text-body',
              )}
            >
              {article.excerpt}
            </p>
          ) : null}
          <div className="mt-auto pt-2">
            <ArticleMeta article={article} tone={tone} />
          </div>
        </div>
      </Link>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/*  Featured card (large image + copy)                                          */
/* -------------------------------------------------------------------------- */

export function FeaturedArticleCard({
  article,
  className,
  children,
}: {
  article: Article
  className?: string
  /** Slot for the "Read article" CTA so pages control its wording. */
  children?: React.ReactNode
}) {
  return (
    <article className={cn('group grid gap-7 lg:grid-cols-2 lg:items-center', className)}>
      <Link
        {...articleTo(article.slug)}
        className="block overflow-hidden rounded-[3px]"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ImageFrame seed={`featured-${article.slug}`} ratio="aspect-[4/3]" zoomOnHover />
      </Link>
      <div className="grid gap-4">
        <Badge variant="category">
          {categoryLabels[article.category] ?? article.category}
        </Badge>
        <h3 className="text-display-sm">
          <Link
            {...articleTo(article.slug)}
            className="transition-colors duration-300 hover:text-gold-600"
          >
            {article.title}
          </Link>
        </h3>
        <p className="max-w-md text-[13px] leading-relaxed text-body">{article.excerpt}</p>
        <ArticleMeta article={article} />
        {children}
      </div>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/*  Compact list row (sidebar)                                                  */
/* -------------------------------------------------------------------------- */

export function ArticleListItem({
  article,
  tone = 'light',
  className,
}: {
  article: Article
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <article className={cn('group', className)}>
      <Link {...articleTo(article.slug)} className="flex items-start gap-3.5">
        <ImageFrame
          seed={article.slug}
          ratio="aspect-[4/3]"
          className="w-[86px] shrink-0 rounded-[2px]"
          zoomOnHover
        />
        <div className="grid gap-1.5">
          <Badge variant={tone === 'dark' ? 'categoryLight' : 'category'}>
            {categoryLabels[article.category] ?? article.category}
          </Badge>
          <h3
            className={cn(
              'font-sans text-[13px] font-bold leading-snug transition-colors duration-300',
              tone === 'dark'
                ? 'text-white group-hover:text-gold-300'
                : 'text-heading group-hover:text-gold-600',
            )}
          >
            {article.title}
          </h3>
          <ArticleMeta article={article} tone={tone} showAvatar={false} />
        </div>
      </Link>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/*  Ranked list row (Popular Articles)                                          */
/* -------------------------------------------------------------------------- */

export function RankedArticleItem({
  article,
  rank,
  className,
}: {
  article: Article
  rank: number
  className?: string
}) {
  return (
    <article className={cn('group', className)}>
      <Link {...articleTo(article.slug)} className="flex items-center gap-3.5">
        <span
          aria-hidden="true"
          className="w-6 shrink-0 font-display text-[15px] font-bold text-muted/60 transition-colors duration-300 group-hover:text-gold-500"
        >
          {padIndex(rank)}
        </span>
        <ImageFrame
          seed={article.slug}
          ratio="aspect-square"
          className="w-14 shrink-0 rounded-[2px]"
          zoomOnHover
        />
        <div className="grid gap-1">
          <h3 className="font-sans text-[12.5px] font-bold leading-snug text-heading transition-colors duration-300 group-hover:text-gold-600">
            {article.title}
          </h3>
          <ArticleMeta article={article} showAvatar={false} />
        </div>
      </Link>
    </article>
  )
}

/* -------------------------------------------------------------------------- */
/*  Overlay card (Editor's Picks)                                               */
/* -------------------------------------------------------------------------- */

export function OverlayArticleCard({
  article,
  className,
}: {
  article: Article
  className?: string
}) {
  return (
    <article className={cn('group relative', className)}>
      <Link {...articleTo(article.slug)} className="block overflow-hidden rounded-[3px]">
        <ImageFrame
          seed={`pick-${article.slug}`}
          ratio="aspect-[4/3]"
          overlay="bottom"
          zoomOnHover
        >
          <span
            aria-hidden="true"
            className="absolute right-3 top-3 z-20 inline-flex size-8 items-center justify-center rounded-[2px] bg-ink-950/60 text-gold-400 backdrop-blur-sm transition-colors duration-300 group-hover:bg-gold-400 group-hover:text-ink-950"
          >
            <Bookmark className="size-3.5" />
          </span>
          <div className="absolute inset-x-0 bottom-0 z-20 grid gap-2 p-4">
            <Badge variant="categoryLight">
              {categoryLabels[article.category] ?? article.category}
            </Badge>
            <h3 className="font-display text-[16px] font-bold leading-tight text-white">
              {article.title}
            </h3>
            <p className="flex items-center gap-1.5 text-[11px] text-white/55">
              <Clock aria-hidden="true" className="size-3" />
              {article.readTime} min read
            </p>
          </div>
        </ImageFrame>
      </Link>
    </article>
  )
}

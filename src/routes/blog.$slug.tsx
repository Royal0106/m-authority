import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { Bookmark, Facebook, Globe, Linkedin, Link2, ThumbsUp, Youtube } from 'lucide-react'
import { formatDate } from '~/lib/utils'
import { seo, pageTitle } from '~/lib/seo'
import {
  categoryLabels,
  commentCount,
  comments,
  fallbackBody,
  getArticleBySlug,
  getLatestArticles,
  getRelatedArticles,
  type ArticleBlock,
} from '~/data/articles'
import { Container, Section } from '~/components/layout/primitives'
import { Breadcrumb } from '~/components/utility/breadcrumb'
import { NotFound } from '~/components/utility/states'
import { ArticleCard, ArticleListItem } from '~/components/content/article-card'
import { AuthorCard } from '~/components/content/cards'
import { NewsletterBand } from '~/components/content/cta-banner'
import { CommentForm } from '~/components/forms/comment-form'
import { ImageFrame } from '~/components/media/image-frame'
import { Avatar } from '~/components/content/avatar'
import { Badge } from '~/components/ui/badge'
import { Button, ButtonArrow } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Reveal, Stagger, StaggerItem } from '~/components/motion'

export const Route = createFileRoute('/blog/$slug')({
  /** Resolve the article up-front so `head()` can emit real per-article SEO. */
  loader: ({ params }) => {
    const article = getArticleBySlug(params.slug)
    if (!article) throw notFound()
    return { article }
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: seo({
            title: pageTitle(loaderData.article.title),
            description: loaderData.article.excerpt,
            type: 'article',
            keywords: loaderData.article.tags.join(', '),
          }),
        }
      : {},
  notFoundComponent: () => <NotFound />,
  component: ArticlePage,
})

const SHARE_LINKS = [
  { label: 'Share on Facebook', icon: Facebook },
  { label: 'Share on X', icon: Globe },
  { label: 'Share on LinkedIn', icon: Linkedin },
  { label: 'Copy link', icon: Link2 },
]

function ArticleBody({ blocks }: { blocks: Array<ArticleBlock> }) {
  return (
    <div className="prose-article">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2 key={index} id={block.id} className="scroll-mt-32">
                {block.text}
              </h2>
            )
          case 'quote':
            return (
              <figure
                key={index}
                className="my-7 border border-cream-300 bg-cream-100 px-6 py-6"
              >
                <span aria-hidden="true" className="font-display text-[26px] leading-none text-gold-400">
                  &ldquo;
                </span>
                <blockquote className="mt-2 font-display text-[17px] font-semibold leading-snug text-heading">
                  {block.text}
                </blockquote>
                <figcaption className="mt-3 text-[11.5px] text-muted">
                  — {block.attribution}
                </figcaption>
              </figure>
            )
          case 'image':
            return (
              <figure key={index} className="my-7">
                <ImageFrame seed={block.seed} ratio="aspect-[16/9]" className="rounded-[3px]" />
                {block.caption ? (
                  <figcaption className="mt-2 text-[11px] text-muted">{block.caption}</figcaption>
                ) : null}
              </figure>
            )
          case 'list':
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )
          default:
            return <p key={index}>{block.text}</p>
        }
      })}
    </div>
  )
}

function ArticlePage() {
  const { article } = Route.useLoaderData()
  const blocks = article.body ?? fallbackBody(article)
  const headings = blocks.filter(
    (block): block is Extract<ArticleBlock, { type: 'heading' }> => block.type === 'heading',
  )
  const related = getRelatedArticles(article.slug, 4)
  const recommended = getLatestArticles(8)
    .filter((item) => item.slug !== article.slug)
    .slice(0, 4)
  const categoryName = categoryLabels[article.category] ?? article.category

  return (
    <>
      {/* ------------------------------------------------------------- Banner */}
      <section className="relative isolate overflow-hidden bg-ink-950">
        <ImageFrame
          seed={`banner-${article.slug}`}
          ratio="aspect-auto"
          className="absolute inset-0 h-full"
          priority
        />
        <div aria-hidden="true" className="absolute inset-0 z-10 bg-ink-950/55" />
        <Container className="relative z-20 flex min-h-[240px] flex-col justify-start py-6 md:min-h-[300px]">
          <Breadcrumb
            tone="dark"
            items={[
              { label: 'Home', to: '/' },
              { label: 'Blog', to: '/blog' },
              { label: categoryName, to: '/blog', search: { category: article.category } },
              { label: article.title },
            ]}
          />
        </Container>
      </section>

      {/* ------------------------------------------------------- Article header */}
      <Section tone="cream" spacing="none" className="pt-12 md:pt-14">
        <Container>
          <Reveal className="grid gap-4">
            <Badge variant="category" size="md">
              {categoryName}
            </Badge>
            <h1 className="max-w-3xl text-display-lg">{article.title}</h1>
            <p className="max-w-xl text-[13.5px] leading-relaxed text-body">{article.excerpt}</p>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-6 border-b border-cream-300 pb-6">
              <div className="flex items-center gap-3">
                <Avatar name={article.author.name} size="lg" />
                <div className="flex flex-wrap items-center gap-2 text-[11.5px] text-muted">
                  <span className="font-semibold text-heading">By {article.author.name}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime} min read</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="mr-1 text-[11px] text-muted">Share this article</span>
                {SHARE_LINKS.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    className="inline-flex size-9 items-center justify-center rounded-[2px] border border-cream-400 text-body transition-colors duration-300 hover:border-gold-400 hover:text-gold-600"
                  >
                    <Icon aria-hidden="true" className="size-3.5" />
                  </button>
                ))}
                <button
                  type="button"
                  aria-label="Save article"
                  className="inline-flex size-9 items-center justify-center rounded-[2px] border border-cream-400 text-body transition-colors duration-300 hover:border-gold-400 hover:text-gold-600"
                >
                  <Bookmark aria-hidden="true" className="size-3.5" />
                </button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* --------------------------------------------------- Body + both rails */}
      <Section tone="cream" spacing="none" className="py-10 md:py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,210px)_minmax(0,1fr)_minmax(0,290px)] lg:gap-12">
            {/* Table of contents */}
            <aside className="order-2 lg:order-1" aria-labelledby="toc-heading">
              <div className="lg:sticky lg:top-32">
                <p id="toc-heading" className="text-eyebrow uppercase text-gold-500">
                  Table of Contents
                </p>
                <nav aria-label="Table of contents" className="mt-4">
                  <ol className="grid gap-2.5 border-l border-cream-400 pl-4">
                    {headings.map((heading) => (
                      <li key={heading.id} className="relative">
                        <span
                          aria-hidden="true"
                          className="absolute -left-[21px] top-2 size-1.5 rounded-full bg-gold-400"
                        />
                        <a
                          href={`#${heading.id}`}
                          className="text-[11.5px] leading-snug text-body transition-colors duration-300 hover:text-gold-600"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <Card variant="dark" padding="md" className="mt-7 grid gap-3">
                  <span className="inline-flex size-9 items-center justify-center rounded-[2px] border border-gold-400/40 text-gold-400">
                    <Bookmark aria-hidden="true" className="size-4" />
                  </span>
                  <p className="font-display text-[15px] font-bold leading-snug text-white">
                    Want more insights like this?
                  </p>
                  <p className="text-[11.5px] leading-relaxed text-white/50">
                    Join 100,000+ men getting actionable strategies every week.
                  </p>
                  <Button asChild size="sm" className="mt-1 w-fit">
                    <Link to="/newsletter">
                      Subscribe
                      <ButtonArrow />
                    </Link>
                  </Button>
                </Card>
              </div>
            </aside>

            {/* Body */}
            <article className="order-1 min-w-0 lg:order-2">
              <ArticleBody blocks={blocks} />

              <ul className="mt-8 flex flex-wrap gap-2.5 border-t border-cream-300 pt-6">
                {article.tags.map((tag) => (
                  <li key={tag}>
                    <Link to="/blog" search={{ tag }}>
                      <Badge variant="tag" size="md">
                        {tag}
                      </Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            </article>

            {/* Recommended + lead magnet */}
            <aside className="order-3" aria-labelledby="recommended-heading">
              <div className="lg:sticky lg:top-32">
                <p id="recommended-heading" className="text-eyebrow uppercase text-gold-500">
                  Recommended Articles
                </p>
                <Stagger className="mt-5 grid gap-5">
                  {recommended.map((item) => (
                    <StaggerItem key={item.slug}>
                      <ArticleListItem article={item} />
                    </StaggerItem>
                  ))}
                </Stagger>

                <Card variant="dark" padding="md" className="mt-7 grid gap-3">
                  <p className="text-eyebrow uppercase text-gold-400">Free Download</p>
                  <p className="font-display text-[17px] font-bold leading-snug text-white">
                    The Daily Systems Checklist
                  </p>
                  <p className="text-[11.5px] leading-relaxed text-white/50">
                    A simple checklist of the 7 systems top performers use every day.
                  </p>
                  <Button asChild size="sm" className="mt-1 w-fit">
                    <Link to="/newsletter">Download Now</Link>
                  </Button>
                  <ImageFrame
                    seed="lead-magnet"
                    ratio="aspect-[16/9]"
                    className="mt-2 rounded-[2px]"
                  />
                </Card>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- Related */}
      <Section tone="cream" spacing="none" className="pb-14 md:pb-16">
        <Container>
          <Reveal>
            <p className="text-eyebrow uppercase text-gold-500">Related Articles</p>
          </Reveal>
          <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((item) => (
              <StaggerItem key={item.slug} className="h-full">
                <ArticleCard article={item} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <NewsletterBand description="Join 100,000+ men getting actionable strategies, insights, and tools every week." />

      {/* ------------------------------------------------------------- Author */}
      <Section tone="cream" spacing="none" className="pt-12 md:pt-14">
        <Container>
          <Reveal>
            <AuthorCard
              name={article.author.name}
              role={article.author.role}
              bio={article.author.bio ?? article.author.role}
              links={
                <>
                  <a
                    href="https://www.manauthority.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${article.author.name} website`}
                    className="text-muted transition-colors hover:text-gold-600"
                  >
                    <Globe aria-hidden="true" className="size-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/man-authority"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${article.author.name} on LinkedIn`}
                    className="text-muted transition-colors hover:text-gold-600"
                  >
                    <Linkedin aria-hidden="true" className="size-4" />
                  </a>
                  <a
                    href="https://youtube.com/@manauthority"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${article.author.name} on YouTube`}
                    className="text-muted transition-colors hover:text-gold-600"
                  >
                    <Youtube aria-hidden="true" className="size-4" />
                  </a>
                </>
              }
            />
          </Reveal>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- Comments */}
      <Section tone="cream" spacing="lg">
        <Container>
          <Card variant="light" padding="lg" className="grid gap-6">
            <p className="text-eyebrow uppercase text-muted">
              Comments <span className="text-gold-500">({commentCount})</span>
            </p>

            <CommentForm />

            <ul className="grid gap-6 border-t border-cream-300 pt-6">
              {comments.map((comment) => (
                <li key={comment.id} className="flex gap-3.5">
                  <Avatar name={comment.author} size="md" />
                  <div className="grid gap-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-[11.5px]">
                      <span className="font-semibold text-heading">{comment.author}</span>
                      <span className="text-muted">
                        {formatDate(comment.date)} at {comment.time}
                      </span>
                    </div>
                    <p className="text-[12.5px] leading-relaxed text-body">{comment.body}</p>
                    <div className="flex items-center gap-4 text-[11px] text-muted">
                      <button type="button" className="transition-colors hover:text-gold-600">
                        Reply
                      </button>
                      <span className="flex items-center gap-1.5">
                        <ThumbsUp aria-hidden="true" className="size-3" />
                        {comment.likes}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-center">
              <Button variant="outlineDark" size="sm">
                View All Comments
              </Button>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  )
}

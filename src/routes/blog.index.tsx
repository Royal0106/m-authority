import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { seo, pageTitle } from '~/lib/seo'
import { categories } from '~/data/navigation'
import {
  categoryLabels,
  getEditorsPicks,
  getFeaturedArticle,
  getLatestArticles,
  getPopularArticles,
  popularTags,
  queryArticles,
} from '~/data/articles'
import { Container, Section } from '~/components/layout/primitives'
import { PageHero } from '~/components/layout/page-hero'
import { SectionHeader, Accent } from '~/components/content/section-header'
import {
  ArticleCard,
  ArticleListItem,
  FeaturedArticleCard,
  OverlayArticleCard,
  RankedArticleItem,
} from '~/components/content/article-card'
import { NewsletterBand } from '~/components/content/cta-banner'
import { SearchBar } from '~/components/utility/search-bar'
import { Pagination } from '~/components/utility/pagination'
import { EmptyState } from '~/components/utility/states'
import { Button, ButtonArrow } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { Icon } from '~/components/ui/icon'
import { AppLink } from '~/components/ui/app-link'
import { Reveal, Stagger, StaggerItem } from '~/components/motion'

export type BlogSearch = {
  category?: string
  tag?: string
  q?: string
  page?: number
}

export const Route = createFileRoute('/blog/')({
  /**
   * Search params are the single source of truth for filtering, so a filtered
   * view is shareable, bookmarkable and survives a refresh.
   */
  validateSearch: (search: Record<string, unknown>): BlogSearch => {
    const page = Number(search.page)
    return {
      category: typeof search.category === 'string' ? search.category : undefined,
      tag: typeof search.tag === 'string' ? search.tag : undefined,
      q: typeof search.q === 'string' ? search.q : undefined,
      page: Number.isFinite(page) && page > 0 ? page : undefined,
    }
  },
  head: () => ({
    meta: seo({
      title: pageTitle('Blog'),
      description:
        'Actionable advice on fitness, style, success, and everything in between.',
    }),
  }),
  component: BlogPage,
})

function BlogPage() {
  const search = Route.useSearch()
  const navigate = useNavigate()
  const isFiltered = Boolean(search.q || search.category || search.tag)

  const featured = getFeaturedArticle()
  const sideArticles = getLatestArticles(9).filter((a) => a.slug !== featured.slug).slice(0, 3)
  const latest = getLatestArticles(4)
  const popular = getPopularArticles(5)
  const picks = getEditorsPicks(4)

  const results = queryArticles({
    category: search.category,
    tag: search.tag,
    q: search.q,
    page: search.page ?? 1,
    perPage: 9,
  })

  const activeLabel = search.category
    ? categoryLabels[search.category] ?? search.category
    : search.tag ?? search.q

  return (
    <>
      <PageHero
        eyebrow="Blog"
        seed="blog-hero"
        size="md"
        titleNode={
          <>
            Insights. Strategies.
            <br />
            <Accent>Real Results.</Accent>
          </>
        }
        description="Actionable advice on fitness, style, success, and everything in between."
        footer={
          <SearchBar
            tone="light"
            size="md"
            defaultValue={search.q ?? ''}
            className="max-w-md"
          />
        }
      />

      {isFiltered ? (
        /* ----------------------------------------------------- Filtered view */
        <Section tone="cream" spacing="lg">
          <Container>
            <SectionHeader
              eyebrow="Results"
              title={
                <>
                  {results.total} article{results.total === 1 ? '' : 's'} for{' '}
                  <Accent italic>{activeLabel}</Accent>
                </>
              }
              action={{ label: 'Clear filters', to: '/blog' }}
            />

            {results.items.length ? (
              <>
                <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {results.items.map((article) => (
                    <StaggerItem key={article.slug} className="h-full">
                      <ArticleCard article={article} showExcerpt />
                    </StaggerItem>
                  ))}
                </Stagger>
                <div className="mt-10 flex justify-center">
                  <Pagination
                    page={results.page}
                    totalPages={results.totalPages}
                    to="/blog"
                    baseSearch={{
                      category: search.category,
                      tag: search.tag,
                      q: search.q,
                    }}
                  />
                </div>
              </>
            ) : (
              <EmptyState
                className="mt-8"
                title="No articles matched"
                description={`We couldn't find anything for "${activeLabel}". Try a different term or browse every article.`}
                actionLabel="Browse all articles"
                onAction={() => void navigate({ to: '/blog' })}
              />
            )}
          </Container>
        </Section>
      ) : (
        <>
          {/* ------------------------------------------------ Browse categories */}
          <Section tone="cream" spacing="md">
            <Container>
              <SectionHeader
                eyebrow="Browse Categories"
                title="Browse Categories"
                titleClassName="sr-only"
                action={{ label: 'View all categories', to: '/blog' }}
              />
              <Stagger className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
                {categories.map((category) => (
                  <StaggerItem key={category.slug}>
                    <AppLink
                      to="/blog"
                      search={{ category: category.slug }}
                      className="group flex h-full flex-col items-center justify-center gap-2 rounded-[3px] border border-cream-300 bg-white px-3 py-6 text-center transition-[transform,border-color,box-shadow] duration-500 ease-premium hover:-translate-y-1 hover:border-gold-300 hover:shadow-soft"
                    >
                      <Icon name={category.icon} className="size-6 text-gold-500" />
                      <p className="mt-1 text-[12.5px] font-bold text-heading">{category.name}</p>
                      <p className="text-[10.5px] text-muted">{category.articles} Articles</p>
                    </AppLink>
                  </StaggerItem>
                ))}
              </Stagger>
            </Container>
          </Section>

          {/* -------------------------------------------------- Featured article */}
          <Section tone="cream" spacing="none" className="pb-14 md:pb-16">
            <Container>
              <Reveal>
                <p className="text-eyebrow uppercase text-gold-500">Featured Article</p>
              </Reveal>
              <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,300px)] lg:gap-10">
                <FeaturedArticleCard article={featured}>
                  <div className="mt-1">
                    <Button asChild variant="dark" size="sm">
                      <Link to="/blog/$slug" params={{ slug: featured.slug }}>
                        Read Article
                      </Link>
                    </Button>
                  </div>
                </FeaturedArticleCard>

                <Stagger className="grid content-start gap-5">
                  {sideArticles.map((article) => (
                    <StaggerItem key={article.slug}>
                      <ArticleListItem article={article} />
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </Container>
          </Section>

          {/* ------------------------------------------- Latest + popular column */}
          <Section tone="cream" spacing="none" className="pb-14 md:pb-16">
            <Container>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,330px)] lg:gap-12">
                <div>
                  <SectionHeader
                    eyebrow="Latest Articles"
                    title="Latest Articles"
                    titleClassName="sr-only"
                    action={{ label: 'View all latest', to: '/blog' }}
                  />
                  <Stagger className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {latest.map((article) => (
                      <StaggerItem key={article.slug} className="h-full">
                        <ArticleCard article={article} />
                      </StaggerItem>
                    ))}
                  </Stagger>
                </div>

                <aside aria-labelledby="popular-heading">
                  <div className="flex items-end justify-between gap-4">
                    <p id="popular-heading" className="text-eyebrow uppercase text-gold-500">
                      Popular Articles
                    </p>
                    <Link
                      to="/blog"
                      className="group/btn inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-600 transition-colors hover:text-gold-500"
                    >
                      View all
                      <ButtonArrow />
                    </Link>
                  </div>
                  <Stagger className="mt-5 grid gap-5">
                    {popular.map((article, index) => (
                      <StaggerItem key={article.slug}>
                        <RankedArticleItem article={article} rank={index + 1} />
                      </StaggerItem>
                    ))}
                  </Stagger>
                </aside>
              </div>
            </Container>
          </Section>

          {/* ------------------------------------------------------ Editor picks */}
          <Section tone="cream" spacing="none" className="pb-16 md:pb-20">
            <Container>
              <Reveal>
                <p className="text-eyebrow uppercase text-gold-500">Editor&rsquo;s Picks</p>
              </Reveal>
              <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {picks.map((article) => (
                  <StaggerItem key={article.slug} className="h-full">
                    <OverlayArticleCard article={article} />
                  </StaggerItem>
                ))}
              </Stagger>
            </Container>
          </Section>

          <NewsletterBand />

          {/* ----------------------------------------------- Tags + pagination */}
          <Section tone="cream" spacing="lg">
            <Container>
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
                <div>
                  <p className="text-eyebrow uppercase text-gold-500">Popular Tags</p>
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {popularTags.map((tag) => (
                      <li key={tag}>
                        <AppLink to="/blog" search={{ tag }}>
                          <Badge variant="tag" size="md">
                            {tag}
                          </Badge>
                        </AppLink>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/blog"
                    className="group/btn mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-600 transition-colors hover:text-gold-500"
                  >
                    View all tags
                    <ButtonArrow />
                  </Link>
                </div>

                <div className="lg:justify-self-end">
                  <p className="text-eyebrow uppercase text-gold-500">Page Navigation</p>
                  <Pagination
                    className="mt-5 flex-wrap"
                    page={results.page}
                    totalPages={results.totalPages}
                    to="/blog"
                  />
                </div>
              </div>
            </Container>
          </Section>
        </>
      )}
    </>
  )
}

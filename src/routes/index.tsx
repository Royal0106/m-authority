import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Play, ShoppingBag, Star } from 'lucide-react'
import { seo } from '~/lib/seo'
import { site } from '~/data/site'
import { categories } from '~/data/navigation'
import { getLatestArticles } from '~/data/articles'
import {
  bestSellers,
  brianIntro,
  helpPillars,
  homeHero,
  homeStats,
  masterclass,
} from '~/data/home'
import { homeTestimonials } from '~/data/testimonials'
import { Container, Section } from '~/components/layout/primitives'
import { SectionHeader, Accent } from '~/components/content/section-header'
import { ArticleCard } from '~/components/content/article-card'
import { StatCard, TestimonialCard } from '~/components/content/cards'
import { CommunityBand, NewsletterBand } from '~/components/content/cta-banner'
import { ImageFrame } from '~/components/media/image-frame'
import { Button, ButtonArrow } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Badge } from '~/components/ui/badge'
import { Reveal, Stagger, StaggerItem, TextReveal } from '~/components/motion'
import { AppLink } from '~/components/ui/app-link'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: seo({
      title: `${site.name} — ${site.tagline}`,
      description: homeHero.body,
      keywords: 'mens fitness, mens style, success, mindset, AI for business',
    }),
  }),
  component: HomePage,
})

function HomePage() {
  const featured = getLatestArticles(4)

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden bg-ink-950">
        <ImageFrame
          seed="home-hero"
          ratio="aspect-auto"
          className="absolute inset-0 h-full"
          priority
        />
        <div aria-hidden="true" className="hero-vignette absolute inset-0 z-10" />

        <Container className="relative z-20 flex min-h-[540px] flex-col justify-center py-16 md:min-h-[620px] md:py-20">
          <div className="max-w-xl">
            <Reveal immediate direction="none" duration={0.5}>
              <p className="text-eyebrow uppercase text-gold-400">{homeHero.eyebrow}</p>
            </Reveal>

            <h1 className="mt-5 text-display-xl text-white">
              {homeHero.headline.map((line, index) => (
                <TextReveal
                  key={line}
                  as="span"
                  text={line}
                  delay={0.1 + index * 0.12}
                  className={
                    line === homeHero.accentLine ? 'block text-gold-400' : 'block'
                  }
                />
              ))}
            </h1>

            <Reveal immediate direction="up" delay={0.42} className="mt-6">
              <p className="max-w-md text-[13.5px] leading-relaxed text-white/60">
                {homeHero.body}
              </p>
            </Reveal>

            <Reveal immediate direction="up" delay={0.5} className="mt-8">
              <div className="flex flex-wrap items-center gap-3">
                <Button asChild size="md">
                  <Link to="/blog">
                    Explore Articles
                    <ButtonArrow />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="md">
                  <Link to="/newsletter">
                    Visit Store
                    <ShoppingBag aria-hidden="true" className="size-4" />
                  </Link>
                </Button>
              </div>
            </Reveal>

            <Reveal immediate direction="up" delay={0.58} className="mt-10">
              <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
                {homeHero.trust.map((item) => (
                  <li key={item.title} className="flex items-center gap-2.5">
                    <Icon name="badge-check" className="size-4 shrink-0 text-gold-400" />
                    <span className="grid leading-tight">
                      <span className="text-[11.5px] font-semibold text-white">
                        {item.title}
                      </span>
                      <span className="text-[10.5px] text-white/45">{item.description}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Years badge */}
          <Reveal
            immediate
            direction="left"
            delay={0.6}
            className="pointer-events-none absolute bottom-14 right-5 hidden lg:right-8 xl:block"
          >
            <div className="border border-white/12 bg-ink-950/60 px-7 py-5 text-center backdrop-blur-sm">
              <p className="font-display text-[30px] font-bold leading-none text-gold-400">
                {homeHero.badge.value}
              </p>
              <p className="mt-2 text-[9.5px] uppercase tracking-[0.18em] text-white/50">
                {homeHero.badge.label}
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ------------------------------------------------------ Top categories */}
      <Section tone="cream" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow="Explore What Matters"
            title="Top Categories"
            action={{ label: 'View all categories', to: '/blog' }}
          />
          <Stagger className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {categories.slice(0, 6).map((category) => (
              <StaggerItem key={category.slug}>
                <AppLink
                  to="/blog"
                  search={{ category: category.slug }}
                  className="group relative block overflow-hidden rounded-[3px]"
                >
                  <ImageFrame
                    seed={`cat-${category.slug}`}
                    ratio="aspect-[4/5]"
                    overlay="bottom"
                    zoomOnHover
                  >
                    <div className="absolute inset-x-0 bottom-0 z-20 grid gap-1 p-4 text-center">
                      <Icon
                        name={category.icon}
                        className="mx-auto size-5 text-gold-400 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5"
                      />
                      <p className="mt-1 text-[11.5px] font-bold uppercase tracking-[0.12em] text-white">
                        {category.name}
                      </p>
                      <p className="text-[10px] leading-snug text-white/55">{category.blurb}</p>
                    </div>
                  </ImageFrame>
                </AppLink>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ---------------------------------------------------- Featured articles */}
      <Section tone="cream" spacing="none" className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)] lg:gap-12">
            <Reveal className="grid content-start gap-4">
              <p className="text-eyebrow uppercase text-gold-500">Latest Insights</p>
              <h2 className="text-display-sm">Featured Articles</h2>
              <p className="text-[13px] leading-relaxed text-body">
                Actionable tips and strategies to help you level up in every area of life.
              </p>
              <Link
                to="/blog"
                className="group/btn mt-1 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-600 transition-colors hover:text-gold-500"
              >
                View all articles
                <ButtonArrow />
              </Link>
            </Reveal>

            <Stagger className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {featured.map((article) => (
                <StaggerItem key={article.slug} className="h-full">
                  <ArticleCard article={article} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- Community CTA */}
      <CommunityBand />

      {/* ------------------------------------------------------------ Bestsellers */}
      <Section tone="cream" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow="Top Picks"
            title="Shop Best Sellers"
            action={{ label: 'View all products', to: '/newsletter' }}
          />
          <Stagger className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {bestSellers.map((product) => (
              <StaggerItem key={product.name}>
                <article className="group grid gap-2.5">
                  <AppLink to="/newsletter" className="block overflow-hidden rounded-[3px]">
                    <ImageFrame seed={`product-${product.name}`} ratio="aspect-square" zoomOnHover />
                  </AppLink>
                  <h3 className="text-[12.5px] font-semibold text-heading">{product.name}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="flex" aria-label={`Rated ${product.rating} out of 5`}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          aria-hidden="true"
                          className={
                            index < Math.round(product.rating)
                              ? 'size-3 fill-gold-400 text-gold-400'
                              : 'size-3 text-cream-400'
                          }
                        />
                      ))}
                    </span>
                    <span className="text-[10.5px] text-muted">({product.reviews})</span>
                  </div>
                  <p className="text-[13px] font-bold text-heading">{product.price}</p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ About Brian */}
      <Section tone="cream" spacing="none" className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="right" className="relative">
              <ImageFrame seed="brian-portrait" ratio="aspect-[4/3]" className="rounded-[3px]" />
              <div className="absolute -bottom-px right-0 bg-gold-400 px-6 py-4 text-center">
                <p className="font-display text-[24px] font-bold leading-none text-ink-950">
                  {brianIntro.badge.value}
                </p>
                <p className="mt-1.5 text-[9px] uppercase tracking-[0.16em] text-ink-950/70">
                  {brianIntro.badge.label}
                </p>
              </div>
            </Reveal>

            <Reveal direction="left" className="grid gap-5">
              <p className="text-eyebrow uppercase text-gold-500">{brianIntro.eyebrow}</p>
              <h2 className="text-display-md">
                {brianIntro.title} <Accent italic>{brianIntro.titleAccent}</Accent>
              </h2>
              {brianIntro.body.map((paragraph) => (
                <p key={paragraph} className="text-[13px] leading-relaxed text-body">
                  {paragraph}
                </p>
              ))}
              <blockquote className="border-l-2 border-gold-400 pl-4 text-[12.5px] italic leading-relaxed text-body">
                {brianIntro.quote}
              </blockquote>
              <div className="mt-2 flex flex-wrap gap-2.5">
                {brianIntro.actions.map((action, index) => (
                  <Button
                    key={action.label}
                    asChild
                    size="sm"
                    variant={index === 0 ? 'dark' : 'outlineDark'}
                  >
                    <AppLink to={action.to}>{action.label}</AppLink>
                  </Button>
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- How I help */}
      <Section tone="cream" spacing="none" className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <SectionHeader
            eyebrow="How I Can Help"
            title={
              <>
                Where AI Meets Real Business <Accent italic>Results</Accent>
              </>
            }
          />
          <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {helpPillars.map((pillar) => (
              <StaggerItem key={pillar.title} className="grid content-start gap-3">
                <Icon name={pillar.icon} className="size-6 text-gold-500" />
                <h3 className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-heading">
                  {pillar.title}
                </h3>
                <p className="text-[11.5px] leading-relaxed text-body">{pillar.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- Stats */}
      <Section tone="darker" spacing="none" className="py-12 md:py-14">
        <Container>
          <Stagger className="grid grid-cols-2 gap-8 divide-cream-400/10 lg:grid-cols-4 lg:divide-x">
            {homeStats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <StatCard value={stat.value} label={stat.label} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* --------------------------------------------------------- Testimonials */}
      <Section tone="cream" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow="What Others Say"
            align="center"
            title={
              <>
                Don&rsquo;t Take My Word <Accent italic>For It</Accent>
              </>
            }
          />
          <Stagger className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {homeTestimonials.map((testimonial) => (
              <StaggerItem key={testimonial.name} className="h-full">
                <TestimonialCard testimonial={testimonial} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- Masterclass */}
      <Section tone="darker" spacing="md">
        <Container>
          <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="relative overflow-hidden rounded-[3px] border border-white/8">
              <ImageFrame seed="masterclass" ratio="aspect-[16/10]" overlay="soft">
                <span className="absolute left-4 top-4 z-20 rounded-[2px] bg-ink-950/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-400 backdrop-blur-sm">
                  {masterclass.eventLabel}
                </span>
                <span className="absolute inset-0 z-20 m-auto inline-flex size-14 items-center justify-center rounded-full border border-white/25 bg-ink-950/50 text-white backdrop-blur-sm">
                  <Play aria-hidden="true" className="ml-0.5 size-5 fill-current" />
                </span>
              </ImageFrame>
            </div>

            <div className="grid gap-5">
              <p className="text-eyebrow uppercase text-gold-400">{masterclass.eyebrow}</p>
              <h2 className="text-display-md text-white">
                {masterclass.title} <Accent italic>{masterclass.titleAccent}</Accent>
              </h2>
              <p className="max-w-lg text-[13px] leading-relaxed text-white/55">
                {masterclass.body}
              </p>
              <ul className="mt-1 flex flex-wrap items-center gap-x-10 gap-y-4">
                {masterclass.stats.map((stat) => (
                  <li key={stat.label}>
                    <StatCard value={stat.value} label={stat.label} align="left" />
                  </li>
                ))}
              </ul>
              <div className="mt-2">
                <Button asChild size="md">
                  <Link to="/newsletter">
                    Reserve My Seat
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ Newsletter */}
      <NewsletterBand
        title={
          <>
            Get the AI <Accent italic>Advantage</Accent>
          </>
        }
        description="Join 100,000+ high performers getting weekly AI strategies, insights, and tools to stay ahead."
        tone="panel"
      />

      {/* Category shortcut strip (mobile-friendly quick nav) */}
      <Section tone="cream" spacing="sm">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {categories.map((category) => (
              <AppLink
                key={category.slug}
                to="/blog"
                search={{ category: category.slug }}
              >
                <Badge variant="tag" size="md">
                  {category.name}
                </Badge>
              </AppLink>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}

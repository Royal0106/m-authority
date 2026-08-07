import { createFileRoute, Link } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import { seo, pageTitle } from '~/lib/seo'
import { newsletterFaqs } from '~/data/faqs'
import { getEditorsPicks } from '~/data/articles'
import { homeTestimonials } from '~/data/testimonials'
import { Container, Section } from '~/components/layout/primitives'
import { PageHero } from '~/components/layout/page-hero'
import { SectionHeader, Accent } from '~/components/content/section-header'
import { ArticleCard } from '~/components/content/article-card'
import { StatCard, TestimonialCard } from '~/components/content/cards'
import { FaqList } from '~/components/content/faq'
import { NewsletterForm } from '~/components/forms/newsletter-form'
import { ImageFrame } from '~/components/media/image-frame'
import { Button, ButtonArrow } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Icon } from '~/components/ui/icon'
import { Reveal, Stagger, StaggerItem } from '~/components/motion'

export const Route = createFileRoute('/newsletter')({
  head: () => ({
    meta: seo({
      title: pageTitle('Newsletter'),
      description:
        'Join 100,000+ men getting one focused email every Sunday — systems, strategies and tools that compound.',
    }),
  }),
  component: NewsletterPage,
})

const BENEFITS = [
  {
    icon: 'compass',
    title: 'One Idea, Fully Explained',
    description: 'No link dumps. One framework per issue, broken down until it is usable.',
  },
  {
    icon: 'timer',
    title: 'Under Five Minutes',
    description: 'Written to be read with a coffee before the day takes over.',
  },
  {
    icon: 'workflow',
    title: 'Built From Real Work',
    description: 'Everything comes from client engagements, not recycled advice.',
  },
  {
    icon: 'shield-check',
    title: 'Zero Noise',
    description: 'No spam, no sponsorships you did not ask for, unsubscribe in one click.',
  },
]

const FREEBIES = [
  {
    title: 'The Ultimate Morning Routine Guide',
    description: 'The exact first-90-minutes template used by high performers.',
  },
  {
    title: 'The Daily Systems Checklist',
    description: 'A one-page checklist of the 7 systems that compound.',
  },
  {
    title: 'The AI Leverage Playbook',
    description: 'Five workflows worth automating before anything else.',
  },
]

const STATS = [
  { value: '100,000+', label: 'Subscribers' },
  { value: '4.9★', label: 'Average Rating' },
  { value: 'Weekly', label: 'Every Sunday' },
  { value: '0', label: 'Spam, ever' },
]

function NewsletterPage() {
  const picks = getEditorsPicks(4)

  return (
    <>
      <PageHero
        eyebrow="Newsletter"
        seed="newsletter-hero"
        size="lg"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Newsletter' }]}
        titleNode={
          <>
            One Email a Week.
            <br />
            <Accent>Zero Wasted Minutes.</Accent>
          </>
        }
        description="Join 100,000+ men getting the systems, strategies and tools that actually move the needle — delivered every Sunday morning."
        footer={
          <NewsletterForm
            variant="label"
            submitLabel="Join Free"
            tone="dark"
            size="lg"
            className="max-w-lg"
            assurances={['No spam', 'Unsubscribe anytime', '100% value, no fluff']}
          />
        }
        aside={
          <div className="grid divide-y divide-white/8 border border-white/10 bg-ink-950/60 backdrop-blur-sm lg:w-[250px]">
            {STATS.map((stat) => (
              <div key={stat.label} className="px-7 py-4 text-center">
                <p className="font-display text-[22px] font-bold leading-none text-gold-400">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[10.5px] text-white/45">{stat.label}</p>
              </div>
            ))}
          </div>
        }
      />

      {/* ------------------------------------------------------------ Benefits */}
      <Section tone="cream" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow="What You Get"
            title={
              <>
                Written to Be <Accent italic>Used</Accent>, Not Skimmed
              </>
            }
          />
          <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BENEFITS.map((benefit) => (
              <StaggerItem key={benefit.title} className="grid content-start gap-3">
                <Icon name={benefit.icon} className="size-7 text-gold-500" />
                <h3 className="text-[13px] font-bold text-heading">{benefit.title}</h3>
                <p className="text-[11.5px] leading-relaxed text-body">{benefit.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Welcome bundle */}
      <Section tone="darker" spacing="lg">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="right" className="relative overflow-hidden rounded-[3px]">
              <ImageFrame seed="newsletter-bundle" ratio="aspect-[4/3]" overlay="soft" />
              <span className="absolute left-5 top-5 z-20 rounded-[2px] bg-gold-400 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-950">
                Free When You Join
              </span>
            </Reveal>

            <Reveal direction="left" className="grid gap-5">
              <p className="text-eyebrow uppercase text-gold-400">The Welcome Bundle</p>
              <h2 className="text-display-md text-white">
                Three Guides, <Accent italic>Sent Instantly</Accent>
              </h2>
              <ul className="grid gap-5">
                {FREEBIES.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-gold-400" />
                    <span className="grid gap-1">
                      <span className="text-[13px] font-bold text-white">{item.title}</span>
                      <span className="text-[11.5px] leading-relaxed text-white/50">
                        {item.description}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
              <NewsletterForm
                variant="label"
                submitLabel="Send Me the Bundle"
                tone="dark"
                size="lg"
                className="mt-2 max-w-md"
                assurances={['No spam', 'Unsubscribe anytime']}
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------- Recent issues */}
      <Section tone="cream" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow="Recent Issues"
            title="A Taste of What Lands in Your Inbox"
            action={{ label: 'Browse all articles', to: '/blog' }}
          />
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {picks.map((article) => (
              <StaggerItem key={article.slug} className="h-full">
                <ArticleCard article={article} showExcerpt />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* --------------------------------------------------------- Social proof */}
      <Section tone="darker" spacing="none" className="py-12 md:py-14">
        <Container>
          <Stagger className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((stat) => (
              <StaggerItem key={stat.label}>
                <StatCard value={stat.value} label={stat.label} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      <Section tone="cream" spacing="lg">
        <Container>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {homeTestimonials.map((testimonial) => (
              <StaggerItem key={testimonial.name} className="h-full">
                <TestimonialCard testimonial={testimonial} showQuoteMark />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- FAQ + CTA */}
      <Section tone="cream" spacing="none" className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,400px)] lg:gap-12">
            <div>
              <Reveal className="grid gap-3">
                <p className="text-eyebrow uppercase text-gold-500">FAQ</p>
                <h2 className="text-display-sm">Before You Subscribe</h2>
              </Reveal>
              <Reveal delay={0.1} className="mt-6">
                <FaqList items={newsletterFaqs} defaultOpen={0} />
              </Reveal>
            </div>

            <Reveal direction="left">
              <Card variant="dark" padding="lg" className="grid h-full content-center gap-4">
                <p className="text-eyebrow uppercase text-gold-400">Join the Movement</p>
                <h3 className="font-display text-[22px] font-bold leading-snug text-white">
                  Start Sunday With a Plan
                </h3>
                <p className="text-[12.5px] leading-relaxed text-white/50">
                  One focused email. Free forever. Leave whenever you like.
                </p>
                <NewsletterForm
                  variant="label"
                  submitLabel="Subscribe"
                  tone="dark"
                  size="lg"
                  className="mt-1"
                  assurances={['No spam', 'Unsubscribe anytime']}
                />
                <Button asChild variant="ghostLight" size="sm" className="mt-1 w-fit px-0">
                  <Link to="/privacy">
                    Read our privacy policy
                    <ButtonArrow />
                  </Link>
                </Button>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}

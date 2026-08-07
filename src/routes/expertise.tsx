import { createFileRoute, Link } from '@tanstack/react-router'
import { seo, pageTitle } from '~/lib/seo'
import {
  caseStudies,
  expertiseAreas,
  expertiseHero,
  featuredTopics,
  impactStats,
  industries,
  process,
} from '~/data/expertise'
import { expertiseFaqs } from '~/data/faqs'
import { expertiseTestimonials, featuredQuote } from '~/data/testimonials'
import { Container, Section } from '~/components/layout/primitives'
import { PageHero } from '~/components/layout/page-hero'
import { SectionHeader, Accent } from '~/components/content/section-header'
import {
  CaseStudyCard,
  ExpertiseCard,
  StatCard,
  TestimonialCard,
} from '~/components/content/cards'
import { ProcessSteps } from '~/components/content/timeline'
import { FaqList } from '~/components/content/faq'
import { ImageFrame } from '~/components/media/image-frame'
import { Avatar } from '~/components/content/avatar'
import { Button, ButtonArrow } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Reveal, Stagger, StaggerItem } from '~/components/motion'

export const Route = createFileRoute('/expertise')({
  head: () => ({
    meta: seo({ title: pageTitle('Expertise'), description: expertiseHero.body }),
  }),
  component: ExpertisePage,
})

function ExpertisePage() {
  return (
    <>
      <PageHero
        eyebrow={expertiseHero.eyebrow}
        seed="expertise-hero"
        size="lg"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Expertise' }]}
        titleNode={
          <>
            {expertiseHero.title}
            <br />
            <Accent>{expertiseHero.titleAccent}</Accent> {expertiseHero.titleRest}
          </>
        }
        description={expertiseHero.body}
        actions={
          <Button asChild size="md">
            <Link to="/booking">
              Work With Me
              <ButtonArrow />
            </Link>
          </Button>
        }
        aside={
          <div className="grid divide-y divide-gold-400/20 border border-gold-400/30 bg-ink-950/50 backdrop-blur-sm">
            {expertiseHero.stats.map((stat) => (
              <div key={stat.label} className="px-8 py-5 text-center">
                <p className="font-display text-[26px] font-bold leading-none text-gold-400">
                  {stat.value}
                </p>
                <p className="mt-1.5 text-[10.5px] text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>
        }
      />

      {/* ------------------------------------------------- Areas of expertise */}
      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-14">
            <Reveal className="grid content-start gap-4">
              <p className="text-eyebrow uppercase text-gold-500">Areas of Expertise</p>
              <h2 className="text-display-sm">
                Where Strategy Meets <Accent italic>Real-World</Accent> Impact
              </h2>
              <p className="text-[13px] leading-relaxed text-body">
                I combine strategic thinking with practical systems and emerging technology to help
                you grow, lead, and win in every area of life.
              </p>
            </Reveal>

            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {expertiseAreas.map((area) => (
                <StaggerItem key={area.title} className="h-full">
                  <ExpertiseCard
                    icon={area.icon}
                    title={area.title}
                    description={area.description}
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Featured topics */}
      <Section tone="darker" spacing="lg">
        <Container>
          <SectionHeader
            tone="dark"
            eyebrow="Featured Topics"
            title={
              <>
                Topics I Help Clients <Accent italic>Master</Accent>
              </>
            }
            action={{ label: 'View all topics', to: '/blog' }}
          />
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {featuredTopics.map((topic) => (
              <StaggerItem key={topic.title} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-[3px]">
                  <ImageFrame
                    seed={`topic-${topic.title}`}
                    ratio="aspect-[4/3]"
                    overlay="bottom"
                    zoomOnHover
                  />
                  <div className="absolute inset-x-0 bottom-0 z-20 grid gap-1 p-4">
                    <h3 className="font-sans text-[12px] font-bold leading-snug text-white">
                      {topic.title}
                    </h3>
                    <p className="text-[10.5px] leading-relaxed text-white/55">
                      {topic.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ------------------------------------------------------------- Process */}
      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-14">
            <Reveal className="grid content-start gap-4">
              <p className="text-eyebrow uppercase text-gold-500">My Process</p>
              <h2 className="text-display-sm">
                A Proven Process.
                <br />
                <Accent italic>Real Results.</Accent>
              </h2>
              <p className="text-[13px] leading-relaxed text-body">
                A clear, step-by-step approach designed to unlock clarity, build systems, and create
                measurable outcomes.
              </p>
              <div className="mt-2">
                <Button asChild variant="dark" size="sm">
                  <Link to="/booking">
                    Work With Me
                    <ButtonArrow />
                  </Link>
                </Button>
              </div>
            </Reveal>
            <ProcessSteps steps={process} tone="light" />
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- Case studies */}
      <Section tone="darker" spacing="lg">
        <Container>
          <SectionHeader
            tone="dark"
            eyebrow="Results & Case Studies"
            title={
              <>
                Real Clients. <Accent italic>Real Results.</Accent>
              </>
            }
            action={{ label: 'View all case studies', to: '/ai-for-business' }}
          />

          <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-8">
            <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {caseStudies.map((study) => (
                <StaggerItem key={study.client} className="h-full">
                  <CaseStudyCard
                    variant="panel"
                    sector={study.client}
                    headline={study.result}
                    tags={study.tags}
                    seed={`case-${study.client}`}
                  />
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal direction="left">
              <figure className="grid h-full content-center gap-5 rounded-[3px] border border-white/8 bg-ink-800 p-7">
                <blockquote className="text-[13px] leading-relaxed text-white/75">
                  {featuredQuote.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <Avatar name={featuredQuote.name} size="md" />
                  <span className="grid leading-tight">
                    <span className="text-[12.5px] font-semibold text-white">
                      {featuredQuote.name}
                    </span>
                    <span className="text-[11px] text-white/40">{featuredQuote.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ Industries */}
      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-14">
            <Reveal className="grid content-start gap-4">
              <p className="text-eyebrow uppercase text-gold-500">Client Industries</p>
              <h2 className="text-display-sm">Industries I Serve</h2>
              <p className="text-[13px] leading-relaxed text-body">
                I work with ambitious leaders and organizations across a wide range of industries.
              </p>
            </Reveal>

            <Stagger className="grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
              {industries.map((industry) => (
                <StaggerItem
                  key={industry.name}
                  className="flex flex-col items-center gap-2.5 text-center"
                >
                  <Icon name={industry.icon} className="size-6 text-gold-500" />
                  <p className="text-[11px] font-semibold text-heading">{industry.name}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- The impact */}
      <Section tone="darker" spacing="none" className="py-12 md:py-14">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)]">
            <Reveal className="grid gap-2">
              <p className="text-eyebrow uppercase text-gold-400">The Impact</p>
              <h2 className="text-display-sm text-white">Numbers That Speak</h2>
            </Reveal>
            <Stagger className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
              {impactStats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <StatCard value={stat.value} label={stat.label} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- Testimonials */}
      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-14">
            <Reveal className="grid content-start gap-4">
              <p className="text-eyebrow uppercase text-gold-500">Client Testimonials</p>
              <h2 className="text-display-sm">What Clients Say</h2>
              <p className="text-[13px] leading-relaxed text-body">
                Real feedback from real people who have experienced real transformation.
              </p>
            </Reveal>
            <Stagger className="grid gap-5 md:grid-cols-3">
              {expertiseTestimonials.map((testimonial) => (
                <StaggerItem key={testimonial.name} className="h-full">
                  <TestimonialCard testimonial={testimonial} />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- FAQ + CTA */}
      <Section tone="cream" spacing="none" className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,170px)_minmax(0,1fr)] lg:gap-8">
              <Reveal className="grid content-start gap-3">
                <p className="text-eyebrow uppercase text-gold-500">FAQ</p>
                <h2 className="text-display-sm">Common Questions</h2>
                <p className="text-[12.5px] leading-relaxed text-body">
                  Answers to questions about my expertise and how we work together.
                </p>
                <Link
                  to="/contact"
                  className="group/btn mt-1 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold-600 transition-colors hover:text-gold-500"
                >
                  View all FAQs
                  <ButtonArrow />
                </Link>
              </Reveal>
              <Reveal delay={0.1}>
                <FaqList items={expertiseFaqs} defaultOpen={0} />
              </Reveal>
            </div>

            <Reveal direction="left" className="relative overflow-hidden rounded-[3px]">
              <ImageFrame seed="expertise-cta" ratio="aspect-[16/10]" overlay="strong" />
              <div className="absolute inset-0 z-20 flex flex-col justify-end gap-3 p-8">
                <p className="text-eyebrow uppercase text-gold-400">Ready to Get Started?</p>
                <h2 className="text-display-sm text-white">
                  Let&rsquo;s Build Something Extraordinary Together
                </h2>
                <p className="max-w-md text-[12.5px] leading-relaxed text-white/55">
                  Whether you need strategic guidance, systems implementation, or AI solutions—
                  I&rsquo;m here to help.
                </p>
                <div className="mt-2">
                  <Button asChild size="md">
                    <Link to="/booking">
                      Book a Strategy Call
                      <ButtonArrow />
                    </Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  )
}

import { createFileRoute, Link } from '@tanstack/react-router'
import { seo, pageTitle } from '~/lib/seo'
import {
  aiCaseStudies,
  aiHero,
  aiIndustries,
  aiSolutions,
  businessProblems,
  growthFramework,
  implementationSteps,
  roiStats,
  strategyCallInterests,
  whyAiMatters,
} from '~/data/ai-business'
import { aiFaqs } from '~/data/faqs'
import { aiTestimonials } from '~/data/testimonials'
import { Container, Section } from '~/components/layout/primitives'
import { PageHero } from '~/components/layout/page-hero'
import { SectionHeader, Accent } from '~/components/content/section-header'
import {
  CaseStudyCard,
  ExpertiseCard,
  FeatureRow,
  ProblemCard,
  StatCard,
  StatPanel,
  TestimonialCard,
} from '~/components/content/cards'
import { ProcessSteps } from '~/components/content/timeline'
import { FaqList } from '~/components/content/faq'
import { StrategyCallForm } from '~/components/forms/booking-form'
import { NewsletterBand } from '~/components/content/cta-banner'
import { ImageFrame } from '~/components/media/image-frame'
import { Button, ButtonArrow } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Icon } from '~/components/ui/icon'
import { Reveal, Stagger, StaggerItem } from '~/components/motion'

export const Route = createFileRoute('/ai-for-business')({
  head: () => ({
    meta: seo({
      title: pageTitle('AI For Business'),
      description: aiHero.body,
      keywords: 'AI strategy, business automation, AI consulting',
    }),
  }),
  component: AiForBusinessPage,
})

function AiForBusinessPage() {
  return (
    <>
      <PageHero
        eyebrow={aiHero.eyebrow}
        seed="ai-hero"
        size="lg"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'AI For Business' }]}
        titleNode={
          <>
            {aiHero.title}
            <br />
            {aiHero.titleSecond}
            <br />
            <Accent>{aiHero.titleAccent}</Accent>
          </>
        }
        description={aiHero.body}
        actions={
          <>
            <Button asChild size="md">
              <a href="#strategy-call">
                Book Strategy Call
                <ButtonArrow />
              </a>
            </Button>
            <Button asChild variant="outline" size="md">
              <a href="#solutions">Explore Solutions</a>
            </Button>
          </>
        }
        aside={<StatPanel stats={aiHero.stats} className="lg:w-[290px]" />}
      />

      {/* ------------------------------------------- Why AI matters + problems */}
      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-14">
            <Reveal className="grid content-start gap-5">
              <p className="text-eyebrow uppercase text-gold-500">{whyAiMatters.eyebrow}</p>
              <h2 className="text-display-sm">
                {whyAiMatters.title}
                <br />
                {whyAiMatters.titleSecond}
                <br />
                <Accent italic>{whyAiMatters.titleAccent}</Accent>
              </h2>
              <p className="text-[12.5px] leading-relaxed text-body">{whyAiMatters.body}</p>
              <ul className="mt-2 grid gap-5 sm:grid-cols-2">
                {whyAiMatters.benefits.map((benefit) => (
                  <li key={benefit.title}>
                    <FeatureRow
                      icon={benefit.icon}
                      title={benefit.title}
                      description={benefit.description}
                    />
                  </li>
                ))}
              </ul>
            </Reveal>

            <div className="grid content-start gap-5">
              <Reveal>
                <p className="text-eyebrow uppercase text-gold-500">Common Business Problems</p>
                <h2 className="mt-3 text-display-sm">Stuck, Slow, and Losing Opportunities?</h2>
              </Reveal>
              <Stagger className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {businessProblems.map((problem) => (
                  <StaggerItem key={problem.title} className="h-full">
                    <ProblemCard
                      title={problem.title}
                      description={problem.description}
                      seed={`problem-${problem.title}`}
                    />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ Solutions */}
      <Section id="solutions" tone="cream" spacing="none" className="pb-16 md:pb-20">
        <Container>
          <SectionHeader
            eyebrow="AI Solutions That Deliver"
            title="Strategic Solutions. Measurable Impact."
          />
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {aiSolutions.map((solution) => (
              <StaggerItem key={solution.title} className="h-full">
                <ExpertiseCard
                  icon={solution.icon}
                  title={solution.title}
                  description={solution.description}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- Industries */}
      <Section tone="cream" spacing="none" className="pb-16 md:pb-20">
        <Container>
          <Reveal>
            <p className="text-eyebrow uppercase text-gold-500">Industries I Serve</p>
            <h2 className="mt-3 text-display-sm">AI Solutions for Every Industry</h2>
          </Reveal>
          <Stagger className="mt-7 grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
            {aiIndustries.map((industry) => (
              <StaggerItem key={industry} className="h-full">
                <article className="group relative h-full overflow-hidden rounded-[3px]">
                  <ImageFrame
                    seed={`industry-${industry}`}
                    ratio="aspect-[4/3]"
                    overlay="strong"
                    zoomOnHover
                  />
                  <p className="absolute inset-0 z-20 grid place-content-center px-2 text-center text-[11px] font-semibold text-white">
                    {industry}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Growth framework */}
      <Section tone="darker" spacing="lg" className="relative overflow-hidden">
        <ImageFrame
          seed="framework"
          ratio="aspect-auto"
          className="absolute inset-0 h-full"
          overlay="strong"
        />
        <Container className="relative z-20">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-14">
            <Reveal className="grid content-start gap-4">
              <p className="text-eyebrow uppercase text-gold-400">Proven Framework</p>
              <h2 className="text-display-sm text-white">
                My AI Growth
                <br />
                Framework
              </h2>
              <p className="text-[12.5px] leading-relaxed text-white/50">
                A proven system to help businesses integrate AI and achieve sustainable results.
              </p>
            </Reveal>
            <ProcessSteps steps={growthFramework} tone="dark" />
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------- Implementation steps */}
      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-14">
            <Reveal className="grid content-start gap-4">
              <p className="text-eyebrow uppercase text-gold-500">Implementation Process</p>
              <h2 className="text-display-sm">From Strategy to Success</h2>
              <p className="text-[12.5px] leading-relaxed text-body">
                A seamless process designed to minimise disruption and maximise results.
              </p>
              <div className="mt-2">
                <Button asChild size="md">
                  <a href="#strategy-call">
                    Work With Me
                    <ButtonArrow />
                  </a>
                </Button>
              </div>
            </Reveal>

            <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {implementationSteps.map((item) => (
                <StaggerItem key={item.step} className="h-full">
                  <Card
                    variant="raised"
                    interactive
                    padding="md"
                    className="grid h-full content-start gap-2.5"
                  >
                    <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {item.step}
                    </p>
                    <Icon name="workflow" className="size-6 text-gold-500" />
                    <h3 className="text-[12.5px] font-bold text-heading">{item.title}</h3>
                    <p className="text-[11px] leading-relaxed text-body">{item.description}</p>
                  </Card>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- Case studies */}
      <Section tone="cream" spacing="none" className="pb-16 md:pb-20">
        <Container>
          <SectionHeader
            eyebrow="Case Studies"
            title={
              <>
                Real Businesses. <Accent italic>Real Results.</Accent>
              </>
            }
            action={{ label: 'View all case studies', to: '/expertise' }}
          />
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {aiCaseStudies.map((study) => (
              <StaggerItem key={study.headline} className="h-full">
                <CaseStudyCard
                  sector={study.sector}
                  headline={study.headline}
                  description={study.description}
                  seed={`ai-case-${study.sector}`}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- ROI */}
      <Section tone="cream" spacing="none" className="pb-16 md:pb-20">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
            <Reveal className="grid gap-2">
              <p className="text-eyebrow uppercase text-gold-500">The ROI of AI</p>
              <h2 className="text-display-sm">The Numbers Don&rsquo;t Lie</h2>
            </Reveal>
            <Stagger className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
              {roiStats.map((stat) => (
                <StaggerItem key={stat.label}>
                  <StatCard
                    value={stat.value}
                    label={stat.label}
                    icon={stat.icon}
                    tone="light"
                  />
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- Testimonials */}
      <Section tone="cream" spacing="none" className="pb-16 md:pb-20">
        <Container>
          <SectionHeader eyebrow="What Clients Say" title="Trusted by Leaders" />
          <Stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {aiTestimonials.map((testimonial) => (
              <StaggerItem key={testimonial.name} className="h-full">
                <TestimonialCard testimonial={testimonial} showQuoteMark />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ---------------------------------------------------- FAQ + strategy call */}
      <Section id="strategy-call" tone="cream" spacing="none" className="pb-16 md:pb-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
            <Reveal className="grid content-start gap-5">
              <div className="grid gap-3">
                <p className="text-eyebrow uppercase text-gold-500">FAQ</p>
                <h2 className="text-display-sm">Common Questions</h2>
              </div>
              <FaqList items={aiFaqs} defaultOpen={0} />
            </Reveal>

            <Reveal direction="left">
              <Card variant="dark" padding="lg" className="grid gap-5">
                <div className="grid gap-2">
                  <p className="text-eyebrow uppercase text-gold-400">
                    Ready to Transform Your Business?
                  </p>
                  <h2 className="text-display-sm text-white">
                    Let&rsquo;s Build Smarter Systems That Drive Real Results
                  </h2>
                  <p className="text-[12.5px] leading-relaxed text-white/50">
                    Book a free strategy call and discover how AI can save you time, reduce costs,
                    and accelerate growth.
                  </p>
                </div>
                <StrategyCallForm interests={strategyCallInterests} />
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      <NewsletterBand
        title="Get Weekly Insights on AI & Business Growth"
        description="Join 100,000+ high performers getting strategies, tools, and insights every week."
        tone="panel"
      />

      <Section tone="cream" spacing="sm">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="text-[12.5px] text-body">
              Prefer to talk it through first?
            </p>
            <Button asChild variant="outlineDark" size="sm">
              <Link to="/contact">
                Contact the team
                <ButtonArrow />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}

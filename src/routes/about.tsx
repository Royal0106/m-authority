import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, Star } from 'lucide-react'
import { seo, pageTitle } from '~/lib/seo'
import {
  aboutHero,
  achievements,
  companies,
  mission,
  myStory,
  personalIntro,
  timeline,
  values,
  workTogether,
} from '~/data/about'
import { aboutFaqs } from '~/data/faqs'
import { aboutTestimonials, pressQuote } from '~/data/testimonials'
import { Container, Grid, Section } from '~/components/layout/primitives'
import { PageHero } from '~/components/layout/page-hero'
import { Accent } from '~/components/content/section-header'
import { ExpertiseCard, StatCard, TestimonialCard } from '~/components/content/cards'
import { Timeline } from '~/components/content/timeline'
import { FaqList } from '~/components/content/faq'
import { ImageFrame } from '~/components/media/image-frame'
import { Avatar } from '~/components/content/avatar'
import { Button, ButtonArrow } from '~/components/ui/button'
import { Icon } from '~/components/ui/icon'
import { Reveal, Stagger, StaggerItem } from '~/components/motion'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: seo({ title: pageTitle('About'), description: aboutHero.body }),
  }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={aboutHero.eyebrow}
        seed="about-hero"
        size="lg"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'About' }]}
        titleNode={
          <>
            {aboutHero.title}
            <br />
            <Accent>{aboutHero.titleAccent}</Accent>
            <br />
            {aboutHero.titleRest}
          </>
        }
        description={aboutHero.body}
        footer={
          <ul className="flex flex-wrap items-center gap-x-10 gap-y-5">
            {aboutHero.stats.map((stat) => (
              <li key={stat.label} className="flex items-center gap-3">
                <Icon name="award" className="size-5 shrink-0 text-gold-400" />
                <span className="grid leading-tight">
                  <span className="font-display text-[20px] font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-[10.5px] text-white/45">{stat.label}</span>
                </span>
              </li>
            ))}
          </ul>
        }
      />

      {/* --------------------------------------------------- Personal intro */}
      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="right" className="relative">
              <ImageFrame seed="brian-about" ratio="aspect-[4/5]" className="rounded-[3px]" />
              <span
                aria-hidden="true"
                className="absolute -bottom-4 right-6 font-script text-[28px] text-gold-500"
              >
                Brian Hanson
              </span>
            </Reveal>

            <Reveal direction="left" className="grid gap-5">
              <p className="text-eyebrow uppercase text-gold-500">{personalIntro.eyebrow}</p>
              <h2 className="text-display-md">{personalIntro.greeting}</h2>
              <p className="text-[13px] font-semibold text-heading">{personalIntro.role}</p>
              {personalIntro.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[13px] leading-relaxed text-body">
                  {paragraph}
                </p>
              ))}
              <div className="mt-2">
                <Button asChild variant="dark" size="md">
                  <Link to="/booking">
                    Work With Me
                    <ButtonArrow />
                  </Link>
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- My story */}
      <Section tone="cream" spacing="none" className="pb-16 md:pb-20 lg:pb-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal direction="right" className="grid gap-5">
              <p className="text-eyebrow uppercase text-gold-500">{myStory.eyebrow}</p>
              <h2 className="text-display-md">
                {myStory.title} <Accent italic>{myStory.titleAccent}</Accent>
              </h2>
              {myStory.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-[13px] leading-relaxed text-body">
                  {paragraph}
                </p>
              ))}
            </Reveal>
            <Reveal direction="left">
              <ImageFrame seed="story" ratio="aspect-[4/3]" className="rounded-[3px]" />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- Mission */}
      <Section tone="darker" spacing="lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-16">
            <Reveal className="grid content-start gap-4">
              <p className="text-eyebrow uppercase text-gold-400">{mission.eyebrow}</p>
              <h2 className="text-display-md text-white">{mission.title}</h2>
              <p className="text-[12.5px] leading-relaxed text-white/50">{mission.body}</p>
            </Reveal>

            <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {mission.pillars.map((pillar) => (
                <StaggerItem key={pillar.title} className="grid content-start gap-3 text-center">
                  <Icon name={pillar.icon} className="mx-auto size-7 text-gold-400" />
                  <h3 className="font-display text-[16px] font-bold text-white">{pillar.title}</h3>
                  <p className="text-[11.5px] leading-relaxed text-white/50">
                    {pillar.description}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- Values */}
      <Section tone="cream" spacing="lg">
        <Container>
          <Reveal>
            <p className="text-eyebrow uppercase text-gold-500">Our Values</p>
            <h2 className="sr-only">Our values</h2>
          </Reveal>
          <Stagger className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((value) => (
              <StaggerItem key={value.title} className="h-full">
                <ExpertiseCard
                  icon={value.icon}
                  title={value.title}
                  description={value.description}
                />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* -------------------------------------------------------- Timeline */}
      <Section tone="darker" spacing="lg" className="overflow-hidden">
        <Container>
          <Reveal>
            <p className="text-eyebrow uppercase text-gold-400">Career Timeline</p>
            <h2 className="sr-only">Career timeline</h2>
          </Reveal>
          <Timeline entries={timeline} className="mt-9" />
        </Container>
      </Section>

      {/* ---------------------------------- Achievements / companies / quote */}
      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
            <Reveal className="grid content-start gap-4">
              <p className="text-eyebrow uppercase text-gold-500">Achievements</p>
              <ul className="grid gap-3">
                {achievements.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[12.5px] text-body">
                    <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-gold-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="grid content-start gap-4">
              <p className="text-eyebrow uppercase text-gold-500">Companies I&rsquo;ve Worked With</p>
              <Grid cols={2} gap="md" className="mt-1">
                {companies.map((company) => (
                  <span
                    key={company}
                    className="flex h-14 items-center justify-center rounded-[2px] border border-cream-300 bg-white px-3 text-center font-display text-[15px] font-bold text-heading/70 transition-colors duration-300 hover:text-heading"
                  >
                    {company}
                  </span>
                ))}
              </Grid>
            </Reveal>

            <Reveal delay={0.2} className="grid content-start gap-4">
              <p className="text-eyebrow uppercase text-gold-500">What Others Say</p>
              <figure className="grid gap-4 rounded-[3px] border border-cream-300 bg-white p-6">
                <span aria-hidden="true" className="font-display text-[30px] leading-none text-gold-400">
                  &ldquo;
                </span>
                <blockquote className="text-[13px] leading-relaxed text-body">
                  {pressQuote.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  <Avatar name={pressQuote.name} size="md" />
                  <span className="grid leading-tight">
                    <span className="text-[12.5px] font-semibold text-heading">
                      {pressQuote.name}
                    </span>
                    <span className="text-[11px] text-muted">{pressQuote.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------- Testimonials */}
      <Section tone="darker" spacing="lg">
        <Container>
          <Reveal>
            <p className="text-eyebrow uppercase text-gold-400">Testimonials</p>
            <h2 className="sr-only">Testimonials</h2>
          </Reveal>
          <Stagger className="mt-7 grid gap-5 md:grid-cols-3">
            {aboutTestimonials.map((testimonial) => (
              <StaggerItem key={testimonial.name} className="h-full">
                <TestimonialCard testimonial={testimonial} tone="dark" />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ------------------------------------------------------------- FAQ */}
      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-16">
            <Reveal className="grid content-start gap-3">
              <p className="text-eyebrow uppercase text-gold-500">FAQ</p>
              <h2 className="text-display-sm">Common Questions</h2>
              <p className="text-[13px] leading-relaxed text-body">
                Answers to the questions men ask most.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <FaqList items={aboutFaqs} defaultOpen={0} />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Work with me */}
      <Section tone="darker" spacing="none" className="relative overflow-hidden py-14 md:py-16">
        <ImageFrame
          seed="about-cta"
          ratio="aspect-auto"
          className="absolute inset-0 h-full"
          overlay="strong"
        />
        <Container className="relative z-20">
          <Reveal className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="grid gap-4">
              <p className="text-eyebrow uppercase text-gold-400">Ready to Level Up?</p>
              <h2 className="text-display-md text-white">Let&rsquo;s Work Together</h2>
              <p className="max-w-md text-[12.5px] leading-relaxed text-white/55">
                Whether you need strategic guidance, AI implementation, or content collaboration,
                I&rsquo;m here to help.
              </p>
              <div className="mt-2">
                <Button asChild size="md">
                  <Link to="/booking">
                    Work With Me
                    <ButtonArrow />
                  </Link>
                </Button>
              </div>
            </div>

            <ul className="grid gap-6 sm:grid-cols-2">
              {workTogether.map((item) => (
                <li key={item.title} className="flex items-center gap-3">
                  <Icon name={item.icon} className="size-5 shrink-0 text-gold-400" />
                  <span className="text-[12px] font-semibold text-white">{item.title}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* Rating strip */}
      <Section tone="cream" spacing="sm">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            <StatCard value="500K+" label="Men Impacted" tone="light" align="left" />
            <span className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} aria-hidden="true" className="size-4 fill-gold-400 text-gold-400" />
              ))}
              <span className="ml-1 text-[12px] text-body">Rated 4.9 by our community</span>
            </span>
          </div>
        </Container>
      </Section>
    </>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { Play } from 'lucide-react'
import { seo, pageTitle } from '~/lib/seo'
import {
  eventTypes,
  keynotes,
  speakingHero,
  speakingTopics,
  whyHireMe,
  workshopFormats,
} from '~/data/speaking'
import { speakingFaqs } from '~/data/faqs'
import { Container, Section } from '~/components/layout/primitives'
import { PageHero } from '~/components/layout/page-hero'
import { SectionHeader, Accent } from '~/components/content/section-header'
import { StatPanel } from '~/components/content/cards'
import { FaqList } from '~/components/content/faq'
import { BookingForm } from '~/components/forms/booking-form'
import { NewsletterBand } from '~/components/content/cta-banner'
import { ImageFrame } from '~/components/media/image-frame'
import { Button, ButtonArrow } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Icon } from '~/components/ui/icon'
import { Reveal, Stagger, StaggerItem } from '~/components/motion'

export const Route = createFileRoute('/speaking')({
  head: () => ({
    meta: seo({ title: pageTitle('Speaking'), description: speakingHero.body }),
  }),
  component: SpeakingPage,
})

function SpeakingPage() {
  return (
    <>
      <PageHero
        eyebrow={speakingHero.eyebrow}
        seed="speaking-hero"
        size="lg"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Speaking' }]}
        titleNode={
          <>
            {speakingHero.title}
            <br />
            <Accent>{speakingHero.titleAccent}</Accent>
          </>
        }
        description={speakingHero.body}
        actions={
          <>
            <Button asChild size="md">
              <a href="#book-brian">
                Book Brian to Speak
                <ButtonArrow />
              </a>
            </Button>
            <Button asChild variant="outline" size="md">
              <a href="#speaking-reel">
                Watch Reel
                <Play aria-hidden="true" className="size-3.5 fill-current" />
              </a>
            </Button>
          </>
        }
        aside={<StatPanel stats={speakingHero.stats} className="lg:w-[280px]" />}
      />

      {/* --------------------------------------------------------- Why hire me */}
      <Section tone="cream" spacing="lg">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-14">
            <Reveal className="grid content-start gap-4">
              <p className="text-eyebrow uppercase text-gold-500">Why Hire Me</p>
              <h2 className="text-display-sm">
                More Than a Speaker.
                <br />
                A Partner in Transformation.
              </h2>
              <p className="text-[13px] leading-relaxed text-body">
                I combine real-world business experience, proven frameworks, and powerful
                storytelling to deliver actionable insights that create lasting impact.
              </p>
            </Reveal>

            <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-cream-300">
              {whyHireMe.map((item) => (
                <StaggerItem
                  key={item.title}
                  className="grid content-start gap-3 text-center lg:px-5"
                >
                  <Icon name={item.icon} className="mx-auto size-7 text-gold-500" />
                  <h3 className="text-[12.5px] font-bold text-heading">{item.title}</h3>
                  <p className="text-[11px] leading-relaxed text-body">{item.description}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------- Speaking topics */}
      <Section tone="darker" spacing="lg">
        <Container>
          <SectionHeader
            tone="dark"
            eyebrow="Speaking Topics"
            title={
              <>
                Topics That Move Minds
                <br />
                and Drive Results
              </>
            }
            action={{ label: 'View all topics', to: '/expertise' }}
          />
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {speakingTopics.map((topic) => (
              <StaggerItem key={topic.title} className="h-full">
                <Card
                  variant="outlineDark"
                  interactive
                  padding="md"
                  className="grid h-full content-start gap-3"
                >
                  <Icon name={topic.icon} className="size-6 text-gold-400" />
                  <h3 className="text-[12.5px] font-bold text-white">{topic.title}</h3>
                  <p className="text-[11px] leading-relaxed text-white/50">{topic.description}</p>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* --------------------------------------------------- Signature keynotes */}
      <Section tone="cream" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow="Signature Keynotes"
            title="Signature Keynotes"
            titleClassName="sr-only"
            action={{ label: 'View all keynotes', to: '/booking' }}
          />
          <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {keynotes.map((keynote) => (
              <StaggerItem key={keynote.title} className="h-full">
                <article className="group flex h-full flex-col overflow-hidden rounded-[3px] border border-cream-300 bg-white transition-[transform,box-shadow,border-color] duration-500 ease-premium hover:-translate-y-1 hover:border-gold-300 hover:shadow-elevated">
                  <ImageFrame
                    seed={`keynote-${keynote.title}`}
                    ratio="aspect-[4/3]"
                    zoomOnHover
                  />
                  <div className="grid flex-1 content-start gap-2 p-4">
                    <h3 className="text-[12.5px] font-bold text-heading">{keynote.title}</h3>
                    <p className="text-[11px] leading-relaxed text-body">{keynote.description}</p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ------------------------------------------------------ Workshop formats */}
      <Section tone="darker" spacing="md">
        <Container>
          <Reveal className="grid gap-3">
            <p className="text-eyebrow uppercase text-gold-400">Workshop Formats</p>
            <h2 className="text-display-sm text-white">
              Engaging. Practical. Transformative.
            </h2>
          </Reveal>
          <Stagger className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {workshopFormats.map((format) => (
              <StaggerItem key={format.title} className="grid content-start gap-2.5">
                <Icon name={format.icon} className="size-6 text-gold-400" />
                <h3 className="text-[12.5px] font-bold text-white">{format.title}</h3>
                <p className="text-[11px] leading-relaxed text-white/50">{format.description}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ------------------------------------------------------- Speaking reel */}
      <Section id="speaking-reel" tone="cream" spacing="lg">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-14">
            <Reveal className="grid content-start gap-4">
              <p className="text-eyebrow uppercase text-gold-500">Audience Types</p>
              <h2 className="text-display-sm">See Brian in Action</h2>
              <p className="text-[13px] leading-relaxed text-body">
                Watch highlights from keynotes and workshops that inspire audiences and deliver real
                results.
              </p>
              <div className="mt-2">
                <Button asChild size="md">
                  <a href="#book-brian">
                    Watch Speaking Reel
                    <ButtonArrow />
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal direction="left" className="relative overflow-hidden rounded-[3px]">
              <ImageFrame seed="speaking-reel" ratio="aspect-[16/9]" overlay="soft">
                <button
                  type="button"
                  aria-label="Play speaking reel"
                  className="absolute inset-0 z-20 m-auto inline-flex size-16 items-center justify-center rounded-full bg-gold-400 text-ink-950 transition-transform duration-500 ease-premium hover:scale-105"
                >
                  <Play aria-hidden="true" className="ml-1 size-6 fill-current" />
                </button>
              </ImageFrame>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- FAQ + form */}
      <Section id="book-brian" tone="darker" spacing="lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal className="grid content-start gap-5">
              <p className="text-eyebrow uppercase text-gold-400">FAQ</p>
              <h2 className="text-display-sm text-white">Frequently Asked Questions</h2>
              <FaqList items={speakingFaqs} tone="dark" defaultOpen={0} className="mt-2" />
            </Reveal>

            <Reveal direction="left">
              <Card variant="outlineDark" padding="lg" className="grid gap-5">
                <div className="grid gap-2">
                  <p className="text-eyebrow uppercase text-gold-400">Book Brian to Speak</p>
                  <h2 className="text-display-sm text-white">
                    Let&rsquo;s Make Your Event Unforgettable
                  </h2>
                  <p className="text-[12.5px] leading-relaxed text-white/50">
                    Fill out the form below and my team will get back to you within 24 hours.
                  </p>
                </div>
                <BookingForm eventTypes={eventTypes} />
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      <NewsletterBand
        title="Get Weekly Insights That Inspire"
        description="Join 100,000+ high performers getting strategies, insights, and tools every week."
        tone="panel"
      />
    </>
  )
}

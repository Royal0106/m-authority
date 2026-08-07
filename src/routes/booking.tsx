import { createFileRoute, Link } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import { seo, pageTitle } from '~/lib/seo'
import { bookingSessions, bookingSteps, eventTypes } from '~/data/speaking'
import { bookingFaqs } from '~/data/faqs'
import { expertiseTestimonials } from '~/data/testimonials'
import { site } from '~/data/site'
import { Container, Section } from '~/components/layout/primitives'
import { PageHero } from '~/components/layout/page-hero'
import { SectionHeader, Accent } from '~/components/content/section-header'
import { TestimonialCard } from '~/components/content/cards'
import { ProcessSteps } from '~/components/content/timeline'
import { FaqList } from '~/components/content/faq'
import { BookingForm } from '~/components/forms/booking-form'
import { Button, ButtonArrow } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Badge } from '~/components/ui/badge'
import { Icon } from '~/components/ui/icon'
import { cn } from '~/lib/utils'
import { Reveal, Stagger, StaggerItem } from '~/components/motion'

export const Route = createFileRoute('/booking')({
  head: () => ({
    meta: seo({
      title: pageTitle('Book With Brian'),
      description:
        'Book a complimentary strategy call, an AI implementation sprint, or private coaching with Brian Hanson.',
    }),
  }),
  component: BookingPage,
})

function BookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Book With Brian"
        seed="booking-hero"
        size="lg"
        breadcrumb={[{ label: 'Home', to: '/' }, { label: 'Booking' }]}
        titleNode={
          <>
            One Conversation.
            <br />
            <Accent>A Clearer Path Forward.</Accent>
          </>
        }
        description="Pick the session that fits where you are. Every engagement starts with a real working conversation — not a sales pitch."
        actions={
          <>
            <Button asChild size="md">
              <a href="#booking-form">
                Request a Session
                <ButtonArrow />
              </a>
            </Button>
            <Button asChild variant="outline" size="md">
              <Link to="/expertise">See My Work</Link>
            </Button>
          </>
        }
        footer={
          <ul className="flex flex-wrap items-center gap-x-9 gap-y-4">
            {[
              { title: '24 Hours', description: 'Average reply time' },
              { title: '500+', description: 'Clients served' },
              { title: '50+', description: 'Countries' },
            ].map((item) => (
              <li key={item.title} className="flex items-center gap-2.5">
                <Icon name="badge-check" className="size-4 shrink-0 text-gold-400" />
                <span className="grid leading-tight">
                  <span className="text-[11.5px] font-semibold text-white">{item.title}</span>
                  <span className="text-[10.5px] text-white/45">{item.description}</span>
                </span>
              </li>
            ))}
          </ul>
        }
      />

      {/* ------------------------------------------------------------- Sessions */}
      <Section tone="cream" spacing="lg">
        <Container>
          <SectionHeader
            eyebrow="Ways to Work Together"
            title={
              <>
                Choose Your <Accent italic>Starting Point</Accent>
              </>
            }
            description="Three ways in, each with a clear scope and a clear outcome."
          />

          <Stagger className="mt-8 grid gap-5 lg:grid-cols-3">
            {bookingSessions.map((session) => (
              <StaggerItem key={session.title} className="h-full">
                <Card
                  variant={session.featured ? 'dark' : 'raised'}
                  interactive
                  padding="lg"
                  className={cn(
                    'flex h-full flex-col gap-4',
                    session.featured && 'border-gold-400/40',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <Icon
                      name={session.icon}
                      className={cn('size-7', session.featured ? 'text-gold-400' : 'text-gold-500')}
                    />
                    {session.featured ? <Badge variant="solid">Most Popular</Badge> : null}
                  </div>

                  <div className="grid gap-1.5">
                    <h3
                      className={cn(
                        'font-display text-[20px] font-bold',
                        session.featured ? 'text-white' : 'text-heading',
                      )}
                    >
                      {session.title}
                    </h3>
                    <p
                      className={cn(
                        'text-[11px] uppercase tracking-[0.12em]',
                        session.featured ? 'text-white/40' : 'text-muted',
                      )}
                    >
                      {session.duration} · {session.price}
                    </p>
                  </div>

                  <p
                    className={cn(
                      'text-[12.5px] leading-relaxed',
                      session.featured ? 'text-white/55' : 'text-body',
                    )}
                  >
                    {session.description}
                  </p>

                  <ul className="grid gap-2.5">
                    {session.includes.map((item) => (
                      <li
                        key={item}
                        className={cn(
                          'flex items-start gap-2.5 text-[12px]',
                          session.featured ? 'text-white/70' : 'text-body',
                        )}
                      >
                        <Check aria-hidden="true" className="mt-0.5 size-3.5 shrink-0 text-gold-400" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-2">
                    <Button
                      asChild
                      variant={session.featured ? 'primary' : 'outlineDark'}
                      size="sm"
                      full
                    >
                      <a href="#booking-form">
                        Request This
                        <ButtonArrow />
                      </a>
                    </Button>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* ------------------------------------------------------- How it works */}
      <Section tone="darker" spacing="lg">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-14">
            <Reveal className="grid content-start gap-4">
              <p className="text-eyebrow uppercase text-gold-400">How It Works</p>
              <h2 className="text-display-sm text-white">
                Simple Process.
                <br />
                <Accent italic>No Runaround.</Accent>
              </h2>
              <p className="text-[12.5px] leading-relaxed text-white/50">
                Four steps from first message to a plan you actually own.
              </p>
            </Reveal>
            <ProcessSteps steps={bookingSteps} tone="dark" />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- Form + sidebar */}
      <Section id="booking-form" tone="cream" spacing="lg">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:gap-12">
            <Reveal>
              <Card variant="dark" padding="lg" className="grid gap-5">
                <div className="grid gap-2">
                  <p className="text-eyebrow uppercase text-gold-400">Request a Session</p>
                  <h2 className="text-display-sm text-white">Tell Me About Your Goals</h2>
                  <p className="text-[12.5px] leading-relaxed text-white/50">
                    Share a few details and my team will come back within 24 hours with
                    availability.
                  </p>
                </div>
                <BookingForm eventTypes={eventTypes} submitLabel="Request My Session" />
              </Card>
            </Reveal>

            <Reveal direction="left" className="grid content-start gap-6">
              <Card variant="raised" padding="lg" className="grid gap-4">
                <p className="text-eyebrow uppercase text-gold-500">Prefer Email?</p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-[13px] font-semibold text-heading transition-colors hover:text-gold-600"
                >
                  {site.contact.email}
                </a>
                <a
                  href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`}
                  className="text-[13px] text-body transition-colors hover:text-gold-600"
                >
                  {site.contact.phone}
                </a>
                <p className="text-[11.5px] text-muted">{site.contact.phoneHours}</p>
              </Card>

              <div>
                <p className="text-eyebrow uppercase text-gold-500">Common Questions</p>
                <FaqList items={bookingFaqs} defaultOpen={0} className="mt-4" />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- Testimonials */}
      <Section tone="cream" spacing="none" className="pb-16 md:pb-20">
        <Container>
          <SectionHeader
            align="center"
            eyebrow="What Clients Say"
            title={
              <>
                Conversations That <Accent italic>Changed Things</Accent>
              </>
            }
          />
          <Stagger className="mt-8 grid gap-5 md:grid-cols-3">
            {expertiseTestimonials.map((testimonial) => (
              <StaggerItem key={testimonial.name} className="h-full">
                <TestimonialCard testimonial={testimonial} />
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>
    </>
  )
}

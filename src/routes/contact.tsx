import { createFileRoute, Link } from '@tanstack/react-router'
import { Clock, Mail, MapPin, MessageCircleQuestion, Phone } from 'lucide-react'
import { seo, pageTitle } from '~/lib/seo'
import { contactAssurances, contactChannels, site } from '~/data/site'
import { contactFaqs } from '~/data/faqs'
import { Container, Section } from '~/components/layout/primitives'
import { PageHero } from '~/components/layout/page-hero'
import { SectionHeader, Accent } from '~/components/content/section-header'
import { FaqList } from '~/components/content/faq'
import { ContactForm } from '~/components/forms/contact-form'
import { NewsletterBand } from '~/components/content/cta-banner'
import { SocialCards } from '~/components/layout/social-icons'
import { ImageFrame } from '~/components/media/image-frame'
import { Button, ButtonArrow } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { Icon } from '~/components/ui/icon'
import { Reveal, Stagger, StaggerItem } from '~/components/motion'

export const Route = createFileRoute('/contact')({
  head: () => ({
    meta: seo({
      title: pageTitle('Contact'),
      description:
        'Have a question, want to work together, or just want to say hello? Get in touch with the Man Authority team.',
    }),
  }),
  component: ContactPage,
})

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        seed="contact-hero"
        size="lg"
        titleNode={
          <>
            Let&rsquo;s Connect.
            <br />
            <Accent>Let&rsquo;s Make an Impact.</Accent>
          </>
        }
        description="Have a question, want to work together, or just want to say hello? I'd love to hear from you."
        actions={
          <Button asChild size="md">
            <a href="#contact-form">
              Send a Message
              <ButtonArrow />
            </a>
          </Button>
        }
        footer={
          <ul className="flex flex-wrap items-center gap-x-9 gap-y-4">
            {contactAssurances.map((item) => (
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
        aside={
          <figure className="max-w-[260px] border-l-2 border-gold-400 pl-5">
            <span aria-hidden="true" className="font-display text-[26px] leading-none text-gold-400">
              &ldquo;
            </span>
            <blockquote className="mt-2 font-display text-[21px] font-semibold leading-snug text-white">
              Great things happen when we connect with purpose.
            </blockquote>
            <figcaption className="mt-4 font-script text-[20px] text-white/70">
              {site.founder}
            </figcaption>
          </figure>
        }
      />

      {/* ------------------------------------------------------------ Channels */}
      <Section tone="cream" spacing="lg">
        <Container>
          <SectionHeader eyebrow="Get in Touch" title="How Can We Help You?" />
          <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {contactChannels.map((channel) => (
              <StaggerItem key={channel.title} className="h-full">
                <Card
                  variant="raised"
                  interactive
                  padding="md"
                  className="flex h-full flex-col items-center gap-3 text-center"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-ink-900 text-gold-400">
                    <Icon name={channel.icon} className="size-5" />
                  </span>
                  <h3 className="text-[13px] font-bold text-heading">{channel.title}</h3>
                  <p className="text-[11.5px] leading-relaxed text-body">{channel.description}</p>
                  <a
                    href={`mailto:${channel.email}`}
                    className="mt-auto pt-2 text-[11.5px] font-medium text-gold-600 transition-colors duration-300 hover:text-gold-500"
                  >
                    {channel.email}
                  </a>
                </Card>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </Section>

      {/* -------------------------------------------------- Form + office info */}
      <Section id="contact-form" tone="cream" spacing="none" className="pb-16 md:pb-20">
        <Container>
          <div className="grid overflow-hidden rounded-[3px] lg:grid-cols-[minmax(0,1fr)_minmax(0,290px)_minmax(0,290px)]">
            <Reveal className="bg-ink-900 p-7 md:p-9">
              <p className="text-eyebrow uppercase text-gold-400">Send Us a Message</p>
              <h2 className="mt-3 text-display-sm text-white">We&rsquo;d Love to Hear From You</h2>
              <ContactForm className="mt-7" />
            </Reveal>

            <Reveal
              delay={0.1}
              className="grid content-start gap-7 border-t border-cream-300 bg-white p-7 lg:border-l lg:border-t-0"
            >
              <p className="text-eyebrow uppercase text-gold-500">Office Information</p>

              <div className="flex items-start gap-3.5">
                <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-500" />
                <div className="grid gap-1">
                  <p className="text-[12.5px] font-bold text-heading">Headquarters</p>
                  <p className="text-[11.5px] leading-relaxed text-body">
                    {site.contact.city}
                    <br />
                    {site.contact.street}
                    <br />
                    {site.contact.region}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Phone aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-500" />
                <div className="grid gap-1">
                  <p className="text-[12.5px] font-bold text-heading">Call Us</p>
                  <a
                    href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`}
                    className="text-[11.5px] text-body transition-colors hover:text-gold-600"
                  >
                    {site.contact.phone}
                  </a>
                  <p className="text-[11.5px] text-muted">{site.contact.phoneHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Mail aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-500" />
                <div className="grid gap-1">
                  <p className="text-[12.5px] font-bold text-heading">Email Us</p>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-[11.5px] text-body transition-colors hover:text-gold-600"
                  >
                    {site.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-gold-500" />
                <div className="grid gap-1">
                  <p className="text-[12.5px] font-bold text-heading">Business Hours</p>
                  {site.contact.hours.map((entry) => (
                    <p key={entry.days} className="text-[11.5px] text-body">
                      {entry.days}: {entry.time}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="min-h-[240px]">
              <ImageFrame
                seed="contact-office"
                ratio="aspect-auto"
                className="h-full min-h-[240px]"
                overlay="soft"
              >
                <span className="absolute inset-0 z-20 grid place-content-center text-center">
                  <span className="font-display text-[15px] font-bold tracking-[0.02em] text-white">
                    MAN AUTHORITY
                  </span>
                  <span className="mt-1 text-[8px] uppercase tracking-[0.24em] text-white/50">
                    {site.tagline}
                  </span>
                </span>
              </ImageFrame>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------------------- FAQ */}
      <Section tone="cream" spacing="none" className="pb-16 md:pb-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-12">
            <div>
              <Reveal className="grid gap-3">
                <p className="text-eyebrow uppercase text-gold-500">FAQ</p>
                <h2 className="text-display-sm">Frequently Asked Questions</h2>
              </Reveal>
              <Reveal delay={0.1} className="mt-6">
                <FaqList items={contactFaqs} defaultOpen={0} />
              </Reveal>
            </div>

            <Reveal direction="left">
              <Card variant="dark" padding="lg" className="grid h-full content-center gap-4">
                <span className="inline-flex size-14 items-center justify-center rounded-full border border-gold-400/30 text-gold-400">
                  <MessageCircleQuestion aria-hidden="true" className="size-6" />
                </span>
                <h3 className="font-display text-[21px] font-bold text-white">
                  Still have questions?
                </h3>
                <p className="text-[12.5px] leading-relaxed text-white/50">
                  If you can&rsquo;t find the answer you&rsquo;re looking for, feel free to reach
                  out. We&rsquo;re happy to help!
                </p>
                <div className="mt-2">
                  <Button asChild size="md">
                    <a href="#contact-form">
                      Get in Touch
                      <ButtonArrow />
                    </a>
                  </Button>
                </div>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------------- Social */}
      <Section tone="darker" spacing="md">
        <Container>
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-12">
            <Reveal className="grid gap-3">
              <h2 className="text-display-sm text-white">
                Let&rsquo;s Stay <Accent italic>Connected</Accent>
              </h2>
              <p className="text-[12.5px] leading-relaxed text-white/50">
                Follow for daily insights, strategies, and motivation to help you become your best
                self.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <SocialCards />
            </Reveal>
          </div>
        </Container>
      </Section>

      <NewsletterBand
        title="Get Weekly Insights That Drive Results"
        description="Join 100,000+ high performers getting actionable strategies and insights every week."
        tone="panel"
      />

      <Section tone="cream" spacing="sm">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="text-[12.5px] text-body">Looking to book a session instead?</p>
            <Button asChild variant="outlineDark" size="sm">
              <Link to="/booking">
                Book with Brian
                <ButtonArrow />
              </Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  )
}

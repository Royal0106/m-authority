import * as React from 'react'
import { MessageSquare } from 'lucide-react'
import { cn } from '~/lib/utils'
import { ImageFrame } from '~/components/media/image-frame'
import { Container, Section } from '~/components/layout/primitives'
import { Reveal } from '~/components/motion'
import { NewsletterForm } from '~/components/forms/newsletter-form'
import { Accent } from '~/components/content/section-header'

/* -------------------------------------------------------------------------- */
/*  CTA banner                                                                  */
/* -------------------------------------------------------------------------- */

export function CtaBanner({
  eyebrow,
  title,
  description,
  action,
  seed = 'cta-banner',
  className,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  action: React.ReactNode
  seed?: string
  className?: string
}) {
  return (
    <Reveal
      className={cn('relative overflow-hidden rounded-[3px] bg-ink-900', className)}
    >
      <ImageFrame
        seed={seed}
        ratio="aspect-auto"
        className="absolute inset-0 h-full"
        overlay="strong"
      />
      <div className="relative z-20 flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div className="flex items-center gap-5">
          <span className="hidden size-16 shrink-0 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-gold-400 sm:inline-flex">
            <MessageSquare aria-hidden="true" className="size-6" />
          </span>
          <div className="grid gap-2">
            {eyebrow ? <p className="text-eyebrow uppercase text-gold-400">{eyebrow}</p> : null}
            <h2 className="text-display-sm text-white">{title}</h2>
            {description ? (
              <p className="max-w-lg text-[12.5px] leading-relaxed text-white/55">
                {description}
              </p>
            ) : null}
          </div>
        </div>
        <div className="shrink-0">{action}</div>
      </div>
    </Reveal>
  )
}

/* -------------------------------------------------------------------------- */
/*  Newsletter band                                                             */
/* -------------------------------------------------------------------------- */

export function NewsletterBand({
  title = 'Get Weekly Insights That Drive Results',
  description = 'Join 100,000+ men getting actionable strategies, insights, and tools every week.',
  tone = 'darker',
  className,
}: {
  title?: React.ReactNode
  description?: string
  tone?: 'dark' | 'darker' | 'panel'
  className?: string
}) {
  return (
    <Section tone={tone} spacing="none" className={cn('py-12 md:py-14', className)}>
      <Container>
        <Reveal className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="hidden size-14 shrink-0 items-center justify-center rounded-[3px] border border-gold-400/30 text-gold-400 sm:inline-flex"
            >
              <svg viewBox="0 0 24 18" className="size-6" fill="none">
                <rect x="1" y="1" width="22" height="16" stroke="currentColor" strokeWidth="1.4" />
                <path d="m1 2 11 8 11-8" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </span>
            <div className="grid gap-2">
              <h2 className="text-display-sm text-white">{title}</h2>
              <p className="max-w-lg text-[12.5px] leading-relaxed text-white/50">
                {description}
              </p>
            </div>
          </div>
          <NewsletterForm
            variant="label"
            submitLabel="Subscribe"
            tone="dark"
            size="lg"
            assurances={['No spam', 'Unsubscribe anytime', '100% value, no fluff']}
          />
        </Reveal>
      </Container>
    </Section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Community band (Home)                                                       */
/* -------------------------------------------------------------------------- */

export function CommunityBand() {
  return (
    <Section tone="darker" spacing="none" className="relative overflow-hidden py-14 md:py-16">
      <ImageFrame
        seed="community-band"
        ratio="aspect-auto"
        className="absolute inset-0 h-full"
        overlay="strong"
      />
      <Container className="relative z-20">
        <Reveal className="grid items-center gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
          <div className="grid gap-3">
            <p className="text-eyebrow uppercase text-gold-400">Join the Community</p>
            <h2 className="text-display-sm text-white">
              Become Your <Accent>Best Self</Accent>
            </h2>
            <p className="text-[12.5px] leading-relaxed text-white/55">
              Join 100,000+ men who get weekly tips on fitness, style, success and more — straight
              to their inbox.
            </p>
          </div>
          <NewsletterForm
            variant="label"
            submitLabel="Get Free Tips"
            tone="dark"
            size="lg"
            placeholder="Enter your email address"
            assurances={['No spam', 'Unsubscribe anytime', 'Deals & free resources']}
            className="lg:max-w-xl lg:justify-self-end"
          />
        </Reveal>
      </Container>
    </Section>
  )
}

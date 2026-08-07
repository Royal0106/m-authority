import { Link } from '@tanstack/react-router'
import { Clock } from 'lucide-react'
import { formatDate } from '~/lib/utils'
import { site } from '~/data/site'
import type { LegalSection } from '~/data/legal'
import { Container, Section } from '~/components/layout/primitives'
import { PageHero } from '~/components/layout/page-hero'
import { LegalSections } from '~/components/content/legal-sections'
import { CtaBanner } from '~/components/content/cta-banner'
import { Button, ButtonArrow } from '~/components/ui/button'

/** Shared shell for Terms of Service and Privacy Policy. */
export function LegalPage({
  title,
  intro,
  sections,
  seed,
  ctaTitle,
}: {
  title: string
  intro: string
  sections: Array<LegalSection>
  seed: string
  ctaTitle: string
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        seed={seed}
        size="md"
        titleNode={title}
        description={intro}
        footer={
          <p className="flex items-center gap-2.5 text-[12px] text-white/55">
            <Clock aria-hidden="true" className="size-4 text-gold-400" />
            Last Updated: {formatDate(site.legalUpdated)}
          </p>
        }
      />

      <Section tone="cream" spacing="lg">
        <Container>
          <LegalSections sections={sections} />

          <CtaBanner
            className="mt-12"
            seed={`${seed}-cta`}
            title={ctaTitle}
            description="We're here to help. Reach out anytime."
            action={
              <Button asChild size="md">
                <Link to="/contact">
                  Contact Us
                  <ButtonArrow />
                </Link>
              </Button>
            }
          />
        </Container>
      </Section>
    </>
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { seo, pageTitle } from '~/lib/seo'
import { termsSections } from '~/data/legal'
import { LegalPage } from '~/components/layout/legal-page'

const INTRO =
  'Please read these Terms of Service ("Terms") carefully before using the Man Authority website and services.'

export const Route = createFileRoute('/terms')({
  head: () => ({
    meta: seo({ title: pageTitle('Terms of Service'), description: INTRO }),
  }),
  component: TermsPage,
})

function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={INTRO}
      sections={termsSections}
      seed="terms-hero"
      ctaTitle="Questions About These Terms?"
    />
  )
}

import { createFileRoute } from '@tanstack/react-router'
import { seo, pageTitle } from '~/lib/seo'
import { privacySections } from '~/data/legal'
import { LegalPage } from '~/components/layout/legal-page'

const INTRO =
  'This Privacy Policy explains what we collect, why we collect it, and the control you have over your information.'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: seo({ title: pageTitle('Privacy Policy'), description: INTRO }),
  }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={INTRO}
      sections={privacySections}
      seed="privacy-hero"
      ctaTitle="Questions About Your Privacy?"
    />
  )
}

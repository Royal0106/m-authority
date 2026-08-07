import { Globe, Mail, MapPin } from 'lucide-react'
import { padIndex } from '~/lib/utils'
import { site } from '~/data/site'
import type { LegalSection } from '~/data/legal'
import { IconTile } from '~/components/ui/icon'
import { Reveal } from '~/components/motion'

/** Contact block rendered by the final section of a legal document. */
function LegalContact() {
  return (
    <ul className="grid gap-3">
      <li className="flex items-center gap-3 text-[12.5px]">
        <Mail aria-hidden="true" className="size-4 shrink-0 text-gold-500" />
        <span className="font-semibold text-heading">Email:</span>
        <a
          href={`mailto:${site.contact.email}`}
          className="text-body transition-colors hover:text-gold-600"
        >
          {site.contact.email}
        </a>
      </li>
      <li className="flex items-center gap-3 text-[12.5px]">
        <MapPin aria-hidden="true" className="size-4 shrink-0 text-gold-500" />
        <span className="font-semibold text-heading">Address:</span>
        <span className="text-body">{site.contact.addressLine}</span>
      </li>
      <li className="flex items-center gap-3 text-[12.5px]">
        <Globe aria-hidden="true" className="size-4 shrink-0 text-gold-500" />
        <span className="font-semibold text-heading">Website:</span>
        <a
          href={site.url}
          target="_blank"
          rel="noreferrer noopener"
          className="text-body transition-colors hover:text-gold-600"
        >
          {site.domain}
        </a>
      </li>
    </ul>
  )
}

/**
 * Numbered legal document body.
 *
 * Each clause is an `<article>` with its own heading so the document has a real
 * outline for screen readers and in-page search.
 */
export function LegalSections({ sections }: { sections: Array<LegalSection> }) {
  return (
    <div className="grid">
      {sections.map((section, index) => (
        <Reveal
          as="article"
          key={section.title}
          delay={Math.min(index, 4) * 0.04}
          className="grid gap-5 border-b border-cream-300 py-8 last:border-b-0 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-10"
        >
          <div className="flex items-center gap-5">
            <IconTile name={section.icon} size="lg" tone="light" />
            <h2 className="flex items-baseline gap-2 text-[13px] font-bold uppercase tracking-[0.1em] text-heading">
              <span className="font-display text-gold-500">{padIndex(index + 1)}.</span>
              <span className="font-sans">{section.title}</span>
            </h2>
          </div>

          <div className="grid gap-3.5">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[12.5px] leading-[1.9] text-body">
                {paragraph}
              </p>
            ))}

            {section.bullets?.length ? (
              <ul className="grid gap-2 pl-1">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2.5 text-[12.5px] text-body">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1 shrink-0 rounded-full bg-gold-400"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}

            {section.contact ? <LegalContact /> : null}
          </div>
        </Reveal>
      ))}
    </div>
  )
}

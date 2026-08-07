import { AppLink } from '~/components/ui/app-link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { PrimaryNavItem } from '~/data/navigation'
import { Container } from '~/components/layout/primitives'
import { ImageFrame } from '~/components/media/image-frame'
import { EASE_PREMIUM } from '~/components/motion'

/**
 * Full-width dropdown panel for primary nav items that declare a `mega` block.
 * Visibility is owned by `Navbar`; this component is purely presentational so
 * it can be reused by any future nav surface.
 */
export function MegaMenu({
  item,
  onNavigate,
}: {
  item: PrimaryNavItem
  onNavigate: () => void
}) {
  if (!item.mega) return null
  const { intro, groups } = item.mega

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: EASE_PREMIUM }}
      className="absolute inset-x-0 top-full border-t border-white/8 bg-ink-950/98 shadow-elevated backdrop-blur-xl"
    >
      <Container className="grid gap-10 py-9 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-16">
        {/* Editorial intro */}
        <div className="relative overflow-hidden rounded-[3px] border border-white/8">
          <ImageFrame seed={`mega-${item.label}`} ratio="aspect-[16/11]" overlay="strong">
            <div className="absolute inset-0 z-20 flex flex-col justify-end gap-2 p-6">
              <p className="text-eyebrow text-gold-400 uppercase">{intro.eyebrow}</p>
              <p className="font-display text-[19px] font-bold leading-tight text-white">
                {intro.title}
              </p>
              <p className="text-[12px] leading-relaxed text-white/60">{intro.body}</p>
              <AppLink
                to={intro.cta.to}
                search={intro.cta.search}
                onClick={onNavigate}
                className="mt-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-400 transition-colors hover:text-gold-300"
              >
                {intro.cta.label}
                <ArrowRight aria-hidden="true" className="size-3.5" />
              </AppLink>
            </div>
          </ImageFrame>
        </div>

        {/* Link groups */}
        <div className="grid gap-8 sm:grid-cols-2">
          {groups.map((group) => (
            <div key={group.title} className="grid gap-4 content-start">
              <p className="text-eyebrow text-gold-500 uppercase">{group.title}</p>
              <ul className="grid gap-1">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <AppLink
                      to={link.to}
                      search={link.search}
                      onClick={onNavigate}
                      className="group/link block rounded-[2px] px-3 py-2.5 -mx-3 transition-colors duration-300 hover:bg-white/[0.04]"
                    >
                      <span className="flex items-center gap-2 text-[13px] font-medium text-white transition-colors group-hover/link:text-gold-300">
                        {link.label}
                        <ArrowRight
                          aria-hidden="true"
                          className="size-3 -translate-x-1 opacity-0 transition-all duration-300 group-hover/link:translate-x-0 group-hover/link:opacity-100"
                        />
                      </span>
                      {link.description ? (
                        <span className="mt-0.5 block text-[11.5px] text-white/40">
                          {link.description}
                        </span>
                      ) : null}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </motion.div>
  )
}

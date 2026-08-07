import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '~/lib/utils'
import { site, type SocialIcon } from '~/data/site'

const ICONS: Record<SocialIcon, LucideIcon> = {
  facebook: Facebook,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
}

export function SocialIcons({
  tone = 'dark',
  size = 'md',
  className,
}: {
  tone?: 'dark' | 'light'
  size?: 'sm' | 'md'
  className?: string
}) {
  return (
    <ul className={cn('flex items-center gap-4', className)}>
      {site.socials.map((social) => {
        const Icon = ICONS[social.icon]
        return (
          <li key={social.name}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={`${site.name} on ${social.name}`}
              className={cn(
                'inline-flex transition-colors duration-300',
                tone === 'dark'
                  ? 'text-white/60 hover:text-gold-400'
                  : 'text-body hover:text-gold-600',
              )}
            >
              <Icon aria-hidden="true" className={size === 'sm' ? 'size-3.5' : 'size-4'} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

/** Boxed social cards used in the Contact page "Let's Stay Connected" band. */
export function SocialCards({ className }: { className?: string }) {
  return (
    <ul className={cn('grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5', className)}>
      {site.socials.map((social) => {
        const Icon = ICONS[social.icon]
        return (
          <li key={social.name}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex h-full flex-col items-center justify-center gap-2.5 rounded-[3px] border border-white/8 bg-ink-800 px-4 py-6 text-center transition-[border-color,transform] duration-500 ease-premium hover:-translate-y-1 hover:border-gold-400/50"
            >
              <Icon
                aria-hidden="true"
                className="size-5 text-white transition-colors duration-300 group-hover:text-gold-400"
              />
              <span className="text-[12.5px] font-semibold text-white">{social.name}</span>
              <span className="text-[11px] text-white/40">{social.handle}</span>
            </a>
          </li>
        )
      })}
    </ul>
  )
}

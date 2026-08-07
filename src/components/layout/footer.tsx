import { AppLink } from '~/components/ui/app-link'
import { site } from '~/data/site'
import { footerNav, legalNav } from '~/data/navigation'
import { Container } from '~/components/layout/primitives'
import { Logo } from '~/components/brand/logo'
import { SocialIcons } from '~/components/layout/social-icons'
import { NewsletterForm } from '~/components/forms/newsletter-form'

export function Footer() {
  return (
    <footer className="bg-ink-950 text-white/60">
      <Container className="grid gap-12 py-14 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)] lg:gap-16 lg:py-16">
        {/* Brand */}
        <div className="grid content-start gap-6">
          <Logo />
          <p className="max-w-[280px] text-[12.5px] leading-relaxed text-white/45">
            {site.description}
          </p>
          <SocialIcons tone="dark" />
        </div>

        {/* Link columns + newsletter */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title} className="grid content-start gap-4">
              <p className="text-eyebrow text-gold-500 uppercase">{group.title}</p>
              <ul className="grid gap-2.5">
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <AppLink
                      to={link.to}
                      search={link.search}
                      className="text-[12.5px] text-white/55 transition-colors duration-300 hover:text-gold-400"
                    >
                      {link.label}
                    </AppLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="grid content-start gap-4">
            <p className="text-eyebrow text-gold-500 uppercase">Join the Movement</p>
            <p className="text-[12.5px] leading-relaxed text-white/55">
              Get the best tips and updates straight to your inbox.
            </p>
            <NewsletterForm
              variant="arrow"
              tone="dark"
              assurances={['No spam', 'Unsubscribe anytime']}
            />
          </div>
        </div>
      </Container>

      <div className="border-t border-white/8">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-[11.5px] text-white/40">{site.copyright}</p>
          <ul className="flex items-center gap-6">
            {legalNav.map((link) => (
              <li key={link.label}>
                <AppLink
                  to={link.to}
                  className="text-[11.5px] text-white/40 transition-colors duration-300 hover:text-gold-400"
                >
                  {link.label}
                </AppLink>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </footer>
  )
}

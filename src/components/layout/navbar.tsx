import * as React from 'react'
import { Link } from '@tanstack/react-router'
import { AnimatePresence, motion } from 'framer-motion'
import { Flame, Search, ShoppingBag, X } from 'lucide-react'
import { cn } from '~/lib/utils'
import { AppLink } from '~/components/ui/app-link'
import { primaryNav, utilityNav } from '~/data/navigation'
import { site } from '~/data/site'
import { Logo } from '~/components/brand/logo'
import { Container } from '~/components/layout/primitives'
import { MegaMenu } from '~/components/layout/mega-menu'
import { MobileNav } from '~/components/layout/mobile-nav'
import { SocialIcons } from '~/components/layout/social-icons'
import { SearchBar } from '~/components/utility/search-bar'
import { Button, ButtonArrow } from '~/components/ui/button'
import { EASE_PREMIUM } from '~/components/motion'

/* -------------------------------------------------------------------------- */
/*  Announcement / utility bar                                                  */
/* -------------------------------------------------------------------------- */

function TopBar() {
  return (
    <div className="hidden border-b border-white/6 bg-ink-950 lg:block">
      <Container className="flex h-9 items-center justify-between gap-6">
        <AppLink
          to={site.announcement.href}
          className="group flex min-w-0 items-center gap-2 text-[11.5px] text-white/70 transition-colors hover:text-white"
        >
          <Flame aria-hidden="true" className="size-3.5 shrink-0 text-gold-400" />
          <span className="truncate">
            <span className="font-semibold text-gold-400">{site.announcement.label}:</span>{' '}
            {site.announcement.text}
          </span>
        </AppLink>

        <div className="flex shrink-0 items-center gap-6">
          <nav aria-label="Secondary">
            <ul className="flex items-center gap-5">
              {utilityNav.map((link) => (
                <li key={link.label}>
                  <AppLink
                    to={link.to}
                    className="text-[11.5px] text-white/55 transition-colors duration-300 hover:text-gold-400 data-[status=active]:text-gold-400"
                  >
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>
          <span aria-hidden="true" className="h-3 w-px bg-white/12" />
          <SocialIcons tone="dark" size="sm" className="gap-3.5" />
        </div>
      </Container>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Search overlay                                                              */
/* -------------------------------------------------------------------------- */

function SearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  React.useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: EASE_PREMIUM }}
          className="overflow-hidden border-t border-white/8 bg-ink-950"
        >
          <Container className="flex items-center gap-4 py-5">
            <SearchBar
              tone="dark"
              size="lg"
              placeholder="Search articles, guides and resources..."
              onSubmit={onClose}
              className="flex-1"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="inline-flex size-10 shrink-0 items-center justify-center rounded-[2px] text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X aria-hidden="true" className="size-5" />
            </button>
          </Container>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                      */
/* -------------------------------------------------------------------------- */

export function Navbar() {
  const [openMega, setOpenMega] = React.useState<string | null>(null)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const scheduleClose = React.useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    // Small grace period so the pointer can travel from trigger to panel.
    closeTimer.current = setTimeout(() => setOpenMega(null), 140)
  }, [])

  const cancelClose = React.useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }, [])

  React.useEffect(() => () => cancelClose(), [cancelClose])

  // Escape closes an open mega menu for keyboard users.
  React.useEffect(() => {
    if (!openMega) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMega(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openMega])

  const activeItem = primaryNav.find((item) => item.label === openMega)

  return (
    <header className="sticky top-0 z-60 w-full">
      <TopBar />

      <div
        className="relative bg-ink-900/95 backdrop-blur-md"
        onMouseLeave={scheduleClose}
      >
        <Container className="flex h-16 items-center justify-between gap-6 lg:h-[68px]">
          <Logo />

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-7">
              {primaryNav.map((item) => (
                <li
                  key={item.label}
                  onMouseEnter={() => {
                    cancelClose()
                    setOpenMega(item.mega ? item.label : null)
                  }}
                >
                  <AppLink
                    to={item.to}
                    search={item.search}
                    activeOptions={{ exact: item.to === '/', includeSearch: Boolean(item.search) }}
                    aria-expanded={item.mega ? openMega === item.label : undefined}
                    aria-haspopup={item.mega ? 'true' : undefined}
                    onFocus={() => setOpenMega(item.mega ? item.label : null)}
                    className={cn(
                      'relative py-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/80',
                      'transition-colors duration-300 hover:text-gold-400',
                      'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold-400',
                      'after:transition-transform after:duration-300 after:ease-premium hover:after:scale-x-100',
                      'data-[status=active]:text-gold-400 data-[status=active]:after:scale-x-100',
                    )}
                  >
                    {item.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setSearchOpen((value) => !value)}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              aria-expanded={searchOpen}
              className="inline-flex size-10 items-center justify-center rounded-[2px] text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-gold-400"
            >
              <Search aria-hidden="true" className="size-[17px]" />
            </button>

            <Link
              to="/newsletter"
              aria-label="Saved resources (0 items)"
              className="relative hidden size-10 items-center justify-center rounded-[2px] text-white/80 transition-colors duration-300 hover:bg-white/10 hover:text-gold-400 sm:inline-flex"
            >
              <ShoppingBag aria-hidden="true" className="size-[17px]" />
              <span
                aria-hidden="true"
                className="absolute right-1.5 top-1.5 inline-flex size-3.5 items-center justify-center rounded-full bg-gold-400 text-[8px] font-bold text-ink-950"
              >
                0
              </span>
            </Link>

            <Button asChild size="sm" className="hidden md:inline-flex lg:h-10 lg:px-5">
              <Link to="/booking">
                Book With Brian
                <ButtonArrow />
              </Link>
            </Button>

            <MobileNav />
          </div>
        </Container>

        <AnimatePresence>
          {activeItem?.mega ? (
            <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
              <MegaMenu item={activeItem} onNavigate={() => setOpenMega(null)} />
            </div>
          ) : null}
        </AnimatePresence>

        <SearchPanel open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </header>
  )
}

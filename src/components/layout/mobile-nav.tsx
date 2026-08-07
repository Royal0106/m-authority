import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Menu, X } from 'lucide-react'
import { cn } from '~/lib/utils'
import { AppLink } from '~/components/ui/app-link'
import { primaryNav, utilityNav, legalNav } from '~/data/navigation'
import { site } from '~/data/site'
import { Logo } from '~/components/brand/logo'
import { Button, ButtonArrow } from '~/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'
import { SocialIcons } from '~/components/layout/social-icons'
import { SearchBar } from '~/components/utility/search-bar'

/**
 * Off-canvas navigation for tablet and mobile.
 *
 * Radix Dialog handles the focus trap, `aria-modal`, scroll lock and Escape
 * key, so keyboard and screen reader behaviour is correct by construction.
 */
export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const close = React.useCallback(() => setOpen(false), [])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex size-10 items-center justify-center rounded-[2px] text-white transition-colors hover:bg-white/10 xl:hidden"
        >
          <Menu aria-hidden="true" className="size-5" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          className={cn(
            'fixed inset-0 z-70 bg-ink-950/70 backdrop-blur-sm',
            'data-[state=open]:animate-[ma-fade-in_250ms_ease] data-[state=closed]:animate-[ma-fade-out_200ms_ease]',
          )}
        />
        <Dialog.Content
          aria-describedby={undefined}
          className={cn(
            'fixed inset-y-0 right-0 z-80 flex w-[min(410px,92vw)] flex-col bg-ink-900 shadow-elevated',
            'data-[state=open]:animate-[ma-slide-in_320ms_cubic-bezier(0.22,1,0.36,1)]',
            'data-[state=closed]:animate-[ma-slide-out_240ms_ease]',
          )}
        >
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>

          <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
            <Logo />
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="inline-flex size-10 items-center justify-center rounded-[2px] text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6">
            <SearchBar tone="dark" onSubmit={close} className="mb-6" />

            <nav aria-label="Primary">
              <Accordion type="single" collapsible className="grid">
                {primaryNav.map((item) =>
                  item.mega ? (
                    <AccordionItem key={item.label} value={item.label} tone="dark">
                      <AccordionTrigger
                        tone="dark"
                        className="text-[15px] font-semibold uppercase tracking-[0.08em]"
                      >
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent tone="dark" className="pr-0">
                        <ul className="grid gap-0.5 border-l border-white/10 pl-4">
                          {item.mega.groups.flatMap((group) => group.links).map((link) => (
                            <li key={`${item.label}-${link.label}`}>
                              <AppLink
                                to={link.to}
                                search={link.search}
                                onClick={close}
                                className="flex items-center justify-between py-2 text-[13px] text-white/65 transition-colors hover:text-gold-300"
                              >
                                {link.label}
                                <ArrowRight aria-hidden="true" className="size-3.5 opacity-40" />
                              </AppLink>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ) : (
                    <AppLink
                      key={item.label}
                      to={item.to}
                      search={item.search}
                      onClick={close}
                      activeOptions={{ exact: item.to === '/' }}
                      className="flex items-center justify-between border-b border-white/10 py-4 text-[15px] font-semibold uppercase tracking-[0.08em] text-white/85 transition-colors hover:text-gold-300 data-[status=active]:text-gold-400"
                    >
                      {item.label}
                      <ArrowRight aria-hidden="true" className="size-4 opacity-40" />
                    </AppLink>
                  ),
                )}
              </Accordion>
            </nav>

            <nav aria-label="Secondary" className="mt-7 grid gap-2.5">
              {[...utilityNav, ...legalNav].map((link) => (
                <AppLink
                  key={link.label}
                  to={link.to}
                  onClick={close}
                  className="text-[12.5px] text-white/50 transition-colors hover:text-gold-300"
                >
                  {link.label}
                </AppLink>
              ))}
            </nav>
          </div>

          <div className="grid gap-4 border-t border-white/8 px-5 py-5">
            <Button asChild size="md" full>
              <Link to="/newsletter" onClick={close}>
                Join Community
                <ButtonArrow />
              </Link>
            </Button>
            <div className="flex items-center justify-between">
              <SocialIcons tone="dark" />
              <a
                href={`mailto:${site.contact.email}`}
                className="text-[11.5px] text-white/45 transition-colors hover:text-gold-300"
              >
                {site.contact.email}
              </a>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/// <reference types="vite/client" />
import * as React from 'react'
import {
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from '@tanstack/react-router'
import appCss from '~/styles/app.css?url'
import { site } from '~/data/site'
import { Navbar } from '~/components/layout/navbar'
import { Footer } from '~/components/layout/footer'
import { PageTransition } from '~/components/motion'
import { NotFound } from '~/components/utility/states'
import { seo } from '~/lib/seo'

const FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 44 48'%3E%3Cpath d='M22 1.6 41.5 8.4v18.9c0 9.4-7.7 15.4-19.5 19.1C10.2 42.7 2.5 36.7 2.5 27.3V8.4L22 1.6Z' fill='%23050505' stroke='%23d4a55c' stroke-width='2.5'/%3E%3Cpath d='M13.5 31V17.6h2.9L22 26.2l5.6-8.6h2.9V31h-3v-8.4l-4.3 6.5h-2.4l-4.3-6.5V31h-3Z' fill='%23d4a55c'/%3E%3C/svg%3E"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#050505' },
      ...seo({
        title: `${site.name} — ${site.tagline}`,
        description: site.description,
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: FAVICON, type: 'image/svg+xml' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@300..700&family=Dancing+Script:wght@400..700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: () => <NotFound />,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen bg-cream-200 antialiased">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main id="main" className="flex-1">
            <PageShell>{children}</PageShell>
          </main>
          <Footer />
        </div>
        <Scripts />
      </body>
    </html>
  )
}

/** Re-keys the page content on navigation so each route fades/lifts in. */
function PageShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname })
  return <PageTransition routeKey={pathname}>{children}</PageTransition>
}

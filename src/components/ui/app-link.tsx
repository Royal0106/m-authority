import * as React from 'react'
import { Link, type LinkComponentProps } from '@tanstack/react-router'

export type AppLinkProps = Omit<
  LinkComponentProps<'a'>,
  'to' | 'search' | 'params' | 'children'
> & {
  /** Route path. External `http(s)` / `mailto:` targets render a plain anchor. */
  to: string
  search?: Record<string, string | number | undefined>
  params?: Record<string, string>
  children?: React.ReactNode
}

const EXTERNAL = /^(https?:|mailto:|tel:|#)/

/**
 * Router `Link` that accepts plain strings.
 *
 * The navigation, footer and breadcrumb models are authored as data, so their
 * `to` values are `string` rather than the router's literal path union. This
 * wrapper is the single place that bridges the two — every consumer stays clean
 * and no `any` leaks into page or component code.
 */
export const AppLink = React.forwardRef<HTMLAnchorElement, AppLinkProps>(function AppLink(
  { to, search, params, children, ...props },
  ref,
) {
  if (EXTERNAL.test(to)) {
    const isHttp = to.startsWith('http')
    return (
      <a
        ref={ref}
        href={to}
        {...(isHttp ? { target: '_blank', rel: 'noreferrer noopener' } : null)}
        {...(props as React.ComponentPropsWithoutRef<'a'>)}
      >
        {children}
      </a>
    )
  }

  const linkProps = { to, search, params, ...props } as unknown as LinkComponentProps<'a'>
  return (
    <Link ref={ref} {...linkProps}>
      {children}
    </Link>
  )
})

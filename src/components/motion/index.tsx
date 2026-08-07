import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '~/lib/utils'

/**
 * Animation system.
 *
 * Every primitive degrades to a static element when the user prefers reduced
 * motion, and all scroll reveals fire once so long pages never "re-animate"
 * while scrolling back up.
 */

export const EASE_PREMIUM = [0.22, 1, 0.36, 1] as const

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const OFFSET: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
}

export type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Direction the element travels *from*. */
  direction?: Direction
  delay?: number
  duration?: number
  /** Render as a different intrinsic element (section, li, span…). */
  as?: 'div' | 'section' | 'article' | 'li' | 'span' | 'header' | 'aside'
  /** Trigger on mount instead of on scroll. */
  immediate?: boolean
  amount?: number
}

/** Scroll-triggered fade + translate. The workhorse of the page. */
export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  as = 'div',
  immediate = false,
  amount = 0.2,
}: RevealProps) {
  const reduced = useReducedMotion()
  const Comp = motion[as] as typeof motion.div
  const offset = OFFSET[direction]

  if (reduced) {
    const Static = as as React.ElementType
    return <Static className={className}>{children}</Static>
  }

  const animation = {
    initial: { opacity: 0, x: offset.x, y: offset.y },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: { duration, delay, ease: EASE_PREMIUM },
  }

  return (
    <Comp
      className={className}
      initial={animation.initial}
      {...(immediate
        ? { animate: animation.animate }
        : { whileInView: animation.animate, viewport: { once: true, amount } })}
      transition={animation.transition}
    >
      {children}
    </Comp>
  )
}

/** Simple opacity fade, no translation. */
export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.7,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
}) {
  const reduced = useReducedMotion()
  if (reduced) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration, delay, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  )
}

const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_PREMIUM } },
}

/** Wrap a grid/list to cascade its `<StaggerItem>` children into view. */
export function Stagger({
  children,
  className,
  as = 'div',
  amount = 0.15,
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'ul' | 'ol' | 'section'
  amount?: number
}) {
  const reduced = useReducedMotion()
  const Comp = motion[as] as typeof motion.div

  if (reduced) {
    const Static = as as React.ElementType
    return <Static className={className}>{children}</Static>
  }

  return (
    <Comp
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Comp>
  )
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}) {
  const reduced = useReducedMotion()
  const Comp = motion[as] as typeof motion.div

  if (reduced) {
    const Static = as as React.ElementType
    return <Static className={className}>{children}</Static>
  }

  return (
    <Comp className={className} variants={staggerChild}>
      {children}
    </Comp>
  )
}

/**
 * Word-by-word text reveal used for hero headlines. Splits on spaces and keeps
 * the full string available to assistive tech via `aria-label`.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  as: Tag = 'h1',
}: {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'p' | 'span'
}) {
  const reduced = useReducedMotion()

  if (reduced) return <Tag className={className}>{text}</Tag>

  const words = text.split(' ')

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.75,
              delay: delay + index * 0.06,
              ease: EASE_PREMIUM,
            }}
          >
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/** Route-level enter transition applied by the root layout. */
export function PageTransition({
  children,
  routeKey,
}: {
  children: React.ReactNode
  routeKey: string
}) {
  const reduced = useReducedMotion()
  if (reduced) return <>{children}</>

  return (
    <motion.div
      key={routeKey}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE_PREMIUM }}
    >
      {children}
    </motion.div>
  )
}

/** Subtle lift + shadow used by cards; pure CSS so it costs nothing on scroll. */
export const hoverCard = cn(
  'transition-[transform,box-shadow,border-color] duration-500 ease-premium',
  'hover:-translate-y-1 hover:shadow-elevated',
)

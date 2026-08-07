import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

const buttonVariants = cva(
  cn(
    'group/btn relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap',
    'font-sans font-semibold uppercase tracking-[0.1em]',
    'transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-premium',
    'active:translate-y-px disabled:pointer-events-none disabled:opacity-50',
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ),
  {
    variants: {
      variant: {
        /** Gold fill — the primary conversion action. */
        primary:
          'rounded-[2px] bg-gold-400 text-ink-950 hover:bg-gold-300 hover:shadow-gold',
        /** Solid black — used on cream sections. */
        dark: 'rounded-[2px] bg-ink-900 text-white hover:bg-ink-700',
        /** Hairline outline on dark backgrounds. */
        outline:
          'rounded-[2px] border border-white/25 text-white hover:border-gold-400 hover:text-gold-300',
        /** Hairline outline on light backgrounds. */
        outlineDark:
          'rounded-[2px] border border-ink-900/20 text-ink-900 hover:border-gold-500 hover:text-gold-600',
        /** Gold outline, gold text. */
        outlineGold:
          'rounded-[2px] border border-gold-400/60 text-gold-400 hover:bg-gold-400 hover:text-ink-950',
        ghost:
          'rounded-[2px] text-ink-900 hover:bg-ink-900/5 hover:text-gold-600',
        ghostLight: 'rounded-[2px] text-white/80 hover:bg-white/10 hover:text-white',
        /** Inline text action with an animated arrow. */
        link: 'text-gold-600 tracking-[0.08em] hover:text-gold-500',
        linkLight: 'text-gold-400 tracking-[0.08em] hover:text-gold-300',
      },
      size: {
        xs: 'h-8 px-3 text-[10px]',
        sm: 'h-9 px-4 text-[11px]',
        md: 'h-11 px-6 text-[12px]',
        lg: 'h-[52px] px-8 text-[13px]',
        icon: 'size-10 rounded-[2px] px-0 tracking-normal',
        inline: 'h-auto p-0 text-[11px]',
      },
      full: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md', full: false },
  },
)

export type ButtonProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof buttonVariants> & {
    /** Render the child element instead of a `<button>` (e.g. a router Link). */
    asChild?: boolean
  }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ className, variant, size, full, asChild = false, ...props }, ref) {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, full }), className)}
        {...props}
      />
    )
  },
)

/** Arrow that slides right on parent-button hover. Pair with any Button. */
export function ButtonArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 12"
      aria-hidden="true"
      className={cn(
        'h-[9px] w-[16px] transition-transform duration-300 ease-premium group-hover/btn:translate-x-1',
        className,
      )}
      fill="none"
    >
      <path d="M0 6h17.5M13 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export { buttonVariants }

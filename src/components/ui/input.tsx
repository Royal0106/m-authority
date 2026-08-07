import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/lib/utils'

export const fieldVariants = cva(
  cn(
    'w-full rounded-[2px] border font-sans text-[13px] leading-normal',
    'transition-[border-color,background-color,box-shadow] duration-300 ease-premium',
    'disabled:cursor-not-allowed disabled:opacity-60',
  ),
  {
    variants: {
      tone: {
        dark: cn(
          'border-white/12 bg-white/[0.04] text-white placeholder:text-white/40',
          'hover:border-white/25 focus:border-gold-400 focus:bg-white/[0.06]',
        ),
        light: cn(
          'border-cream-400 bg-white text-heading placeholder:text-muted',
          'hover:border-gold-300 focus:border-gold-400',
        ),
      },
      invalid: {
        true: 'border-red-500/70 focus:border-red-500',
        false: '',
      },
    },
    defaultVariants: { tone: 'dark', invalid: false },
  },
)

export type InputProps = Omit<React.ComponentPropsWithoutRef<'input'>, 'size'> &
  VariantProps<typeof fieldVariants>

export const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, tone, invalid, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid ? true : undefined}
      className={cn(fieldVariants({ tone, invalid }), 'h-12 px-4', className)}
      {...props}
    />
  )
})

export type TextareaProps = React.ComponentPropsWithoutRef<'textarea'> &
  VariantProps<typeof fieldVariants>

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ className, tone, invalid, rows = 5, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        aria-invalid={invalid ? true : undefined}
        className={cn(
          fieldVariants({ tone, invalid }),
          'resize-y px-4 py-3.5',
          className,
        )}
        {...props}
      />
    )
  },
)

export type NativeSelectProps = React.ComponentPropsWithoutRef<'select'> &
  VariantProps<typeof fieldVariants> & { placeholder?: string }

/**
 * Native `<select>` styled to match the design. Native is deliberate here: the
 * booking and strategy-call forms are the highest-intent surfaces on the site
 * and the OS picker is the most reliable on touch devices.
 */
export const NativeSelect = React.forwardRef<HTMLSelectElement, NativeSelectProps>(
  function NativeSelect({ className, tone = 'dark', invalid, children, ...props }, ref) {
    return (
      <div className="relative">
        <select
          ref={ref}
          aria-invalid={invalid ? true : undefined}
          className={cn(
            fieldVariants({ tone, invalid }),
            'h-12 appearance-none px-4 pr-10',
            tone === 'dark' && '[&>option]:bg-ink-800 [&>option]:text-white',
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <svg
          viewBox="0 0 12 8"
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2',
            tone === 'dark' ? 'text-white/50' : 'text-muted',
          )}
          fill="none"
        >
          <path d="M1 1.5 6 6.5l5-5" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </div>
    )
  },
)

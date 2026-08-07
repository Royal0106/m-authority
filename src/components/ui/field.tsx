import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '~/lib/utils'

export const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { tone?: 'dark' | 'light' }
>(function Label({ className, tone = 'dark', ...props }, ref) {
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        'block text-[11px] font-semibold uppercase tracking-[0.14em]',
        tone === 'dark' ? 'text-white/70' : 'text-muted',
        className,
      )}
      {...props}
    />
  )
})

export type FieldProps = {
  /** Rendered as a visible label; also wired to the control via `htmlFor`. */
  label?: string
  /** Visually hide the label but keep it for screen readers. */
  hideLabel?: boolean
  htmlFor: string
  error?: string
  hint?: string
  tone?: 'dark' | 'light'
  className?: string
  required?: boolean
  children: React.ReactNode
}

/**
 * Accessible field wrapper: label association, `aria-describedby` for hints and
 * errors, and a live region so validation messages are announced.
 */
export function Field({
  label,
  hideLabel = false,
  htmlFor,
  error,
  hint,
  tone = 'dark',
  className,
  required,
  children,
}: FieldProps) {
  return (
    <div className={cn('grid gap-2', className)}>
      {label ? (
        <Label
          htmlFor={htmlFor}
          tone={tone}
          className={cn(hideLabel && 'sr-only')}
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="ml-1 text-gold-400">
              *
            </span>
          ) : null}
        </Label>
      ) : null}
      {children}
      {hint && !error ? (
        <p
          id={`${htmlFor}-hint`}
          className={cn('text-[11px]', tone === 'dark' ? 'text-white/45' : 'text-muted')}
        >
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-[11px] font-medium text-red-400"
        >
          {error}
        </p>
      ) : null}
    </div>
  )
}

/** `aria-describedby` value for a field that may have a hint and/or an error. */
export function describedBy(id: string, hint?: string, error?: string) {
  const ids = [hint && !error ? `${id}-hint` : null, error ? `${id}-error` : null].filter(
    Boolean,
  )
  return ids.length ? ids.join(' ') : undefined
}

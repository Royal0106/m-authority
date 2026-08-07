import * as React from 'react'
import { AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { cn } from '~/lib/utils'

const TONE = {
  success: {
    wrapper: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300',
    icon: CheckCircle2,
  },
  error: { wrapper: 'border-red-500/30 bg-red-500/10 text-red-300', icon: AlertCircle },
  info: { wrapper: 'border-gold-400/30 bg-gold-400/10 text-gold-200', icon: Info },
} as const

export type AlertProps = {
  variant?: keyof typeof TONE
  title?: string
  children?: React.ReactNode
  className?: string
}

/**
 * Inline status message. Rendered inside an assertive live region so form
 * submission feedback is announced to screen reader users.
 */
export function Alert({ variant = 'info', title, children, className }: AlertProps) {
  const { wrapper, icon: Icon } = TONE[variant]
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 rounded-[2px] border px-4 py-3 text-[12.5px] leading-relaxed',
        wrapper,
        className,
      )}
    >
      <Icon aria-hidden="true" className="mt-px size-4 shrink-0" />
      <div>
        {title ? <p className="font-semibold">{title}</p> : null}
        {children ? <p className="opacity-90">{children}</p> : null}
      </div>
    </div>
  )
}

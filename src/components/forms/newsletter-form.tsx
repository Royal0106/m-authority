import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowRight, Check, Loader2 } from 'lucide-react'
import { cn } from '~/lib/utils'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { describedBy } from '~/components/ui/field'

const newsletterSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
})

type NewsletterValues = z.infer<typeof newsletterSchema>

export type NewsletterFormProps = {
  /** `arrow` = compact icon button (footer). `label` = full-width CTA button. */
  variant?: 'arrow' | 'label'
  submitLabel?: string
  placeholder?: string
  tone?: 'dark' | 'light'
  size?: 'md' | 'lg'
  /** Reassurance ticks rendered under the field. */
  assurances?: Array<string>
  className?: string
}

/**
 * Newsletter capture UI.
 *
 * Frontend-only: `onSubmit` resolves a simulated request. Replace the body of
 * `submit` with a real `fetch`/mutation — validation, pending, error and success
 * states are already wired.
 */
export function NewsletterForm({
  variant = 'arrow',
  submitLabel = 'Subscribe',
  placeholder = 'Enter your email',
  tone = 'dark',
  size = 'md',
  assurances,
  className,
}: NewsletterFormProps) {
  const [done, setDone] = React.useState(false)
  const fieldId = React.useId()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '' },
  })

  const submit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    setDone(true)
    reset()
    setTimeout(() => setDone(false), 4000)
  })

  const height = size === 'lg' ? 'h-[52px]' : 'h-11'

  return (
    <form noValidate onSubmit={submit} className={cn('grid gap-2.5', className)}>
      <div className="flex w-full">
        <label htmlFor={fieldId} className="sr-only">
          Email address
        </label>
        <Input
          id={fieldId}
          type="email"
          autoComplete="email"
          placeholder={placeholder}
          tone={tone}
          invalid={Boolean(errors.email)}
          aria-describedby={describedBy(fieldId, undefined, errors.email?.message)}
          className={cn('rounded-r-none border-r-0', height)}
          {...register('email')}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'rounded-l-none',
            height,
            variant === 'arrow' ? 'w-12 px-0' : 'px-6',
          )}
          aria-label={variant === 'arrow' ? submitLabel : undefined}
        >
          {isSubmitting ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          ) : variant === 'arrow' ? (
            <ArrowRight aria-hidden="true" className="size-4" />
          ) : (
            submitLabel
          )}
        </Button>
      </div>

      {errors.email ? (
        <p
          id={`${fieldId}-error`}
          role="alert"
          className="text-[11px] font-medium text-red-400"
        >
          {errors.email.message}
        </p>
      ) : null}

      <p aria-live="polite" className="sr-only">
        {done ? 'You are subscribed. Check your inbox to confirm.' : ''}
      </p>

      {done ? (
        <p className="flex items-center gap-1.5 text-[11.5px] font-medium text-emerald-400">
          <Check aria-hidden="true" className="size-3.5" />
          You&rsquo;re in. Check your inbox to confirm.
        </p>
      ) : assurances?.length ? (
        <ul
          className={cn(
            'flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[11px]',
            tone === 'dark' ? 'text-white/45' : 'text-muted',
          )}
        >
          {assurances.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <Check aria-hidden="true" className="size-3 text-gold-400" />
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  )
}

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check, Loader2 } from 'lucide-react'
import { cn } from '~/lib/utils'
import { Input, Textarea } from '~/components/ui/input'
import { Field, describedBy } from '~/components/ui/field'
import { Button, ButtonArrow } from '~/components/ui/button'
import { Alert } from '~/components/ui/alert'
import { useMockSubmit } from '~/components/forms/use-mock-submit'

export const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  subject: z.string().min(3, 'Add a short subject'),
  message: z.string().min(20, 'Tell us a little more — 20 characters minimum'),
})

export type ContactValues = z.infer<typeof contactSchema>

const ASSURANCES = ['No spam, ever', '100% confidential', 'We reply within 24 hours']

export function ContactForm({ className }: { className?: string }) {
  const id = React.useId()
  const { status, submit } = useMockSubmit()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  })

  const onSubmit = handleSubmit(async () => {
    await submit()
    reset()
  })

  return (
    <form noValidate onSubmit={onSubmit} className={cn('grid gap-4', className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          hideLabel
          htmlFor={`${id}-name`}
          error={errors.name?.message}
          required
        >
          <Input
            id={`${id}-name`}
            placeholder="Full Name"
            autoComplete="name"
            invalid={Boolean(errors.name)}
            aria-describedby={describedBy(`${id}-name`, undefined, errors.name?.message)}
            {...register('name')}
          />
        </Field>

        <Field
          label="Email address"
          hideLabel
          htmlFor={`${id}-email`}
          error={errors.email?.message}
          required
        >
          <Input
            id={`${id}-email`}
            type="email"
            placeholder="Email Address"
            autoComplete="email"
            invalid={Boolean(errors.email)}
            aria-describedby={describedBy(`${id}-email`, undefined, errors.email?.message)}
            {...register('email')}
          />
        </Field>
      </div>

      <Field
        label="Subject"
        hideLabel
        htmlFor={`${id}-subject`}
        error={errors.subject?.message}
        required
      >
        <Input
          id={`${id}-subject`}
          placeholder="Subject"
          invalid={Boolean(errors.subject)}
          aria-describedby={describedBy(`${id}-subject`, undefined, errors.subject?.message)}
          {...register('subject')}
        />
      </Field>

      <Field
        label="Your message"
        hideLabel
        htmlFor={`${id}-message`}
        error={errors.message?.message}
        required
      >
        <Textarea
          id={`${id}-message`}
          rows={6}
          placeholder="Your Message"
          invalid={Boolean(errors.message)}
          aria-describedby={describedBy(`${id}-message`, undefined, errors.message?.message)}
          {...register('message')}
        />
      </Field>

      {status === 'success' ? (
        <Alert variant="success" title="Message sent">
          Thanks for reaching out — we&rsquo;ll reply within 24 hours.
        </Alert>
      ) : (
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-white/45">
          {ASSURANCES.map((item) => (
            <li key={item} className="flex items-center gap-1.5">
              <Check aria-hidden="true" className="size-3 text-gold-400" />
              {item}
            </li>
          ))}
        </ul>
      )}

      <div>
        <Button type="submit" size="md" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send Message
              <ButtonArrow />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

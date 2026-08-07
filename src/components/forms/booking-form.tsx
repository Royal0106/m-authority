import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { cn } from '~/lib/utils'
import { Input, NativeSelect, Textarea } from '~/components/ui/input'
import { Field, describedBy } from '~/components/ui/field'
import { Button, ButtonArrow } from '~/components/ui/button'
import { Alert } from '~/components/ui/alert'
import { useMockSubmit } from '~/components/forms/use-mock-submit'

/* -------------------------------------------------------------------------- */
/*  Speaking / event booking                                                    */
/* -------------------------------------------------------------------------- */

export const bookingSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  organization: z.string().min(2, 'Please enter your organization'),
  eventType: z.string().min(1, 'Choose an event type'),
  eventDate: z.string().min(1, 'Choose a date'),
  message: z.string().min(10, 'Add a few details about your event'),
})

export type BookingValues = z.infer<typeof bookingSchema>

export function BookingForm({
  eventTypes,
  submitLabel = 'Send Request',
  className,
}: {
  eventTypes: ReadonlyArray<string>
  submitLabel?: string
  className?: string
}) {
  const id = React.useId()
  const { status, submit } = useMockSubmit()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      organization: '',
      eventType: '',
      eventDate: '',
      message: '',
    },
  })

  const onSubmit = handleSubmit(async () => {
    await submit()
    reset()
  })

  return (
    <form noValidate onSubmit={onSubmit} className={cn('grid gap-4', className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" hideLabel htmlFor={`${id}-name`} error={errors.name?.message} required>
          <Input
            id={`${id}-name`}
            placeholder="Your Name"
            autoComplete="name"
            invalid={Boolean(errors.name)}
            aria-describedby={describedBy(`${id}-name`, undefined, errors.name?.message)}
            {...register('name')}
          />
        </Field>
        <Field label="Your email" hideLabel htmlFor={`${id}-email`} error={errors.email?.message} required>
          <Input
            id={`${id}-email`}
            type="email"
            placeholder="Your Email"
            autoComplete="email"
            invalid={Boolean(errors.email)}
            aria-describedby={describedBy(`${id}-email`, undefined, errors.email?.message)}
            {...register('email')}
          />
        </Field>
      </div>

      <Field
        label="Organization"
        hideLabel
        htmlFor={`${id}-org`}
        error={errors.organization?.message}
        required
      >
        <Input
          id={`${id}-org`}
          placeholder="Organization"
          autoComplete="organization"
          invalid={Boolean(errors.organization)}
          aria-describedby={describedBy(`${id}-org`, undefined, errors.organization?.message)}
          {...register('organization')}
        />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Event type"
          hideLabel
          htmlFor={`${id}-type`}
          error={errors.eventType?.message}
          required
        >
          <NativeSelect
            id={`${id}-type`}
            defaultValue=""
            invalid={Boolean(errors.eventType)}
            aria-describedby={describedBy(`${id}-type`, undefined, errors.eventType?.message)}
            {...register('eventType')}
          >
            <option value="" disabled>
              Event Type
            </option>
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </NativeSelect>
        </Field>

        <Field
          label="Event date"
          hideLabel
          htmlFor={`${id}-date`}
          error={errors.eventDate?.message}
          required
        >
          <Input
            id={`${id}-date`}
            type="date"
            placeholder="Event Date"
            invalid={Boolean(errors.eventDate)}
            aria-describedby={describedBy(`${id}-date`, undefined, errors.eventDate?.message)}
            className="[&::-webkit-calendar-picker-indicator]:invert-[0.7]"
            {...register('eventDate')}
          />
        </Field>
      </div>

      <Field label="Message" hideLabel htmlFor={`${id}-message`} error={errors.message?.message} required>
        <Textarea
          id={`${id}-message`}
          rows={5}
          placeholder="Message"
          invalid={Boolean(errors.message)}
          aria-describedby={describedBy(`${id}-message`, undefined, errors.message?.message)}
          {...register('message')}
        />
      </Field>

      {status === 'success' ? (
        <Alert variant="success" title="Request received">
          My team will confirm availability within 24 hours.
        </Alert>
      ) : null}

      <Button type="submit" size="lg" full disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            {submitLabel}
            <ButtonArrow />
          </>
        )}
      </Button>
    </form>
  )
}

/* -------------------------------------------------------------------------- */
/*  Strategy call (AI For Business)                                             */
/* -------------------------------------------------------------------------- */

export const strategyCallSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  company: z.string().min(2, 'Please enter your company'),
  phone: z.string().min(7, 'Enter a reachable phone number'),
  interest: z.string().min(1, 'Choose what you are looking for'),
  goals: z.string().min(10, 'Tell me a little about your goals'),
})

export type StrategyCallValues = z.infer<typeof strategyCallSchema>

export function StrategyCallForm({
  interests,
  submitLabel = 'Book My Strategy Call',
  className,
}: {
  interests: ReadonlyArray<string>
  submitLabel?: string
  className?: string
}) {
  const id = React.useId()
  const { status, submit } = useMockSubmit()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<StrategyCallValues>({
    resolver: zodResolver(strategyCallSchema),
    defaultValues: { name: '', email: '', company: '', phone: '', interest: '', goals: '' },
  })

  const onSubmit = handleSubmit(async () => {
    await submit()
    reset()
  })

  return (
    <form noValidate onSubmit={onSubmit} className={cn('grid gap-3.5', className)}>
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label="Your name" hideLabel htmlFor={`${id}-name`} error={errors.name?.message} required>
          <Input
            id={`${id}-name`}
            placeholder="Your Name"
            autoComplete="name"
            invalid={Boolean(errors.name)}
            aria-describedby={describedBy(`${id}-name`, undefined, errors.name?.message)}
            {...register('name')}
          />
        </Field>
        <Field label="Your email" hideLabel htmlFor={`${id}-email`} error={errors.email?.message} required>
          <Input
            id={`${id}-email`}
            type="email"
            placeholder="Your Email"
            autoComplete="email"
            invalid={Boolean(errors.email)}
            aria-describedby={describedBy(`${id}-email`, undefined, errors.email?.message)}
            {...register('email')}
          />
        </Field>
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field
          label="Company name"
          hideLabel
          htmlFor={`${id}-company`}
          error={errors.company?.message}
          required
        >
          <Input
            id={`${id}-company`}
            placeholder="Company Name"
            autoComplete="organization"
            invalid={Boolean(errors.company)}
            aria-describedby={describedBy(`${id}-company`, undefined, errors.company?.message)}
            {...register('company')}
          />
        </Field>
        <Field
          label="Phone number"
          hideLabel
          htmlFor={`${id}-phone`}
          error={errors.phone?.message}
          required
        >
          <Input
            id={`${id}-phone`}
            type="tel"
            placeholder="Phone Number"
            autoComplete="tel"
            invalid={Boolean(errors.phone)}
            aria-describedby={describedBy(`${id}-phone`, undefined, errors.phone?.message)}
            {...register('phone')}
          />
        </Field>
      </div>

      <Field
        label="What are you looking for?"
        hideLabel
        htmlFor={`${id}-interest`}
        error={errors.interest?.message}
        required
      >
        <NativeSelect
          id={`${id}-interest`}
          defaultValue=""
          invalid={Boolean(errors.interest)}
          aria-describedby={describedBy(`${id}-interest`, undefined, errors.interest?.message)}
          {...register('interest')}
        >
          <option value="" disabled>
            What are you looking for?
          </option>
          {interests.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </NativeSelect>
      </Field>

      <Field label="Your goals" hideLabel htmlFor={`${id}-goals`} error={errors.goals?.message} required>
        <Textarea
          id={`${id}-goals`}
          rows={4}
          placeholder="Tell me about your business and goals..."
          invalid={Boolean(errors.goals)}
          aria-describedby={describedBy(`${id}-goals`, undefined, errors.goals?.message)}
          {...register('goals')}
        />
      </Field>

      {status === 'success' ? (
        <Alert variant="success" title="Call requested">
          Look out for an email with available times within 24 hours.
        </Alert>
      ) : null}

      <Button type="submit" size="lg" full disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            {submitLabel}
            <ButtonArrow />
          </>
        )}
      </Button>
    </form>
  )
}

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
import { cn } from '~/lib/utils'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Alert } from '~/components/ui/alert'
import { Avatar } from '~/components/content/avatar'
import { describedBy } from '~/components/ui/field'
import { useMockSubmit } from '~/components/forms/use-mock-submit'

export const commentSchema = z.object({
  body: z.string().min(3, 'Write at least a few words'),
})

export type CommentValues = z.infer<typeof commentSchema>

/**
 * Article comment composer.
 *
 * Frontend-only: submitted comments are not persisted. The success state stands
 * in for the moderation notice a real backend would return.
 */
export function CommentForm({ className }: { className?: string }) {
  const id = React.useId()
  const { status, submit } = useMockSubmit()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: { body: '' },
  })

  const onSubmit = handleSubmit(async () => {
    await submit()
    reset()
  })

  return (
    <form noValidate onSubmit={onSubmit} className={cn('grid gap-3', className)}>
      <div className="flex items-center gap-3">
        <Avatar name="You" size="md" />
        <label htmlFor={`${id}-body`} className="sr-only">
          Write a comment
        </label>
        <Input
          id={`${id}-body`}
          tone="light"
          placeholder="Write a comment..."
          invalid={Boolean(errors.body)}
          aria-describedby={describedBy(`${id}-body`, undefined, errors.body?.message)}
          className="flex-1"
          {...register('body')}
        />
        <Button type="submit" size="md" disabled={isSubmitting} className="shrink-0">
          {isSubmitting ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            'Post Comment'
          )}
        </Button>
      </div>

      {errors.body ? (
        <p id={`${id}-body-error`} role="alert" className="text-[11px] font-medium text-red-500">
          {errors.body.message}
        </p>
      ) : null}

      {status === 'success' ? (
        <Alert variant="success" title="Comment submitted">
          Your comment will appear once it clears moderation.
        </Alert>
      ) : null}
    </form>
  )
}

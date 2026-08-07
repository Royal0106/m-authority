import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { cn } from '~/lib/utils'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
    tone?: 'dark' | 'light'
  }
>(function AccordionItem({ className, tone = 'light', ...props }, ref) {
  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(
        'border-b',
        tone === 'dark' ? 'border-white/10' : 'border-cream-300',
        className,
      )}
      {...props}
    />
  )
})

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    tone?: 'dark' | 'light'
  }
>(function AccordionTrigger({ className, children, tone = 'light', ...props }, ref) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'group flex flex-1 items-center justify-between gap-4 py-4 text-left',
          'text-[13px] font-medium leading-snug transition-colors duration-300',
          tone === 'dark'
            ? 'text-white/85 hover:text-gold-300'
            : 'text-heading hover:text-gold-600',
          className,
        )}
        {...props}
      >
        <span>{children}</span>
        {/* Plus that rotates into a minus when the panel opens. */}
        <span
          aria-hidden="true"
          className="relative size-4 shrink-0 text-gold-500"
        >
          <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-current" />
          <span
            className={cn(
              'absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-current',
              'transition-transform duration-300 ease-premium',
              'group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0',
            )}
          />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
    tone?: 'dark' | 'light'
  }
>(function AccordionContent({ className, children, tone = 'light', ...props }, ref) {
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        'overflow-hidden text-[13px] leading-relaxed',
        'data-[state=closed]:animate-[ma-collapse_240ms_ease] data-[state=open]:animate-[ma-expand_240ms_ease]',
        tone === 'dark' ? 'text-white/60' : 'text-body',
      )}
      {...props}
    >
      <div className={cn('pb-5 pr-10', className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
})

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

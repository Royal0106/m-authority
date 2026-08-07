import { cn } from '~/lib/utils'
import type { Faq } from '~/data/faqs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion'

/**
 * FAQ accordion. Single-open by default with `collapsible`, so keyboard users
 * can close the active panel — Radix supplies the roving focus and ARIA wiring.
 */
export function FaqList({
  items,
  tone = 'light',
  defaultOpen,
  className,
}: {
  items: ReadonlyArray<Faq>
  tone?: 'light' | 'dark'
  /** Index of the panel open on first paint. */
  defaultOpen?: number
  className?: string
}) {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={typeof defaultOpen === 'number' ? `item-${defaultOpen}` : undefined}
      className={cn('grid', className)}
    >
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`item-${index}`} tone={tone}>
          <AccordionTrigger tone={tone}>{item.question}</AccordionTrigger>
          <AccordionContent tone={tone}>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

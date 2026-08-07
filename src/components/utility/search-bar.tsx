import * as React from 'react'
import { useNavigate } from '@tanstack/react-router'
import { Search } from 'lucide-react'
import { cn } from '~/lib/utils'
import { Input } from '~/components/ui/input'

export type SearchBarProps = {
  tone?: 'dark' | 'light'
  placeholder?: string
  defaultValue?: string
  className?: string
  size?: 'md' | 'lg'
  /** Called after a successful submit — used to close the mobile drawer. */
  onSubmit?: () => void
}

/**
 * Article search. Frontend-only: the query is pushed onto the `/blog` route as
 * a search param, where the mock data layer filters in memory. Point this at a
 * real search endpoint later without changing the markup.
 */
export function SearchBar({
  tone = 'light',
  placeholder = 'Search articles...',
  defaultValue = '',
  className,
  size = 'md',
  onSubmit,
}: SearchBarProps) {
  const navigate = useNavigate()
  const [value, setValue] = React.useState(defaultValue)
  const id = React.useId()

  return (
    <form
      role="search"
      className={cn('flex w-full', className)}
      onSubmit={(event) => {
        event.preventDefault()
        void navigate({
          to: '/blog',
          search: value.trim() ? { q: value.trim() } : {},
        })
        onSubmit?.()
      }}
    >
      <label htmlFor={id} className="sr-only">
        Search articles
      </label>
      <Input
        id={id}
        type="search"
        tone={tone}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className={cn(
          'rounded-r-none border-r-0',
          size === 'lg' ? 'h-[52px]' : 'h-11',
          tone === 'light' && 'bg-white',
        )}
      />
      <button
        type="submit"
        aria-label="Search"
        className={cn(
          'inline-flex shrink-0 items-center justify-center rounded-[2px] rounded-l-none bg-gold-400 text-ink-950',
          'transition-colors duration-300 hover:bg-gold-300',
          size === 'lg' ? 'h-[52px] w-14' : 'h-11 w-12',
        )}
      >
        <Search aria-hidden="true" className="size-4" />
      </button>
    </form>
  )
}

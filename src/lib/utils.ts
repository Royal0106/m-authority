import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge conditional class names, resolving Tailwind conflicts last-wins. */
export function cn(...inputs: Array<ClassValue>) {
  return twMerge(clsx(inputs))
}

/** `2024-05-16` → `May 16, 2024` */
export function formatDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return `${months[(month ?? 1) - 1]} ${day}, ${year}`
}

/** `2024-05-16` → `May 16, 2024` in the compact form used on cards. */
export function formatDateShort(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return `${months[(month ?? 1) - 1]} ${day}, ${year}`
}

/** Stable 0..n-1 hash so placeholder art stays identical between SSR and client. */
export function stableIndex(seed: string, buckets: number) {
  let hash = 0
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) % buckets
}

/** `01`, `02`, … used by numbered legal/process sections. */
export function padIndex(index: number) {
  return String(index).padStart(2, '0')
}

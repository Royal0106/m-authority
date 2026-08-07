import {
  Award,
  BadgeCheck,
  BookOpen,
  Brain,
  Briefcase,
  Building2,
  CalendarDays,
  ChartColumn,
  CircleX,
  Cloud,
  Compass,
  Cookie,
  Copyright,
  Cpu,
  Database,
  Dumbbell,
  Gem,
  GraduationCap,
  Handshake,
  Headset,
  Heart,
  HeartHandshake,
  HeartPulse,
  Info,
  Landmark,
  Layers,
  Lock,
  Mail,
  Megaphone,
  Mic,
  Monitor,
  PenLine,
  PiggyBank,
  Presentation,
  Scale,
  Settings,
  Share2,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Shirt,
  ShoppingCart,
  Sparkles,
  Sprout,
  Target,
  Timer,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  Watch,
  Workflow,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '~/lib/utils'

/**
 * String → icon registry.
 *
 * Content modules reference icons by name so they stay serialisable — exactly
 * what a CMS or API payload would return.
 */
export const iconRegistry = {
  award: Award,
  'badge-check': BadgeCheck,
  'bar-chart-3': ChartColumn,
  'book-open': BookOpen,
  brain: Brain,
  briefcase: Briefcase,
  'building-2': Building2,
  'calendar-days': CalendarDays,
  'circle-x': CircleX,
  cloud: Cloud,
  compass: Compass,
  cookie: Cookie,
  copyright: Copyright,
  cpu: Cpu,
  database: Database,
  dumbbell: Dumbbell,
  gem: Gem,
  'graduation-cap': GraduationCap,
  handshake: Handshake,
  headset: Headset,
  heart: Heart,
  'heart-handshake': HeartHandshake,
  'heart-pulse': HeartPulse,
  info: Info,
  landmark: Landmark,
  layers: Layers,
  lock: Lock,
  mail: Mail,
  megaphone: Megaphone,
  mic: Mic,
  monitor: Monitor,
  'pen-line': PenLine,
  'piggy-bank': PiggyBank,
  presentation: Presentation,
  scale: Scale,
  settings: Settings,
  'share-2': Share2,
  shield: Shield,
  'shield-alert': ShieldAlert,
  'shield-check': ShieldCheck,
  shirt: Shirt,
  'shopping-cart': ShoppingCart,
  sparkles: Sparkles,
  sprout: Sprout,
  target: Target,
  timer: Timer,
  'trending-up': TrendingUp,
  trophy: Trophy,
  'user-check': UserCheck,
  users: Users,
  watch: Watch,
  workflow: Workflow,
  zap: Zap,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof iconRegistry

export function Icon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Component = iconRegistry[name as IconName] ?? Sparkles
  return <Component aria-hidden="true" className={cn('size-5', className)} />
}

/**
 * Icon inside the framed square used throughout the design — outlined on light
 * sections, gold-tinted on dark ones.
 */
export function IconTile({
  name,
  tone = 'light',
  size = 'md',
  className,
}: {
  name: string
  tone?: 'light' | 'dark' | 'gold'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const box = {
    sm: 'size-10',
    md: 'size-12',
    lg: 'size-[68px]',
  }[size]

  const glyph = {
    sm: 'size-4',
    md: 'size-5',
    lg: 'size-7',
  }[size]

  const skin = {
    light: 'border border-cream-300 bg-white text-gold-500',
    dark: 'border border-white/10 bg-white/[0.04] text-gold-400',
    gold: 'bg-ink-900 text-gold-400',
  }[tone]

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-[3px]',
        box,
        skin,
        className,
      )}
    >
      <Icon name={name} className={glyph} />
    </span>
  )
}

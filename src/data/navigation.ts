/** Navigation model — drives the navbar, mega menu, mobile drawer and footer. */

export type NavLink = {
  label: string
  to: string
  search?: Record<string, string>
  description?: string
}

export type MegaMenuGroup = {
  title: string
  links: Array<NavLink>
}

export type PrimaryNavItem = NavLink & {
  /** When present the item opens a mega menu on hover / Enter. */
  mega?: {
    intro: { eyebrow: string; title: string; body: string; cta: NavLink }
    groups: Array<MegaMenuGroup>
  }
}

const categoryLink = (label: string, slug: string, description: string): NavLink => ({
  label,
  to: '/blog',
  search: { category: slug },
  description,
})

export const categories = [
  { name: 'Fitness', slug: 'fitness', articles: 182, blurb: 'Train smarter, get stronger', icon: 'dumbbell' },
  { name: 'Style', slug: 'style', articles: 156, blurb: 'Look sharp, feel confident', icon: 'shirt' },
  { name: 'Success', slug: 'success', articles: 210, blurb: 'Build your wealth & mindset', icon: 'trending-up' },
  { name: 'Grooming', slug: 'grooming', articles: 128, blurb: 'Elevate your daily routine', icon: 'sparkles' },
  { name: 'Relationships', slug: 'relationships', articles: 97, blurb: 'Build stronger connections', icon: 'users' },
  { name: 'Gear', slug: 'gear', articles: 134, blurb: 'The best tools & resources', icon: 'watch' },
  { name: 'AI For Business', slug: 'ai-for-business', articles: 88, blurb: 'Systems that scale', icon: 'cpu' },
] as const

export const primaryNav: Array<PrimaryNavItem> = [
  { label: 'Home', to: '/' },
  {
    label: 'Fitness',
    to: '/blog',
    search: { category: 'fitness' },
    mega: {
      intro: {
        eyebrow: 'Train With Intent',
        title: 'Build a body that backs you up',
        body: 'Programming, recovery and nutrition guidance written for men who train around real lives.',
        cta: { label: 'Browse all fitness', to: '/blog', search: { category: 'fitness' } },
      },
      groups: [
        {
          title: 'Training',
          links: [
            categoryLink('Strength', 'fitness', 'Progressive overload done right'),
            categoryLink('Conditioning', 'fitness', 'Engine work that carries over'),
            categoryLink('Mobility', 'fitness', 'Move well, stay injury free'),
          ],
        },
        {
          title: 'Fuel & Recovery',
          links: [
            categoryLink('Nutrition', 'fitness', 'Eat for performance'),
            categoryLink('Sleep', 'fitness', 'The cheapest performance lever'),
            categoryLink('Supplements', 'fitness', 'What actually earns a spot'),
          ],
        },
      ],
    },
  },
  { label: 'Style', to: '/blog', search: { category: 'style' } },
  {
    label: 'Success',
    to: '/blog',
    search: { category: 'success' },
    mega: {
      intro: {
        eyebrow: 'Systems Over Goals',
        title: 'Compound your advantage',
        body: 'Frameworks for focus, wealth and leadership from two decades of building businesses.',
        cta: { label: 'Browse all success', to: '/blog', search: { category: 'success' } },
      },
      groups: [
        {
          title: 'Mindset',
          links: [
            categoryLink('Discipline', 'success', 'Show up when it is hard'),
            categoryLink('Focus', 'success', 'Deep work in a loud world'),
            categoryLink('Habits', 'success', 'Small wins, big results'),
          ],
        },
        {
          title: 'Business',
          links: [
            { label: 'AI For Business', to: '/ai-for-business', description: 'Automate the busywork' },
            { label: 'My Expertise', to: '/expertise', description: 'Where strategy meets impact' },
            { label: 'Book With Brian', to: '/booking', description: 'Work together 1-on-1' },
          ],
        },
      ],
    },
  },
  { label: 'Relationships', to: '/blog', search: { category: 'relationships' } },
  { label: 'Grooming', to: '/blog', search: { category: 'grooming' } },
  { label: 'Gear', to: '/blog', search: { category: 'gear' } },
  { label: 'Blog', to: '/blog' },
]

/** Slim utility bar above the main navbar. */
export const utilityNav: Array<NavLink> = [
  { label: 'About', to: '/about' },
  { label: 'Expertise', to: '/expertise' },
  { label: 'Speaking', to: '/speaking' },
  { label: 'Contact', to: '/contact' },
]

export const footerNav: Array<MegaMenuGroup> = [
  {
    title: 'Explore',
    links: [
      { label: 'Fitness', to: '/blog', search: { category: 'fitness' } },
      { label: 'Style', to: '/blog', search: { category: 'style' } },
      { label: 'Success', to: '/blog', search: { category: 'success' } },
      { label: 'Relationships', to: '/blog', search: { category: 'relationships' } },
      { label: 'Grooming', to: '/blog', search: { category: 'grooming' } },
      { label: 'Gear', to: '/blog', search: { category: 'gear' } },
      { label: 'Blog', to: '/blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Expertise', to: '/expertise' },
      { label: 'Speaking', to: '/speaking' },
      { label: 'AI For Business', to: '/ai-for-business' },
      { label: 'Book With Brian', to: '/booking' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Articles', to: '/blog' },
      { label: 'Newsletter', to: '/newsletter' },
      { label: 'Guides', to: '/newsletter' },
      { label: 'Free Tools', to: '/newsletter' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
    ],
  },
]

export const legalNav: Array<NavLink> = [
  { label: 'Terms of Service', to: '/terms' },
  { label: 'Privacy Policy', to: '/privacy' },
]

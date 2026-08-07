/** Content model for the Home page. */

export const homeHero = {
  eyebrow: 'Live With Purpose',
  headline: ['Be Stronger.', 'Be Smarter.', 'Be Better.'],
  /** Headline line rendered in gold. */
  accentLine: 'Be Better.',
  body: 'Expert advice and real-world insights on fitness, style, success and mindset for men who want more.',
  badge: { value: '20+', label: 'Years of Experience' },
  trust: [
    { title: '100% Trusted', description: 'Expert Content' },
    { title: 'Practical', description: 'Real Results' },
    { title: 'Built for Men', description: 'By Men' },
    { title: 'Join 100K+', description: 'Men Worldwide' },
  ],
} as const

export const bestSellers = [
  { name: 'MA Premium Hoodie', price: '$59.99', rating: 4.5, reviews: 128 },
  { name: 'Performance Watch', price: '$199.99', rating: 4.5, reviews: 96 },
  { name: 'Leather Duffle Bag', price: '$149.99', rating: 4.5, reviews: 73 },
  { name: 'Wireless Earbuds', price: '$89.99', rating: 4.5, reviews: 111 },
  { name: 'Grooming Kit', price: '$49.99', rating: 4.5, reviews: 85 },
  { name: 'MA Shaker Bottle', price: '$29.99', rating: 4.5, reviews: 67 },
] as const

export const brianIntro = {
  eyebrow: 'About Brian',
  title: 'The Guy Behind',
  titleAccent: 'the Results',
  body: [
    'Brian Hanson is a 20+ year business strategist and AI consultant who helps ambitious leaders build smarter systems, stronger teams, and scalable businesses.',
    'With over 500 clients across the globe, Brian combines strategy, technology, and execution to deliver measurable results.',
  ],
  quote:
    'I believe every great business is built on clarity, systems, and leverage — and AI is the ultimate lever.',
  badge: { value: '4x', label: 'Businesses Scaled' },
  actions: [
    { label: 'My Story', to: '/about' },
    { label: 'Client Success', to: '/expertise' },
    { label: 'Press & Media', to: '/speaking' },
    { label: 'Speaking Engagements', to: '/speaking' },
  ],
} as const

export const helpPillars = [
  {
    icon: 'cpu',
    title: 'AI Strategy & Automation',
    description: 'Design AI systems that streamline operations and eliminate wasted time.',
  },
  {
    icon: 'megaphone',
    title: 'Direct Response Marketing',
    description: 'Use AI to craft messages that convert and campaigns that scale.',
  },
  {
    icon: 'brain',
    title: 'Sales & Conversion Psychology',
    description: 'Optimize your offer, message, and funnel for maximum impact.',
  },
  {
    icon: 'settings',
    title: 'Business Systems',
    description: 'Build scalable systems that run your business — not the other way around.',
  },
  {
    icon: 'user-check',
    title: 'Private Coaching',
    description: 'Work 1-on-1 with Brian to implement AI strategies in your business.',
  },
] as const

export const homeStats = [
  { value: '1x', label: 'Mindset Transformation' },
  { value: '2,021+', label: 'Clients & Students Worldwide' },
  { value: '4+', label: 'International Bestselling Books' },
  { value: '$10M+', label: 'Generated For Clients In Revenue' },
] as const

export const masterclass = {
  eyebrow: 'Master Your Future',
  title: 'Where Entrepreneurs',
  titleAccent: 'Learn to Win',
  body: 'Join my free masterclass and discover the AI strategies high performers use to save time, make more money, and scale faster.',
  eventLabel: 'Next Event — Oct 18',
  stats: [
    { value: '100%', label: 'Free Access' },
    { value: '50,000+', label: 'Members' },
    { value: '4.9★', label: 'Average Rating' },
  ],
} as const

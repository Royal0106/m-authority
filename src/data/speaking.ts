/** Content model for the Speaking page and the Booking page. */

export const speakingHero = {
  eyebrow: 'Speaking',
  title: 'Inspire. Educate.',
  titleAccent: 'Drive Real Change.',
  body: 'Keynotes and workshops that empower men and organizations to lead with clarity, leverage technology, and achieve extraordinary results.',
  stats: [
    { value: '20+', label: 'Years Speaking' },
    { value: '500+', label: 'Events Worldwide' },
    { value: '50,000+', label: 'People Impacted' },
    { value: '30+', label: 'Countries' },
  ],
} as const

export const whyHireMe = [
  {
    icon: 'badge-check',
    title: 'Real-World Experience',
    description: '20+ years building businesses and leading teams across industries.',
  },
  {
    icon: 'trending-up',
    title: 'Actionable Insights',
    description: 'Practical strategies your audience can implement immediately.',
  },
  {
    icon: 'users',
    title: 'Engaging & Relatable',
    description: 'Stories and examples that connect, inspire, and stick with your audience.',
  },
  {
    icon: 'trophy',
    title: 'Proven Impact',
    description: 'Trusted by global brands and organizations to drive results.',
  },
] as const

export const speakingTopics = [
  {
    icon: 'cpu',
    title: 'AI & Automation',
    description: 'Leverage AI and automation to scale, innovate, and stay ahead of the competition.',
  },
  {
    icon: 'users',
    title: 'Leadership',
    description: 'Build strong leaders and high-performance teams that get results.',
  },
  {
    icon: 'trending-up',
    title: 'Business Growth',
    description: 'Proven strategies to grow revenue, increase profit, and scale sustainably.',
  },
  {
    icon: 'megaphone',
    title: 'Marketing & Branding',
    description: 'Build a personal or company brand that attracts attention and drives opportunities.',
  },
  {
    icon: 'brain',
    title: 'Mindset & Performance',
    description: 'Develop the mindset and discipline needed for long-term success.',
  },
] as const

export const keynotes = [
  {
    title: 'The AI Advantage',
    description: 'How AI is transforming businesses and creating unprecedented opportunities.',
  },
  {
    title: 'Build a Future-Proof Business',
    description: 'Systems, strategies, and models to create a business that thrives in any economy.',
  },
  {
    title: 'Leaders Create Leaders',
    description: 'How to build a culture of ownership, accountability, and high performance.',
  },
  {
    title: 'Personal Brand, Real Impact',
    description: 'Build influence, trust, and opportunities through your personal brand.',
  },
  {
    title: 'The High-Performance Mindset',
    description: 'Master your mindset and daily habits to perform at your highest level.',
  },
] as const

export const workshopFormats = [
  { icon: 'mic', title: 'Keynotes', description: 'High-energy, impactful presentations.' },
  { icon: 'presentation', title: 'Half-Day Workshops', description: 'Deep dives into strategy and execution.' },
  { icon: 'calendar-days', title: 'Full-Day Workshops', description: 'Comprehensive training and interactive sessions.' },
  { icon: 'users', title: 'Executive Offsites', description: 'Custom sessions for leadership teams.' },
  { icon: 'monitor', title: 'Virtual Sessions', description: 'Live online sessions that engage and inspire.' },
] as const

export const eventTypes = [
  'Conference Keynote',
  'Corporate Workshop',
  'Executive Offsite',
  'Virtual Session',
  'Panel or Fireside Chat',
] as const

/** Session types offered on the Booking page. */
export const bookingSessions = [
  {
    icon: 'compass',
    title: 'Strategy Call',
    duration: '45 minutes',
    price: 'Complimentary',
    description:
      'A focused working session to map your goals, surface the real bottleneck, and leave with a clear next move.',
    includes: ['Business & goal audit', 'Bottleneck diagnosis', '90-day priority plan'],
    featured: false,
  },
  {
    icon: 'cpu',
    title: 'AI Implementation Sprint',
    duration: '4 weeks',
    price: 'From $6,500',
    description:
      'We pick the highest-leverage workflow in your business and ship a working AI system end to end.',
    includes: [
      'Workflow discovery & scoping',
      'Build, integrate and test',
      'Team training & handover',
      'Two follow-up optimisation calls',
    ],
    featured: true,
  },
  {
    icon: 'user-check',
    title: 'Private Coaching',
    duration: '6 months',
    price: 'By application',
    description:
      'Ongoing 1-on-1 partnership for founders scaling past seven figures — strategy, systems and accountability.',
    includes: ['Twice-monthly sessions', 'Direct async access', 'Quarterly planning intensives'],
    featured: false,
  },
] as const

export const bookingSteps = [
  { step: '01', title: 'Submit your request', description: 'Tell me about your business, your goals and your timeline.' },
  { step: '02', title: 'Get a reply in 24 hours', description: 'My team reviews every request personally — no bots, no queues.' },
  { step: '03', title: 'Pick your slot', description: 'Choose a time that works and receive a short prep brief.' },
  { step: '04', title: 'Leave with a plan', description: 'Every session ends with written next actions you own.' },
] as const

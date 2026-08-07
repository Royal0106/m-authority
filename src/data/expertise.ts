/** Content model for the Expertise page. */

export const expertiseHero = {
  eyebrow: 'My Expertise',
  title: 'Strategy. Systems.',
  titleAccent: 'Results',
  titleRest: 'That Last.',
  body: 'I help men and organizations leverage strategy, systems, and technology to achieve extraordinary results and build a life and business with freedom, impact, and purpose.',
  stats: [
    { value: '20+', label: 'Years of Experience' },
    { value: '500+', label: 'Clients Served' },
    { value: '1000+', label: 'Articles & Guides' },
  ],
} as const

export const expertiseAreas = [
  { icon: 'cpu', title: 'AI', description: 'Implement AI tools and strategies that drive real business transformation.' },
  { icon: 'workflow', title: 'Automation', description: 'Build automated systems that save time, reduce costs, and scale results.' },
  { icon: 'users', title: 'Leadership', description: 'Develop leadership skills and mindsets that inspire teams and drive growth.' },
  { icon: 'megaphone', title: 'Marketing', description: 'Create marketing strategies that attract, engage, and convert.' },
  { icon: 'trending-up', title: 'Business Growth', description: 'Design growth strategies that increase profit, impact, and value.' },
  { icon: 'timer', title: 'Productivity', description: 'Master productivity systems to achieve more with focus and clarity.' },
  { icon: 'badge-check', title: 'Personal Branding', description: 'Build a personal brand that opens doors and creates opportunities.' },
] as const

export const featuredTopics = [
  { title: 'AI Strategy', description: 'Leverage AI to create competitive advantage.' },
  { title: 'Business Systems', description: 'Build systems that create freedom and scalability.' },
  { title: 'High-Performance Teams', description: 'Build, lead, and scale elite teams.' },
  { title: 'Content & Personal Brand', description: 'Build authority and influence in your market.' },
  { title: 'Mindset & Habits', description: 'Master your mind. Transform your life.' },
  { title: 'Financial Freedom', description: 'Strategies to build wealth and financial independence.' },
] as const

export const process = [
  { step: '01', title: 'Discover', description: 'We dive deep into your goals, challenges, and current situation.' },
  { step: '02', title: 'Strategize', description: 'We create a customized strategy tailored to your goals and resources.' },
  { step: '03', title: 'Implement', description: 'We put the plan into action with precision and accountability.' },
  { step: '04', title: 'Optimize', description: 'We refine and optimize systems for maximum efficiency and impact.' },
  { step: '05', title: 'Scale', description: 'We scale what works and create long-term sustainable growth.' },
] as const

export const caseStudies = [
  {
    client: 'E-Commerce Brand',
    result: 'Increased revenue by 345% in 12 months.',
    tags: ['Strategy', 'Automation'],
  },
  {
    client: 'Coaching Business',
    result: 'Scaled from 6 to 7 figures in 18 months.',
    tags: ['Marketing', 'Systems'],
  },
  {
    client: 'SaaS Company',
    result: 'Reduced customer acquisition cost by 62%.',
    tags: ['Growth', 'AI Strategy'],
  },
  {
    client: 'Personal Brand',
    result: 'Grew audience to 500K+ and increased product sales 4x.',
    tags: ['Branding', 'Content'],
  },
] as const

export const industries = [
  { icon: 'monitor', name: 'Technology' },
  { icon: 'shopping-cart', name: 'E-Commerce' },
  { icon: 'landmark', name: 'Finance' },
  { icon: 'cloud', name: 'SaaS' },
  { icon: 'heart-pulse', name: 'Healthcare' },
  { icon: 'graduation-cap', name: 'Education' },
  { icon: 'handshake', name: 'Coaching' },
  { icon: 'building-2', name: 'Real Estate' },
] as const

export const impactStats = [
  { value: '500+', label: 'Clients Served' },
  { value: '1000+', label: 'Projects Completed' },
  { value: '20+', label: 'Years of Experience' },
  { value: '$100M+', label: 'Generated for Clients' },
  { value: '50+', label: 'Countries Impacted' },
] as const

/**
 * Static site configuration.
 *
 * Frontend-only: every value here is mock content. Swap this module for an API
 * / CMS response later without touching a single component.
 */

export const site = {
  name: 'Man Authority',
  tagline: 'Be the best version of you',
  founder: 'Brian Hanson',
  founderRole: 'Business Strategist, AI Consultant & Content Creator',
  description:
    'Helping men become stronger, smarter and more confident through expert advice, practical tips and quality content.',
  url: 'https://www.manauthority.com',
  domain: 'www.manauthority.com',
  copyright: '© 2024 Man Authority. All Rights Reserved.',
  legalUpdated: '2024-05-16',
  announcement: {
    label: 'NEW',
    text: 'The Ultimate Morning Routine Guide for High Performers',
    href: '/newsletter',
  },
  contact: {
    email: 'hello@manauthority.com',
    phone: '+1 (512) 123-4567',
    phoneHours: 'Mon - Fri, 9AM - 6PM CST',
    city: 'Austin, Texas, USA',
    street: '10900 Stonelake Blvd, Suite 200',
    region: 'Austin, TX 78759',
    addressLine: '10900 Stonelake Blvd, Suite 200, Austin, TX 78759, USA',
    hours: [
      { days: 'Monday - Friday', time: '9AM - 6PM CST' },
      { days: 'Saturday - Sunday', time: 'Closed' },
    ],
  },
  socials: [
    { name: 'Facebook', handle: '@manauthority', href: 'https://facebook.com/manauthority', icon: 'facebook' },
    { name: 'Instagram', handle: '@manauthority', href: 'https://instagram.com/manauthority', icon: 'instagram' },
    { name: 'YouTube', handle: '@manauthority', href: 'https://youtube.com/@manauthority', icon: 'youtube' },
    { name: 'LinkedIn', handle: '/man-authority', href: 'https://linkedin.com/in/man-authority', icon: 'linkedin' },
    { name: 'X (Twitter)', handle: '@manauthority', href: 'https://x.com/manauthority', icon: 'twitter' },
  ],
} as const

export type SocialIcon = (typeof site.socials)[number]['icon']

/** Department inboxes shown on the Contact page. */
export const contactChannels = [
  {
    icon: 'mail',
    title: 'General Inquiries',
    description: 'Questions about content, collaborations, or partnerships.',
    email: 'hello@manauthority.com',
  },
  {
    icon: 'briefcase',
    title: 'Work With Me',
    description: 'Interested in consulting, coaching, or strategy.',
    email: 'work@manauthority.com',
  },
  {
    icon: 'mic',
    title: 'Speaking Requests',
    description: 'Book me for your next event or conference.',
    email: 'speaking@manauthority.com',
  },
  {
    icon: 'users',
    title: 'Partnerships',
    description: 'Explore brand partnerships and sponsorships.',
    email: 'partners@manauthority.com',
  },
  {
    icon: 'headset',
    title: 'Support',
    description: 'Need help with something? We’re here for you.',
    email: 'support@manauthority.com',
  },
] as const

/** Trust badges rendered beneath the Contact hero. */
export const contactAssurances = [
  { title: 'Quick Response', description: 'We reply within 24 hours' },
  { title: 'Real People', description: 'Talk to our actual team' },
  { title: 'Confidential', description: 'Your info is always safe' },
  { title: 'Global Support', description: 'We work worldwide' },
] as const

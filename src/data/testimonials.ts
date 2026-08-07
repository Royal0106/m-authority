/** Shared testimonial pool. Each page selects the slice it renders. */

export type Testimonial = {
  quote: string
  name: string
  role: string
  rating?: number
}

export const homeTestimonials: Array<Testimonial> = [
  {
    quote: 'Brian transformed our business with AI systems that saved us over 20 hours a week.',
    name: 'Sarah J.',
    role: 'CEO, Creative Agency',
  },
  {
    quote: 'His strategies are practical, powerful, and deliver real results.',
    name: 'James T.',
    role: 'Entrepreneur',
  },
  {
    quote: 'The clarity and systems Brian provided gave us our life back and more profit.',
    name: 'Lisa M.',
    role: 'Online Business Owner',
  },
  {
    quote: 'Best investment we’ve made. The AI strategies are simple, powerful, and scalable.',
    name: 'David R.',
    role: 'E-Commerce Founder',
  },
]

export const aboutTestimonials: Array<Testimonial> = [
  {
    quote:
      'Man Authority is my go-to resource for leveling up in every area of life. The content is real, actionable, and inspiring.',
    name: 'Alex K.',
    role: 'Entrepreneur',
    rating: 5,
  },
  {
    quote:
      'Brian breaks down complex topics into simple, practical steps that anyone can implement. Highly recommend!',
    name: 'Michael R.',
    role: 'Business Owner',
    rating: 5,
  },
  {
    quote:
      'The advice here has not only improved my business but also my mindset and relationships.',
    name: 'David L.',
    role: 'Marketing Director',
    rating: 5,
  },
]

export const expertiseTestimonials: Array<Testimonial> = [
  {
    quote:
      'Brian’s insights on strategy, systems, and AI helped us scale faster than we ever thought possible.',
    name: 'Sarah J.',
    role: 'Founder, Elevate Co.',
    rating: 5,
  },
  {
    quote:
      'His ability to simplify complex ideas and create actionable plans is unmatched. Highly recommend!',
    name: 'James R.',
    role: 'CEO, ScaleForce',
    rating: 5,
  },
  {
    quote:
      'Working with Brian changed the trajectory of my business and my life. Incredible results.',
    name: 'David K.',
    role: 'Entrepreneur',
    rating: 5,
  },
]

export const aiTestimonials: Array<Testimonial> = [
  {
    quote: 'Brian’s AI strategies transformed our operations. We saved hundreds of hours and saw incredible growth.',
    name: 'Michael R.',
    role: 'CEO, TechFlow',
  },
  {
    quote: 'He doesn’t just talk AI—he delivers real solutions that drive measurable results.',
    name: 'Sarah L.',
    role: 'Founder, Elevate Co.',
  },
  {
    quote: 'Our entire workflow changed. We’re more efficient, more profitable, and ready to scale.',
    name: 'David K.',
    role: 'COO, GrowthLab',
  },
  {
    quote: 'The best investment we’ve made. AI is no longer overwhelming—it’s our competitive advantage.',
    name: 'James T.',
    role: 'CEO, NextLevel',
  },
]

export const featuredQuote = {
  quote:
    'Brian’s strategies and systems completely transformed our business. We achieved more in 12 months than we did in the previous 3 years.',
  name: 'Michael T.',
  role: 'CEO, GrowthLab',
}

export const pressQuote = {
  quote: 'Brian’s strategies have completely transformed our business. His insights on AI and marketing are pure gold.',
  name: 'James T.',
  role: 'CEO, GrowthMode',
}

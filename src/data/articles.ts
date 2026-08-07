/**
 * Mock article store.
 *
 * Shaped like a CMS payload so the query helpers at the bottom of this file can
 * be swapped for real `fetch` calls (or TanStack Router loaders) without any
 * component changes.
 */

export type Author = {
  name: string
  role: string
  bio?: string
}

export type ArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; id: string }
  | { type: 'quote'; text: string; attribution: string }
  | { type: 'image'; caption?: string; seed: string }
  | { type: 'list'; items: Array<string> }

export type Article = {
  slug: string
  title: string
  excerpt: string
  category: string
  author: Author
  date: string
  readTime: number
  tags: Array<string>
  featured?: boolean
  editorsPick?: boolean
  popularRank?: number
  /** Optional long-form body. Articles without one fall back to a generic body. */
  body?: Array<ArticleBlock>
}

export const categoryLabels: Record<string, string> = {
  fitness: 'Fitness',
  style: 'Style',
  success: 'Success',
  grooming: 'Grooming',
  relationships: 'Relationships',
  gear: 'Gear',
  'ai-for-business': 'AI For Business',
  leadership: 'Leadership',
  productivity: 'Productivity',
  mindset: 'Mindset',
}

export const popularTags = [
  'Mindset',
  'Productivity',
  'Leadership',
  'Business',
  'Fitness',
  'Nutrition',
  'Style',
  'AI',
  'Marketing',
  'Success',
  'Motivation',
  'Wealth',
  'Grooming',
  'Confidence',
]

const brian: Author = {
  name: 'Brian Hanson',
  role: 'Business Strategist, AI Consultant & Content Creator',
  bio: 'Business Strategist, AI Consultant, and Content Creator. I help men and organizations leverage strategy, systems, and technology to achieve extraordinary results.',
}

const authors = {
  brian,
  mike: { name: 'Mike Anderson', role: 'Strength Coach' },
  jason: { name: 'Jason Stone', role: 'Wealth Writer' },
  alex: { name: 'Alex Thomas', role: 'Style Editor' },
  daniel: { name: 'Daniel K.', role: 'Grooming Editor' },
  mark: { name: 'Mark Mitchell', role: 'Relationships Writer' },
} satisfies Record<string, Author>

/** Long-form body for the flagship article. */
const systemsBody: Array<ArticleBlock> = [
  {
    type: 'paragraph',
    text: "Success isn't random. It's built on repeatable systems that compound over time. Here are the 7 core systems top performers rely on every single day.",
  },
  { type: 'heading', id: 'power-of-systems', text: '1. The Power of Systems' },
  {
    type: 'paragraph',
    text: 'Goals are good. Systems are better. While goals give you direction, systems create momentum. Top performers focus on building systems that make success inevitable.',
  },
  {
    type: 'quote',
    text: 'You do not rise to the level of your goals. You fall to the level of your systems.',
    attribution: 'James Clear',
  },
  { type: 'heading', id: 'morning-routine', text: '2. Morning Routine Architecture' },
  {
    type: 'paragraph',
    text: 'How you start your day sets the tone for everything that follows. A powerful morning routine primes your mind, fuels your body, and focuses your energy.',
  },
  { type: 'image', seed: 'article-morning-routine', caption: 'Design the first hour and the rest follows.' },
  { type: 'heading', id: 'focus', text: '3. Focus in a Distracted World' },
  {
    type: 'paragraph',
    text: 'Distraction is the enemy of progress. Top performers protect their focus by eliminating noise, setting boundaries, and working in deep, intentional blocks.',
  },
  { type: 'heading', id: 'energy', text: '4. Energy Management' },
  {
    type: 'paragraph',
    text: "Your energy—not your time—is your most valuable resource. Sleep, nutrition, and movement aren't optional; they're performance multipliers.",
  },
  { type: 'heading', id: 'decisions', text: '5. Decision-Making Frameworks' },
  {
    type: 'paragraph',
    text: 'Reduce decision fatigue by using frameworks and defaults. The best decisions are often simpler when built on proven models.',
  },
  { type: 'heading', id: 'learning', text: '6. Continuous Learning' },
  {
    type: 'paragraph',
    text: 'Top performers never stop being students. They read, listen, observe, and apply what they learn every day.',
  },
  { type: 'heading', id: 'evening-review', text: '7. Evening Reviews & Planning' },
  {
    type: 'paragraph',
    text: 'End your day with clarity. Review your wins, lessons, and set your top priorities for tomorrow.',
  },
  { type: 'heading', id: 'conclusion', text: 'Conclusion' },
  {
    type: 'paragraph',
    text: "Master these 7 systems, and you'll not only achieve more—you'll become the kind of person who consistently wins.",
  },
]

export const articles: Array<Article> = [
  {
    slug: 'the-7-systems-top-performers-use-every-single-day',
    title: 'The 7 Systems Top Performers Use Every Single Day',
    excerpt:
      'Discover the daily systems, habits, and strategies that separate the top 1% from everyone else.',
    category: 'success',
    author: authors.brian,
    date: '2024-05-16',
    readTime: 8,
    tags: ['Success', 'Mindset', 'Productivity'],
    featured: true,
    body: systemsBody,
  },
  {
    slug: 'build-strength-build-confidence',
    title: 'Build Strength, Build Confidence',
    excerpt:
      'Why the barbell is the fastest route to self-belief — and how to program your first twelve weeks.',
    category: 'fitness',
    author: authors.mike,
    date: '2024-05-15',
    readTime: 6,
    tags: ['Fitness', 'Confidence'],
  },
  {
    slug: 'classic-style-rules-that-never-go-out-of-fashion',
    title: 'Classic Style Rules That Never Go Out of Fashion',
    excerpt: 'Fit, proportion and restraint. The three rules that outlast every trend cycle.',
    category: 'style',
    author: authors.alex,
    date: '2024-05-12',
    readTime: 5,
    tags: ['Style'],
  },
  {
    slug: 'how-ai-can-save-you-10-hours-every-week',
    title: 'How AI Can Save You 10+ Hours Every Week',
    excerpt:
      'The five workflows worth automating first, and the ones you should absolutely keep human.',
    category: 'ai-for-business',
    author: authors.brian,
    date: '2024-05-10',
    readTime: 7,
    tags: ['AI', 'Business', 'Productivity'],
  },
  {
    slug: 'the-best-skincare-routine-for-men-over-30',
    title: 'The Best Skincare Routine for Men Over 30',
    excerpt: 'Four products, five minutes a day, and the difference shows within a month.',
    category: 'grooming',
    author: authors.alex,
    date: '2024-05-17',
    readTime: 6,
    tags: ['Grooming'],
  },
  {
    slug: 'how-to-stay-focused-in-a-world-of-distractions',
    title: 'How to Stay Focused in a World of Distractions',
    excerpt: 'Attention is the new currency. Here is how to stop spending yours by accident.',
    category: 'success',
    author: authors.jason,
    date: '2024-05-16',
    readTime: 5,
    tags: ['Productivity', 'Mindset'],
  },
  {
    slug: '3-conversations-that-strengthen-any-relationship',
    title: '3 Conversations That Strengthen Any Relationship',
    excerpt: 'The scripts most men avoid — and the trust they unlock when you finally have them.',
    category: 'relationships',
    author: authors.mark,
    date: '2024-05-15',
    readTime: 6,
    tags: ['Relationships'],
  },
  {
    slug: 'edc-essentials-every-man-should-carry',
    title: 'EDC Essentials Every Man Should Carry',
    excerpt: 'Seven pieces that earn their place in your pockets every single day.',
    category: 'gear',
    author: authors.daniel,
    date: '2024-05-14',
    readTime: 4,
    tags: ['Gear'],
  },
  {
    slug: '7-strength-training-mistakes-that-are-holding-you-back',
    title: '7 Strength Training Mistakes That Are Holding You Back',
    excerpt: 'Avoid common gym mistakes and start seeing real results.',
    category: 'fitness',
    author: authors.mike,
    date: '2024-05-20',
    readTime: 5,
    tags: ['Fitness'],
  },
  {
    slug: 'how-to-build-multiple-income-streams-in-2024',
    title: 'How to Build Multiple Income Streams in 2024',
    excerpt: 'Step-by-step guide to financial freedom and wealth building.',
    category: 'success',
    author: authors.jason,
    date: '2024-05-19',
    readTime: 6,
    tags: ['Wealth', 'Business'],
  },
  {
    slug: '10-timeless-style-essentials-every-man-should-own',
    title: '10 Timeless Style Essentials Every Man Should Own',
    excerpt: 'Classic pieces that never go out of style.',
    category: 'style',
    author: authors.alex,
    date: '2024-05-18',
    readTime: 4,
    tags: ['Style'],
  },
  {
    slug: 'the-ultimate-skincare-routine-for-men',
    title: 'The Ultimate Skincare Routine for Men',
    excerpt: 'Simple steps for healthy, confident skin.',
    category: 'grooming',
    author: authors.daniel,
    date: '2024-05-17',
    readTime: 4,
    tags: ['Grooming'],
  },
  {
    slug: 'the-morning-routine-of-highly-successful-men',
    title: 'The Morning Routine of Highly Successful Men',
    excerpt: 'The first ninety minutes decide the other fifteen hours.',
    category: 'success',
    author: authors.brian,
    date: '2024-04-28',
    readTime: 9,
    tags: ['Mindset', 'Productivity'],
    popularRank: 1,
  },
  {
    slug: 'how-to-build-a-personal-brand-that-opens-doors',
    title: 'How to Build a Personal Brand That Opens Doors',
    excerpt: 'Authority is built in public. A practical playbook for going from unknown to obvious.',
    category: 'success',
    author: authors.brian,
    date: '2024-04-25',
    readTime: 7,
    tags: ['Marketing', 'Business'],
    popularRank: 2,
  },
  {
    slug: '10-style-upgrades-that-instantly-improve-your-look',
    title: '10 Style Upgrades That Instantly Improve Your Look',
    excerpt: 'Small, cheap changes with an outsized return on first impressions.',
    category: 'style',
    author: authors.alex,
    date: '2024-04-20',
    readTime: 6,
    tags: ['Style', 'Confidence'],
    popularRank: 3,
  },
  {
    slug: 'mindset-habits-that-will-change-your-life',
    title: 'Mindset Habits That Will Change Your Life',
    excerpt: 'Nine mental defaults worth installing before you touch your calendar.',
    category: 'mindset',
    author: authors.brian,
    date: '2024-04-18',
    readTime: 8,
    tags: ['Mindset', 'Motivation'],
    popularRank: 4,
  },
  {
    slug: 'the-ultimate-guide-to-building-muscle-after-40',
    title: 'The Ultimate Guide to Building Muscle After 40',
    excerpt: 'Recovery becomes the program. Train accordingly and keep growing.',
    category: 'fitness',
    author: authors.mike,
    date: '2024-04-15',
    readTime: 7,
    tags: ['Fitness', 'Nutrition'],
    popularRank: 5,
  },
  {
    slug: 'the-future-of-work-how-ai-will-transform-your-business',
    title: 'The Future of Work: How AI Will Transform Your Business',
    excerpt: 'What changes in the next 24 months, and what stays exactly the same.',
    category: 'ai-for-business',
    author: authors.brian,
    date: '2024-05-08',
    readTime: 8,
    tags: ['AI', 'Business'],
    editorsPick: true,
  },
  {
    slug: 'the-compound-effect-small-wins-big-results',
    title: 'The Compound Effect: Small Wins, Big Results',
    excerpt: 'Why one per cent a day beats a heroic weekend, every time.',
    category: 'success',
    author: authors.brian,
    date: '2024-05-14',
    readTime: 6,
    tags: ['Success', 'Mindset'],
    editorsPick: true,
  },
  {
    slug: 'lead-with-clarity-inspire-with-purpose',
    title: 'Lead With Clarity, Inspire With Purpose',
    excerpt: 'Clear beats clever. How the best leaders remove ambiguity from a room.',
    category: 'leadership',
    author: authors.brian,
    date: '2024-05-08',
    readTime: 7,
    tags: ['Leadership'],
    editorsPick: true,
  },
  {
    slug: 'time-management-strategies-that-actually-work',
    title: 'Time Management Strategies That Actually Work',
    excerpt: 'Ditch the productivity theatre. Four strategies that survive a real calendar.',
    category: 'productivity',
    author: authors.jason,
    date: '2024-05-06',
    readTime: 5,
    tags: ['Productivity'],
    editorsPick: true,
  },
  {
    slug: 'the-5-characteristics-of-great-leaders',
    title: 'The 5 Characteristics of Great Leaders',
    excerpt: 'What separates people others follow from people who merely hold the title.',
    category: 'leadership',
    author: authors.brian,
    date: '2024-05-09',
    readTime: 6,
    tags: ['Leadership'],
  },
  {
    slug: 'time-blocking-the-ultimate-guide',
    title: 'Time Blocking: The Ultimate Guide',
    excerpt: 'Give every hour a job before the week gives it one for you.',
    category: 'productivity',
    author: authors.jason,
    date: '2024-05-06',
    readTime: 5,
    tags: ['Productivity'],
  },
  {
    slug: 'how-to-develop-an-unstoppable-mindset',
    title: 'How to Develop an Unstoppable Mindset',
    excerpt: 'Resilience is a skill. Here is the training plan.',
    category: 'mindset',
    author: authors.brian,
    date: '2024-05-02',
    readTime: 8,
    tags: ['Mindset', 'Motivation'],
  },
  {
    slug: '10-productivity-habits-that-actually-work',
    title: '10 Productivity Habits That Actually Work',
    excerpt: 'Tested against real deadlines, not blog posts.',
    category: 'productivity',
    author: authors.jason,
    date: '2024-05-10',
    readTime: 5,
    tags: ['Productivity'],
  },
]

/** Generic body used by articles that ship without bespoke copy. */
export function fallbackBody(article: Article): Array<ArticleBlock> {
  return [
    { type: 'paragraph', text: article.excerpt },
    { type: 'heading', id: 'why-it-matters', text: 'Why this matters' },
    {
      type: 'paragraph',
      text: 'Most advice fails because it ignores constraints — time, energy, and the life you actually live. Everything below is written to survive a real week.',
    },
    {
      type: 'list',
      items: [
        'Start with the smallest version that still counts.',
        'Attach the new behaviour to something you already do.',
        'Measure weekly, not daily — trends beat noise.',
      ],
    },
    { type: 'heading', id: 'how-to-apply-it', text: 'How to apply it' },
    {
      type: 'paragraph',
      text: 'Pick one idea from this piece and run it for fourteen days before adding anything else. Compounding needs a starting point far more than it needs a perfect plan.',
    },
    { type: 'heading', id: 'conclusion', text: 'Conclusion' },
    {
      type: 'paragraph',
      text: 'Consistency, not intensity, is what separates the men who talk about change from the men who live it.',
    },
  ]
}

export type Comment = {
  id: string
  author: string
  date: string
  time: string
  body: string
  likes: number
}

export const comments: Array<Comment> = [
  {
    id: 'c1',
    author: 'Michael T.',
    date: '2024-05-16',
    time: '9:32 AM',
    body: 'This is gold. The systems you shared here are exactly what most people overlook. Implementing these changed my life.',
    likes: 12,
  },
  {
    id: 'c2',
    author: 'David L.',
    date: '2024-05-16',
    time: '11:05 AM',
    body: 'The evening review is the one I always skip. Started last week and my mornings are unrecognisable.',
    likes: 7,
  },
  {
    id: 'c3',
    author: 'James R.',
    date: '2024-05-17',
    time: '8:14 AM',
    body: 'Energy management over time management — that reframe alone was worth the read.',
    likes: 5,
  },
]

export const commentCount = 24

/* -------------------------------------------------------------------------- */
/*  Query helpers — the seam where a real API would slot in                     */
/* -------------------------------------------------------------------------- */

const byDateDesc = (a: Article, b: Article) => (a.date < b.date ? 1 : -1)

export function getFeaturedArticle() {
  return articles.find((article) => article.featured) ?? articles[0]
}

export function getLatestArticles(limit = 4) {
  return [...articles].sort(byDateDesc).slice(0, limit)
}

export function getPopularArticles(limit = 5) {
  return articles
    .filter((article) => article.popularRank)
    .sort((a, b) => (a.popularRank ?? 99) - (b.popularRank ?? 99))
    .slice(0, limit)
}

export function getEditorsPicks(limit = 4) {
  return articles.filter((article) => article.editorsPick).slice(0, limit)
}

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug)
}

export function getRelatedArticles(slug: string, limit = 4) {
  const current = getArticleBySlug(slug)
  if (!current) return getLatestArticles(limit)
  const sameCategory = articles.filter(
    (article) => article.slug !== slug && article.category === current.category,
  )
  const rest = articles.filter(
    (article) => article.slug !== slug && article.category !== current.category,
  )
  return [...sameCategory, ...rest].slice(0, limit)
}

export type ArticleQuery = {
  category?: string
  q?: string
  tag?: string
  page?: number
  perPage?: number
}

/** In-memory search + filter + pagination, mirroring a list endpoint. */
export function queryArticles({
  category,
  q,
  tag,
  page = 1,
  perPage = 9,
}: ArticleQuery) {
  const term = q?.trim().toLowerCase()

  const filtered = articles
    .filter((article) => (category ? article.category === category : true))
    .filter((article) =>
      tag ? article.tags.some((value) => value.toLowerCase() === tag.toLowerCase()) : true,
    )
    .filter((article) =>
      term
        ? article.title.toLowerCase().includes(term) ||
          article.excerpt.toLowerCase().includes(term) ||
          article.tags.some((value) => value.toLowerCase().includes(term))
        : true,
    )
    .sort(byDateDesc)

  // The design shows 20 pages of archive; pad the count so pagination is
  // representative while the mock store stays small.
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const safePage = Math.min(Math.max(1, page), totalPages)

  return {
    items: filtered.slice((safePage - 1) * perPage, safePage * perPage),
    total: filtered.length,
    page: safePage,
    totalPages,
  }
}

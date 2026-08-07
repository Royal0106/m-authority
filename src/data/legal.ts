/** Numbered legal sections rendered by the Terms and Privacy pages. */

export type LegalSection = {
  icon: string
  title: string
  paragraphs: Array<string>
  bullets?: Array<string>
  /** Renders the contact block instead of prose. */
  contact?: boolean
}

export const termsSections: Array<LegalSection> = [
  {
    icon: 'info',
    title: 'Introduction',
    paragraphs: [
      'Welcome to Man Authority. By accessing or using our website, content, products, or services, you agree to be bound by these Terms of Service and all applicable laws and regulations.',
      'If you do not agree with any part of these Terms, you must not use our website or services.',
    ],
  },
  {
    icon: 'monitor',
    title: 'Website Usage',
    paragraphs: [
      'Our website is provided for informational and educational purposes only. We reserve the right to modify, suspend, or discontinue any part of the website or services at any time without prior notice. We do not guarantee that the website will be error-free, secure, or available at all times.',
    ],
  },
  {
    icon: 'user-check',
    title: 'User Responsibilities',
    paragraphs: [
      'You agree to use this website only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else’s use of the website. You must not use the site to:',
    ],
    bullets: [
      'Post or transmit any harmful, unlawful, or misleading content',
      'Attempt to gain unauthorized access to any part of the website or systems',
      'Interfere with the website’s functionality or security',
    ],
  },
  {
    icon: 'copyright',
    title: 'Intellectual Property',
    paragraphs: [
      'All content on this website, including text, graphics, logos, images, videos, and software, is the property of Man Authority or its content suppliers and is protected by copyright, trademark, and other intellectual property laws. You may not copy, reproduce, distribute, or create derivative works without our prior written consent.',
    ],
  },
  {
    icon: 'shield-alert',
    title: 'Liability',
    paragraphs: [
      'Man Authority and its team are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of or inability to use our website or services. All information is provided “as is” without warranty of any kind.',
    ],
  },
  {
    icon: 'circle-x',
    title: 'Termination',
    paragraphs: [
      'We reserve the right to terminate or restrict your access to our website or services at our sole discretion, without notice or liability, for any reason—including if we believe you have violated these Terms.',
    ],
  },
  {
    icon: 'scale',
    title: 'Governing Law',
    paragraphs: [
      'These Terms shall be governed by and construed in accordance with the laws of the State of Texas, United States, without regard to its conflict of law principles. Any disputes arising from these Terms shall be resolved in the state or federal courts located in Austin, Texas.',
    ],
  },
  {
    icon: 'mail',
    title: 'Contact',
    paragraphs: ['If you have any questions about these Terms of Service, please contact us:'],
    contact: true,
  },
]

export const privacySections: Array<LegalSection> = [
  {
    icon: 'info',
    title: 'Introduction',
    paragraphs: [
      'This Privacy Policy explains how Man Authority collects, uses, and protects your personal information when you use our website, subscribe to our newsletter, or contact us.',
      'By using our website you consent to the practices described in this policy.',
    ],
  },
  {
    icon: 'database',
    title: 'Information We Collect',
    paragraphs: ['We collect only what we need to run the site and stay in touch with you:'],
    bullets: [
      'Contact details you submit — name, email address, company and message',
      'Usage data such as pages visited, referring source and approximate location',
      'Technical data including browser type, device and IP address',
    ],
  },
  {
    icon: 'settings',
    title: 'How We Use Your Information',
    paragraphs: [
      'Your information is used to respond to enquiries, deliver the newsletter and requested resources, improve our content, and keep the website secure. We do not use your data to make automated decisions about you.',
    ],
  },
  {
    icon: 'cookie',
    title: 'Cookies & Tracking',
    paragraphs: [
      'We use essential cookies to operate the site and optional analytics cookies to understand which content is useful. You can refuse non-essential cookies at any time through your browser settings without losing access to the site.',
    ],
  },
  {
    icon: 'share-2',
    title: 'Sharing & Third Parties',
    paragraphs: [
      'We never sell your personal information. We share data only with service providers who help us operate the website — such as email delivery and analytics platforms — and only to the extent required to provide that service.',
    ],
  },
  {
    icon: 'lock',
    title: 'Data Security & Retention',
    paragraphs: [
      'We apply appropriate technical and organisational measures to protect your information, and we retain it only as long as necessary for the purpose it was collected or as required by law.',
    ],
  },
  {
    icon: 'user-check',
    title: 'Your Rights',
    paragraphs: ['Depending on where you live, you may have the right to:'],
    bullets: [
      'Access the personal information we hold about you',
      'Request correction or deletion of your information',
      'Object to or restrict certain processing',
      'Withdraw consent and unsubscribe at any time',
    ],
  },
  {
    icon: 'mail',
    title: 'Contact',
    paragraphs: ['If you have any questions about this Privacy Policy, please contact us:'],
    contact: true,
  },
]

import type { IconMap, SocialLink, Site, ExperienceItem } from '@/types'

export const SITE: Site = {
  title: 'Yash-dot-dev',
  description:
    'Portfolio of Yash Srivastava',
  href: 'https://wordsofyash.vercel.app/',
  author: 'Yash',
  locale: 'en-US',
  featuredPostCount: 2,
  postsPerPage: 3,
}

export const NAV_LINKS: SocialLink[] = [
  {
    href: '/blog',
    label: 'blog',
  },
  {
    href: '/about',
    label: 'about',
  },
]

export const SOCIAL_LINKS: SocialLink[] = [
  {
    href: 'https://github.com/cr7yash',
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/yash-srivastava-aba296104/',
    label: 'LinkedIn',
  },
  {
    href: 'https://x.com/tweetsofyash89',
    label: 'Twitter',
  },
  {
    href: 'mailto:yashaqua@gmail.com',
    label: 'Email',
  },
  {
    href: 'https://leetcode.com/u/yashaqua/',
    label: 'Leetcode',
  },

]

export const ICON_MAP: IconMap = {
  Website: 'lucide:globe',
  GitHub: 'lucide:github',
  LinkedIn: 'lucide:linkedin',
  Twitter: 'lucide:twitter',
  Email: 'lucide:mail',
  Leetcode: 'leetcode',
}

export const experience: ExperienceItem[] = [
  {
    role: 'Senior Consultant',
    company: 'HCL Technologies Ltd.',
    period: '2021 - 2025',
    current: false,
    icon: 'lucide:circle',
    key: 'Architected and led a 5-engineer team to build an enterprise training portal serving 15,000+ global partners across 20 countries, achieving 99.9% uptime and reducing page load time from 5s to 2s through code splitting and lazy loading optimizations.'
  },
  {
    role: 'Frontend Engineer',
    company: 'Tollring UK',
    period: '2021 - 2021',
    icon: 'lucide:circle',
    key: 'Built a real-time analytics dashboard tracking call center KPIs for 200+ agents using React.js and Python, reducing manager reporting time by 4 hours weekly.'
  },
  {
    role: ' Consultant',
    company: 'Freelance',
    period: '2019 - 2021',
    icon: 'lucide:circle',
    key: 'Delivered 3 end-to-end e-commerce solutions for SMBs using Shopify and custom Javascript integrations, managing their entire workflow.'
  },
  {
    role: 'AI Cognitive Developer',
    company: 'Society Pass Inc.',
    period: '2019 - 2019',
    icon: 'lucide:circle',
    key: 'Built analytics platform processing 1M+ transactions monthly, enabling data-driven decision making for 10+ megamarket locations with real-time sales tracking and loyalty program ROI metrics in Southeast Asia region.'
  },
  {
    role: 'Software Engineer Trainee',
    company: 'VLink India Pvt. Ltd.',
    period: '2018 - 2019',
    icon: 'lucide:circle',
    key: 'Developed and maintained RESTful APIs using Node.js and Express.js • Increased insurance policy purchases by 28% through React.js simplifying the application process from 15 steps to 5.'
    },

]
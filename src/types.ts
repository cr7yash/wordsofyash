export type Site = {
  title: string
  description: string
  href: string
  author: string
  locale: string
  featuredPostCount: number
  featuredProjectCount: number
  postsPerPage: number
}

export type SocialLink = {
  href: string
  label: string
}

export type IconMap = {
  [key: string]: string
}

export type ExperienceItem = {
  role: string
  company: string
  period: string
  current?: boolean
  icon: string
  key: string
}
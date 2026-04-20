export type StackCategory = 'frontend' | 'backend' | 'database' | 'infra' | 'automation'

export interface ProjectStack {
  name: string
  category: StackCategory
}

export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  features: string[]
  url: string
  image?: string
  tags: string[]
  stack: ProjectStack[]
}

export interface Stack {
  name: string
  category: 'language' | 'framework' | 'database' | 'devops' | 'automation'
  icon?: string
}

export interface SocialLink {
  label: string
  url: string
  icon: 'linkedin' | 'instagram' | 'github' | 'email'
}

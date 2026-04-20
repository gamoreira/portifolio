import type { Stack } from '@/types'

export const stacks: Stack[] = [
  { name: 'JavaScript', category: 'language' },
  { name: 'TypeScript', category: 'language' },
  { name: 'PHP', category: 'language' },
  { name: 'React', category: 'framework' },
  { name: 'Node.js', category: 'framework' },
  { name: 'Laravel', category: 'framework' },
  { name: 'MySQL', category: 'database' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'Docker', category: 'devops' },
  { name: 'Linux', category: 'devops' },
  { name: 'Git', category: 'devops' },
  { name: 'GitHub', category: 'devops' },
  { name: 'n8n', category: 'automation' },
  { name: 'Google Sheets', category: 'automation' },
  { name: 'Google Docs', category: 'automation' },
  { name: 'Gmail', category: 'automation' },
  { name: 'WhatsApp API', category: 'automation' },
  { name: 'Webhooks', category: 'automation' },
  { name: 'REST APIs', category: 'automation' },
  { name: 'Telegram', category: 'automation' },
  { name: 'Banco de Dados', category: 'automation' },
]

export const categoryLabel: Record<Stack['category'], string> = {
  language: 'Linguagens',
  framework: 'Frameworks & Libs',
  database: 'Banco de Dados',
  devops: 'DevOps & Infra',
  automation: 'Automação',
}

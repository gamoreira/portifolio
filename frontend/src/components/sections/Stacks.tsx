import { stacks, categoryLabel } from '@/data/stacks'
import type { Stack } from '@/types'
import SectionHeader from '@/components/ui/SectionHeader'

const categoryClass: Record<Stack['category'], string> = {
  language: 'cat-lang',
  framework: 'cat-fw',
  database: 'cat-db',
  devops: 'cat-ops',
  automation: 'cat-auto',
}

const groupedStacks = (Object.keys(categoryLabel) as Stack['category'][]).map((category) => ({
  category,
  label: categoryLabel[category],
  items: stacks.filter((stack) => stack.category === category),
}))

export default function Stacks() {
  return (
    <section id="stacks" className="section-shell">
      <div className="wrap">
        <SectionHeader
          eyebrow="Stacks"
          title="Ferramentas que uso para entregar."
          index="// 02 - TECNOLOGIAS"
        />

        <div className="stack-grid">
          {groupedStacks.map(({ category, label, items }, index) => (
            <div
              className={`stack-card reveal ${category === 'automation' ? 'wide d2' : index % 2 ? 'd1' : ''} ${categoryClass[category]}`}
              key={category}
            >
              <div className="sc-h">
                <span className={`t ${categoryClass[category]}`}>{label}</span>
                <span className="num">{String(items.length).padStart(2, '0')}</span>
              </div>
              <div className={`chips ${categoryClass[category]}`}>
                {items.map((stack) => <span className="chip" key={stack.name}>{stack.name}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

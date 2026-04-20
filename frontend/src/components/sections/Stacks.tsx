import { stacks, categoryLabel } from '@/data/stacks'
import type { Stack } from '@/types'

const categoryColors: Record<Stack['category'], string> = {
  language: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  framework: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  database: 'bg-green-500/10 text-green-400 border-green-500/20',
  devops: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  automation: 'bg-brand-500/10 text-brand-500 border-brand-500/20',
}

const categoryBorder: Record<Stack['category'], string> = {
  language: 'border-blue-500/20',
  framework: 'border-purple-500/20',
  database: 'border-green-500/20',
  devops: 'border-orange-500/20',
  automation: 'border-brand-500/20',
}

const categoryHeading: Record<Stack['category'], string> = {
  language: 'text-blue-400',
  framework: 'text-purple-400',
  database: 'text-green-400',
  devops: 'text-orange-400',
  automation: 'text-brand-500',
}

const groupedStacks = (Object.keys(categoryLabel) as Stack['category'][]).map((cat) => ({
  category: cat,
  label: categoryLabel[cat],
  items: stacks.filter((s) => s.category === cat),
}))

const isOddTotal = groupedStacks.length % 2 !== 0

export default function Stacks() {
  return (
    <section id="stacks">
      <div className="section-container">
        <h2 className="section-title">Stacks</h2>
        <div className="section-divider" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {groupedStacks.map(({ category, label, items }, index) => {
            const isLast = index === groupedStacks.length - 1
            const spanFull = isLast && isOddTotal

            return (
              <div
                key={category}
                className={`bg-dark-800 border ${categoryBorder[category]} rounded-2xl p-6 ${
                  spanFull ? 'md:col-span-2' : ''
                }`}
              >
                <p
                  className={`text-xs font-bold uppercase tracking-widest mb-4 ${categoryHeading[category]}`}
                >
                  {label}
                </p>
                <div className={`flex flex-wrap gap-2 ${spanFull ? 'justify-start' : ''}`}>
                  {items.map((stack) => (
                    <span
                      key={stack.name}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium border ${categoryColors[stack.category]}`}
                    >
                      {stack.name}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

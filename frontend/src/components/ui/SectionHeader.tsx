interface SectionHeaderProps {
  eyebrow: string
  title?: string
  index: string
}

export default function SectionHeader({ eyebrow, title, index }: SectionHeaderProps) {
  return (
    <div className="sec-head reveal">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        {title && <h2>{title}</h2>}
      </div>
      <span className="sec-idx">{index}</span>
    </div>
  )
}

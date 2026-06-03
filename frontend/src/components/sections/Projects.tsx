import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { projects } from '@/data/projects'
import SectionHeader from '@/components/ui/SectionHeader'

const kindByProject: Record<string, string> = {
  'gestao-cobrancas': 'sistema · n8n',
  ivaitec: 'site · institucional',
  gatonews: 'portal · notícias',
  myfreela: 'sistema · gestão',
  tupinambarana: 'portal · jornalismo',
}

export default function Projects() {
  return (
    <section id="projetos" className="section-shell">
      <div className="wrap">
        <SectionHeader
          eyebrow="Projetos"
          title="Últimos projetos."
          index="// 05 - PORTFÓLIO"
        />

        <div className="proj-grid">
          {projects.map((project, index) => (
            <Link
              to={`/projetos/${project.id}`}
              className={`pcard reveal d${Math.min(index, 4)}`}
              key={project.id}
            >
              <div className="shot">
                {project.image && <img src={project.image} alt={project.name} loading="lazy" />}
                <span className="kind">{kindByProject[project.id] ?? 'projeto'}</span>
                <span className="open"><ExternalLink size={16} /></span>
              </div>
              <div className="body">
                <h3>{project.name}</h3>
                <p className="desc">{project.description}</p>
                <div className="ptags">
                  {project.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

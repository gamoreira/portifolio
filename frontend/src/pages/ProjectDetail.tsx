import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Globe, Server, Database, Cloud, Zap } from 'lucide-react'
import { projects } from '@/data/projects'
import type { StackCategory } from '@/types'
import ProjectImage from '@/components/ui/ProjectImage'

const categoryConfig: Record<StackCategory, { label: string; icon: typeof Globe; color: string }> = {
  frontend: { label: 'Frontend', icon: Globe, color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  backend: { label: 'Backend', icon: Server, color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  database: { label: 'Banco de Dados', icon: Database, color: 'bg-green-500/10 text-green-400 border-green-500/20' },
  infra: { label: 'Infra / DevOps', icon: Cloud, color: 'bg-orange-500/10 text-orange-400 border-orange-500/20' },
  automation: { label: 'Automação', icon: Zap, color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
}

const stackOrder: StackCategory[] = ['frontend', 'backend', 'database', 'infra', 'automation']

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[var(--bg-0)] text-[var(--text)]">
        <p className="text-[var(--text-dim)]">Projeto não encontrado.</p>
        <Link to="/" className="text-[var(--accent)] hover:underline text-sm">← Voltar ao início</Link>
      </div>
    )
  }

  const groupedStack = stackOrder
    .map((category) => ({
      category,
      config: categoryConfig[category],
      items: project.stack.filter((stack) => stack.category === category),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <div className="min-h-screen bg-[var(--bg-0)] text-[var(--text)]">
      <div className="bg-field" />
      <div className="bg-grid" />

      <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--bg-0)_82%,transparent)] backdrop-blur">
        <div className="wrap h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[var(--text-dim)] hover:text-[var(--text)] transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-4 py-2">
            Visitar projeto
            <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <main className="wrap py-12">
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">{project.name}</h1>
          <p className="text-[var(--accent)] font-mono text-lg">{project.tagline}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-14">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-2)] shadow-2xl">
            <ProjectImage src={project.image ?? ''} alt={`Screenshot do ${project.name}`} url={project.url} />
          </div>

          <div>
            <p className="text-[var(--text-dim)] leading-relaxed mb-6">{project.description}</p>

            <h3 className="font-mono text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-[var(--accent)] rounded" />
              Funcionalidades
            </h3>
            <ul className="space-y-2.5">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-[var(--text-dim)] text-sm leading-relaxed">
                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  {feature}
                </li>
              ))}
            </ul>

            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8">
              Acessar o projeto
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-2">Stack utilizada</h2>
          <div className="w-10 h-1 bg-[var(--accent)] rounded mb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {groupedStack.map(({ category, config, items }) => {
              const Icon = config.icon
              return (
                <div key={category} className="panel p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${config.color}`}>
                      <Icon size={15} />
                    </div>
                    <span className="text-xs font-bold text-[var(--text-faint)] uppercase tracking-widest">
                      {config.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((stack) => (
                      <span key={stack.name} className={`px-3 py-1 text-xs font-medium rounded-full border ${config.color}`}>
                        {stack.name}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

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
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-slate-400">Projeto não encontrado.</p>
        <Link to="/" className="text-brand-500 hover:underline text-sm">← Voltar ao início</Link>
      </div>
    )
  }

  const groupedStack = stackOrder
    .map((cat) => ({
      category: cat,
      config: categoryConfig[cat],
      items: project.stack.filter((s) => s.category === cat),
    }))
    .filter((g) => g.items.length > 0)

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Header */}
      <header className="border-b border-dark-700 bg-dark-900/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={16} />
            Voltar
          </button>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Visitar Site
            <ExternalLink size={14} />
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-12">
        {/* Title */}
        <div className="mb-10">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-0.5 text-xs font-medium bg-brand-500/10 text-brand-500 border border-brand-500/20 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-2">{project.name}</h1>
          <p className="text-brand-500 font-medium text-lg">{project.tagline}</p>
        </div>

        {/* Image + Description */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-14">
          {/* Screenshot */}
          <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-dark-700 bg-dark-800 shadow-2xl">
            <ProjectImage
              src={project.image ?? ''}
              alt={`Screenshot do ${project.name}`}
              url={project.url}
            />
          </div>

          {/* Description + Features */}
          <div>
            <p className="text-slate-300 leading-relaxed mb-6">{project.description}</p>

            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-4 h-0.5 bg-brand-500 rounded" />
              Funcionalidades
            </h3>
            <ul className="space-y-2.5">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                  <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-5 py-3 rounded-lg transition-colors text-sm"
            >
              Acessar o projeto
              <ExternalLink size={15} />
            </a>
          </div>
        </div>

        {/* Stack */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Stack Utilizada</h2>
          <div className="w-10 h-1 bg-brand-500 rounded mb-8" />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {groupedStack.map(({ category, config, items }) => {
              const Icon = config.icon
              return (
                <div
                  key={category}
                  className="bg-dark-800 border border-dark-700 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border ${config.color}`}>
                      <Icon size={15} />
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      {config.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((s) => (
                      <span
                        key={s.name}
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${config.color}`}
                      >
                        {s.name}
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

import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { projects } from '@/data/projects'
import ProjectImage from '@/components/ui/ProjectImage'

export default function Projects() {
  return (
    <section id="projetos" className="bg-dark-800/50">
      <div className="section-container">
        <h2 className="section-title">Últimos Projetos</h2>
        <div className="section-divider" />

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projetos/${project.id}`}
              className="group block bg-dark-800 border border-dark-700 hover:border-brand-500/60 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/5"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-dark-900 overflow-hidden border-b border-dark-700 group-hover:[&_img]:scale-105">
                <ProjectImage
                  src={project.image ?? ''}
                  alt={project.name}
                  url={project.url}
                  className="transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-semibold text-lg group-hover:text-brand-500 transition-colors">
                    {project.name}
                  </h3>
                  <ArrowRight
                    size={16}
                    className="text-slate-600 group-hover:text-brand-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                  />
                </div>
                <p className="text-slate-500 text-xs font-medium mb-3">{project.tagline}</p>
                <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs font-medium bg-dark-700 text-slate-400 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

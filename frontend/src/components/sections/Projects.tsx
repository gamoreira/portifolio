import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { projects } from '@/data/projects'
import ProjectImage from '@/components/ui/ProjectImage'

const GAP = 24

export default function Projects() {
  const [current, setCurrent] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return
      const firstCard = trackRef.current.firstElementChild as HTMLElement | null
      if (firstCard) setCardWidth(firstCard.getBoundingClientRect().width)
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [])

  const maxDrag = cardWidth > 0 ? -((projects.length - 1) * (cardWidth + GAP)) : 0

  const prev = () => setCurrent(c => Math.max(0, c - 1))
  const next = () => setCurrent(c => Math.min(projects.length - 1, c + 1))

  return (
    <section id="projetos" className="bg-dark-800/50">
      <div className="section-container">
        <h2 className="section-title">Últimos Projetos</h2>
        <div className="section-divider" />

        <div className="relative">
          {/* Seta esquerda */}
          <button
            onClick={prev}
            aria-label="Projeto anterior"
            className={`absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-dark-800 border border-dark-700 text-slate-400 hover:text-white hover:border-brand-500/60 transition-all duration-200 ${current === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronLeft size={18} />
          </button>

          <div className="overflow-hidden">
            <motion.div
              ref={trackRef}
              className="flex gap-6 cursor-grab active:cursor-grabbing select-none"
              drag="x"
              dragConstraints={{ left: maxDrag, right: 0 }}
              dragElastic={0.08}
              animate={{ x: cardWidth > 0 ? -(current * (cardWidth + GAP)) : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50 && current < projects.length - 1) next()
                else if (info.offset.x > 50 && current > 0) prev()
              }}
            >
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projetos/${project.id}`}
                  draggable={false}
                  className="group flex-shrink-0 w-[calc(85%-12px)] sm:w-[calc(50%-12px)] bg-dark-800 border border-dark-700 hover:border-brand-500/60 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/5"
                >
                  <div className="aspect-video bg-dark-900 overflow-hidden border-b border-dark-700 group-hover:[&_img]:scale-105">
                    <ProjectImage
                      src={project.image ?? ''}
                      alt={project.name}
                      url={project.url}
                      className="transition-transform duration-300"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white font-semibold text-base group-hover:text-brand-500 transition-colors">
                        {project.name}
                      </h3>
                      <ArrowRight
                        size={15}
                        className="text-slate-600 group-hover:text-brand-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5"
                      />
                    </div>
                    <p className="text-slate-500 text-xs font-medium mb-2">{project.tagline}</p>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
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
            </motion.div>
          </div>

          {/* Seta direita */}
          <button
            onClick={next}
            aria-label="Próximo projeto"
            className={`absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-dark-800 border border-dark-700 text-slate-400 hover:text-white hover:border-brand-500/60 transition-all duration-200 ${current === projects.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Ir para projeto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? 'w-6 bg-brand-500' : 'w-1.5 bg-dark-700 hover:bg-dark-600'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

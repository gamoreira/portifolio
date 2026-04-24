import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useMotionValue, animate } from 'framer-motion'
import { projects } from '@/data/projects'
import ProjectImage from '@/components/ui/ProjectImage'

const GAP = 32
const TOTAL = projects.length
const PRE = 2 // clones on each side — ensures peek is always filled

// [last2, last1, proj0..proj4, first0, first1]
const extended = [...projects.slice(-PRE), ...projects, ...projects.slice(0, PRE)]
const START = PRE // extended[PRE] = real projects[0]

const TRANSITION = { duration: 0.45, ease: 'easeInOut' as const }

export default function Projects() {
  const [rawIndex, setRawIndex] = useState(START)
  const [cardWidth, setCardWidth] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const animating = useRef(false)

  useEffect(() => {
    const measure = () => {
      const firstCard = trackRef.current?.firstElementChild as HTMLElement | null
      if (!firstCard) return
      const w = firstCard.getBoundingClientRect().width
      if (w === 0) return
      setCardWidth(prev => {
        if (prev !== w) x.set(-(START * (w + GAP)))
        return w
      })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (trackRef.current) ro.observe(trackRef.current)
    return () => ro.disconnect()
  }, [x])

  const go = useCallback(async (nextRaw: number) => {
    if (animating.current || cardWidth === 0) return
    animating.current = true

    await animate(x, -(nextRaw * (cardWidth + GAP)), TRANSITION)

    // Seamless wrap: jump to real equivalent position (same visual, no flash)
    if (nextRaw >= PRE + TOTAL) {
      const real = nextRaw - TOTAL
      x.set(-(real * (cardWidth + GAP)))
      setRawIndex(real)
    } else if (nextRaw < PRE) {
      const real = nextRaw + TOTAL
      x.set(-(real * (cardWidth + GAP)))
      setRawIndex(real)
    } else {
      setRawIndex(nextRaw)
    }

    animating.current = false
  }, [cardWidth, x])

  // Map rawIndex back to 0-based project index for dots
  const realIndex = (rawIndex - PRE + TOTAL) % TOTAL

  return (
    <section id="projetos" className="bg-dark-800/50">
      <div className="section-container">
        <h2 className="section-title">Últimos Projetos</h2>
        <div className="section-divider" />

        <div className="relative">
          {/* Seta esquerda */}
          <button
            onClick={() => go(rawIndex - 1)}
            aria-label="Projeto anterior"
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-dark-800 border border-dark-700 text-slate-400 hover:text-white hover:border-brand-500/60 transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="overflow-hidden">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-8 cursor-grab active:cursor-grabbing select-none"
              drag="x"
              dragElastic={0}
              dragMomentum={false}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) go(rawIndex + 1)
                else if (info.offset.x > 50) go(rawIndex - 1)
                else animate(x, -(rawIndex * (cardWidth + GAP)), TRANSITION)
              }}
            >
              {extended.map((project, i) => (
                <Link
                  key={i}
                  to={`/projetos/${project.id}`}
                  draggable={false}
                  className="group flex-shrink-0 w-[calc(78%-16px)] sm:w-[calc(43%-16px)] bg-dark-800 border border-dark-700 hover:border-brand-500/60 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/5"
                >
                  <div className="aspect-video bg-dark-900 overflow-hidden border-b border-dark-700 group-hover:[&_img]:scale-105">
                    <ProjectImage
                      src={project.image ?? ''}
                      alt={project.name}
                      url={project.url}
                      className="transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <div className="flex items-start justify-between mb-1.5">
                      <h3 className="text-white font-semibold text-sm group-hover:text-brand-500 transition-colors">
                        {project.name}
                      </h3>
                      <ArrowRight size={14} className="text-slate-600 group-hover:text-brand-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-0.5" />
                    </div>
                    <p className="text-slate-500 text-xs font-medium mb-1.5">{project.tagline}</p>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-2.5">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-xs font-medium bg-dark-700 text-slate-400 rounded-full">
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
            onClick={() => go(rawIndex + 1)}
            aria-label="Próximo projeto"
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-dark-800 border border-dark-700 text-slate-400 hover:text-white hover:border-brand-500/60 transition-all duration-200"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-5">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i + PRE)}
              aria-label={`Ir para projeto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === realIndex ? 'w-6 bg-brand-500' : 'w-1.5 bg-dark-700 hover:bg-dark-600'}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

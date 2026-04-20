import { ArrowDown, Linkedin, Instagram } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-dark-900">

      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Fade edges over the grid */}
      <div className="absolute inset-0 bg-radial-fade pointer-events-none" />

      {/* Glow orb — centro */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-500/10 blur-3xl animate-pulse-slow pointer-events-none" />

      {/* Glow orb — canto superior direito */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-brand-700/20 blur-3xl animate-float pointer-events-none" />

      {/* Glow orb — canto inferior esquerdo */}
      <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-brand-500/10 blur-3xl animate-float-delayed pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 animate-fade-in">
        <p className="text-brand-500 font-medium text-sm tracking-widest uppercase mb-4">
          Full Stack Developer
        </p>
        <h1 className="text-4xl md:text-7xl font-extrabold text-white mb-4 leading-tight">
          Guilherme<br />
          <span className="text-brand-500">Moreira</span>
        </h1>
        <p className="text-slate-400 text-base md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
          Desenvolvimento de sistemas e sites personalizados. Automações inteligentes com n8n.
          Soluções que transformam demandas em tecnologia.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
          <a
            href="#projetos"
            className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className="border border-slate-600 hover:border-brand-500 text-slate-300 hover:text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Entrar em Contato
          </a>
        </div>

        <div className="flex items-center justify-center gap-6">
          <a
            href="https://www.linkedin.com/in/guimoreira90"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-brand-500 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={22} />
          </a>
          <a
            href="https://instagram.com/guimoreira90"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-brand-500 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={22} />
          </a>
        </div>
      </div>

      <a
        href="#sobre"
        className="absolute bottom-10 z-10 text-slate-600 hover:text-slate-400 transition-colors animate-bounce"
        aria-label="Rolar para baixo"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  )
}

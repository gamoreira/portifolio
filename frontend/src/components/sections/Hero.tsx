import { ArrowDown, ArrowRight, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react'
import InteractiveTerminal from '@/components/ui/InteractiveTerminal'

export default function Hero() {
  return (
    <header className="hero wrap" id="top">
      <div className="hero-grid">
        <div className="hero-id reveal">
          <span className="eyebrow">Full Stack Developer · n8n</span>
          <h1>
            Guilherme
            <br />
            <span className="l2">Moreira</span>
          </h1>
          <p className="hero-tag">
            Desenvolvimento de sistemas e sites <b>sob medida</b>. Automações inteligentes com{' '}
            <b>n8n</b>. Soluções que transformam demandas em tecnologia.
          </p>

          <div className="hero-cta">
            <a href="#projetos" className="btn btn-primary">
              <ArrowRight />
              ver projetos
            </a>
            <a href="#contato" className="btn btn-ghost">
              <Mail />
              entrar em contato
            </a>
          </div>

          <div className="hero-meta">
            <div className="stat"><div className="n"><b>10+</b></div><div className="k">anos de experiência</div></div>
            <div className="stat"><div className="n"><b>n8n</b></div><div className="k">automação e IA</div></div>
            <div className="stat"><div className="n">full<b>·</b>stack</div><div className="k">do zero ao deploy</div></div>
          </div>

          <div className="hero-socials">
            <a href="https://www.linkedin.com/in/guimoreira90" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href="https://instagram.com/guimoreira90" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://wa.me/5544998921504" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <InteractiveTerminal />
      </div>

      <a className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[11px] tracking-[.18em] text-[var(--text-faint)] md:flex" href="#sobre">
        SCROLL
        <ArrowDown size={18} className="text-[var(--accent)]" />
      </a>
    </header>
  )
}

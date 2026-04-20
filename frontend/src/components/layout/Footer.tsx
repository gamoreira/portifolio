import { Linkedin, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-dark-700 bg-dark-900">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Guilherme Moreira. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/guimoreira90"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-brand-500 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://instagram.com/guimoreira90"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-brand-500 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={18} />
          </a>
          <a
            href="mailto:guilhermeintegrado@gmail.com"
            className="text-slate-500 hover:text-brand-500 transition-colors"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}

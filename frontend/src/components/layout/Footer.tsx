import { Instagram, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <div className="c">
          © {new Date().getFullYear()} <b>Guilherme Moreira</b>. Todos os direitos reservados.
        </div>
        <div className="footer-soc">
          <a href="https://www.linkedin.com/in/guimoreira90" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={16} />
          </a>
          <a href="https://instagram.com/guimoreira90" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram size={16} />
          </a>
          <a href="mailto:devgmoreira@gmail.com" aria-label="Email">
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}

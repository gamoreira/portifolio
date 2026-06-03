import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '@/hooks/useTheme'

const navLinks = [
  { label: 'sobre', href: '#sobre' },
  { label: 'stacks', href: '#stacks' },
  { label: 'automação', href: '#automacao' },
  { label: 'projetos', href: '#projetos' },
  { label: 'carreira', href: '#carreira' },
  { label: 'contato', href: '#contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((section): section is Element => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`} id="nav">
      <div className="nav-in">
        <a className="brand" href="#top" aria-label="guimoreira.tech - início">
          <span className="dot" /><span>gui</span><b>moreira</b><span>.tech</span>
        </a>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a
              href={link.href}
              key={link.href}
              className={active === link.href ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              <span className="hash">#</span> {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <button className="theme-btn" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <a href="#contato" className="btn btn-primary nav-cta py-[11px] px-[18px]">vamos conversar</a>
          <button
            className={`burger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Menu"
          >
            <i /><i /><i />
          </button>
        </div>
      </div>
    </nav>
  )
}

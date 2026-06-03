import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Stacks from '@/components/sections/Stacks'
import Automation from '@/components/sections/Automation'
import Cases from '@/components/sections/Cases'
import Projects from '@/components/sections/Projects'
import Career from '@/components/sections/Career'
import Contact from '@/components/sections/Contact'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import NodeCanvas from '@/components/ui/NodeCanvas'
import { useRevealOnScroll } from '@/hooks/useRevealOnScroll'

export default function Home() {
  useRevealOnScroll()

  return (
    <div className="min-h-screen bg-[var(--bg-0)] text-[var(--text)]">
      <div className="bg-field" />
      <div className="bg-grid" />
      <NodeCanvas />
      <div className="scanlines" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stacks />
        <Automation />
        <Cases />
        <Projects />
        <Career />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

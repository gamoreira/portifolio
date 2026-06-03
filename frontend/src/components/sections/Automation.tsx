import { Clock, Mail, MessageCircle, Send, Table2, Webhook } from 'lucide-react'
import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import SectionHeader from '@/components/ui/SectionHeader'

const inputNodes = [
  { icon: Clock, title: 'Agendamento', subtitle: 'cron diario', color: '#34e29b' },
  { icon: Webhook, title: 'Webhook', subtitle: 'evento externo', color: '#a78bff' },
  { icon: Mail, title: 'Gmail', subtitle: 'novo email', color: '#ff9d54' },
]

const outputNodes = [
  { icon: MessageCircle, title: 'WhatsApp', subtitle: 'notifica cliente', color: '#34e29b' },
  { icon: Table2, title: 'Google Sheets', subtitle: 'registra dados', color: '#22e6ff' },
  { icon: Send, title: 'Telegram', subtitle: 'alerta equipe', color: '#a78bff' },
]

export default function Automation() {
  const flowRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const [paths, setPaths] = useState<string[]>([])

  useEffect(() => {
    const draw = () => {
      const flow = flowRef.current
      const core = coreRef.current
      if (!flow || !core || window.innerWidth <= 880) {
        setPaths([])
        return
      }

      const flowRect = flow.getBoundingClientRect()
      const coreRect = core.getBoundingClientRect()
      const coreInX = coreRect.left - flowRect.left
      const coreOutX = coreRect.right - flowRect.left
      const coreY = coreRect.top - flowRect.top + coreRect.height / 2

      const nextPaths = Array.from(flow.querySelectorAll<HTMLElement>('.node')).map((node) => {
        const rect = node.getBoundingClientRect()
        const side = node.dataset.side
        const y = rect.top - flowRect.top + rect.height / 2

        if (side === 'in') {
          const x = rect.right - flowRect.left
          const mid = (x + coreInX) / 2
          return `M ${x} ${y} C ${mid} ${y}, ${mid} ${coreY}, ${coreInX} ${coreY}`
        }

        const x = rect.left - flowRect.left
        const mid = (x + coreOutX) / 2
        return `M ${coreOutX} ${coreY} C ${mid} ${coreY}, ${mid} ${y}, ${x} ${y}`
      })

      setPaths(nextPaths)
    }

    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [])

  return (
    <section id="automacao" className="section-shell">
      <div className="wrap">
        <SectionHeader
          eyebrow="Automação · n8n"
          title="Fluxos que trabalham enquanto você dorme."
          index="// 03 - ESTEIRA"
        />

        <div className="flow-wrap reveal">
          <div className="grid-deco" />
          <div className="flow-head">
            <p className="lead">
              Integro os serviços que seu negócio já usa numa única esteira: um gatilho dispara,
              os dados são processados e cada sistema recebe o que precisa, sem trabalho manual.
            </p>
            <span className="tag">FLUXO ATIVO</span>
          </div>

          <div className="flow" ref={flowRef}>
            <svg className="flow-svg" preserveAspectRatio="none">
              {paths.map((path, index) => <path key={index} d={path} />)}
            </svg>

            <div className="flow-col">
              {inputNodes.map((node) => (
                <div className="node" data-side="in" style={{ '--ncolor': node.color } as CSSProperties} key={node.title}>
                  <div className="ni"><node.icon size={19} /></div>
                  <div><div className="nt">{node.title}</div><div className="ns">{node.subtitle}</div></div>
                  <span className="port out" />
                </div>
              ))}
            </div>

            <div className="flow-col mid">
              <div className="flow-core" ref={coreRef}>
                <div className="ring" /><div className="ring r2" />
                <div className="lbl"><b>n8n</b><span>orquestra</span></div>
              </div>
            </div>

            <div className="flow-col">
              {outputNodes.map((node) => (
                <div className="node" data-side="out" style={{ '--ncolor': node.color } as CSSProperties} key={node.title}>
                  <span className="port in" />
                  <div className="ni"><node.icon size={19} /></div>
                  <div><div className="nt">{node.title}</div><div className="ns">{node.subtitle}</div></div>
                </div>
              ))}
            </div>
          </div>

          <div className="flow-note">
            <span className="pill"><b>+</b> integra APIs e sistemas REST</span>
            <span className="pill"><b>+</b> camada de IA para decisões</span>
            <span className="pill"><b>+</b> tarefas repetitivas eliminadas</span>
          </div>
        </div>
      </div>
    </section>
  )
}

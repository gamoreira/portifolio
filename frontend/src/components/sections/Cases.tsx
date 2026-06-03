import SectionHeader from '@/components/ui/SectionHeader'

const cases = [
  {
    badge: 'Cobranças · n8n + IA',
    title: 'Gestão de Cobranças',
    subtitle: 'Lembretes automáticos via WhatsApp com IA',
    description:
      'Sistema web para gestão de clientes com envio automático de lembretes no dia do vencimento via WhatsApp. O fluxo n8n é acionado diariamente, identifica os vencimentos e dispara mensagens personalizadas sem intervenção manual.',
    metrics: [
      { value: '100%', label: 'disparos automáticos' },
      { value: '0min', label: 'de trabalho manual/dia' },
      { value: '24/7', label: 'operando sozinho' },
    ],
    tags: ['n8n', 'React', 'Node.js', 'WhatsApp', 'IA'],
    steps: [
      ['Cron diário 08:00', 'trigger', 'run'],
      ['Consulta vencimentos', 'banco de dados', '12 found'],
      ['IA monta mensagem', 'personaliza tom', 'ok'],
      ['Envia WhatsApp', 'API oficial', 'sent'],
    ],
  },
  {
    badge: 'Software sob medida · IA',
    title: 'Ivaitec',
    subtitle: 'Site institucional + automação com IA',
    description:
      'Site institucional para empresa especializada em desenvolvimento de software personalizado e automação com inteligência artificial. Projeto com identidade forte, animações fluidas e arquitetura pensada para escalar.',
    metrics: [
      { value: 'SPA', label: 'react + typescript' },
      { value: 'Motion', label: 'animações fluidas' },
      { value: 'Docker', label: 'deploy isolado' },
    ],
    tags: ['React', 'TypeScript', 'Framer Motion', 'Docker'],
    steps: [
      ['Requisitos e UX', 'discovery', 'scope'],
      ['Front-end SPA', 'react · ts', 'build'],
      ['Camada de IA', 'integração', 'ok'],
      ['Deploy Docker', 'produção', 'live'],
    ],
  },
]

export default function Cases() {
  return (
    <section id="cases" className="section-shell">
      <div className="wrap">
        <SectionHeader
          eyebrow="Cases de automação"
          title="Da dor manual ao fluxo automático."
          index="// 04 - RESULTADOS"
        />

        {cases.map((item, caseIndex) => (
          <article className={`case reveal ${caseIndex === 1 ? 'd1' : ''}`} key={item.title}>
            <div className="case-copy">
              <span className="badge">{item.badge}</span>
              <h3>{item.title}</h3>
              <div className="sub">{item.subtitle}</div>
              <p>{item.description}</p>

              <div className="case-metrics">
                {item.metrics.map((metric) => (
                  <div className="m" key={metric.label}>
                    <b>{metric.value}</b>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="case-tags">
                {item.tags.map((tag) => <span className="t" key={tag}>{tag}</span>)}
              </div>
            </div>

            <div className="case-visual ticks">
              <div className="grid-deco" />
              <div className="pipe">
                {item.steps.map(([title, subtitle, status], index) => (
                  <div className="pipe-step" key={title}>
                    <div className="dot">{index + 1}</div>
                    <div><div className="x">{title}</div><div className="y">{subtitle}</div></div>
                    <span className="stat">{status}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

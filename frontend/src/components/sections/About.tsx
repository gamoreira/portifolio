import { Zap, Code2, Workflow } from 'lucide-react'

const highlights = [
  {
    icon: Code2,
    title: 'Sistemas Personalizados',
    description:
      'Desenvolvimento completo de sistemas web sob medida — do levantamento de requisitos ao deploy, com foco em performance e escalabilidade.',
  },
  {
    icon: Workflow,
    title: 'Automações com n8n',
    description:
      'Criação de fluxos automatizados para processos de negócio, integrando APIs, sistemas e serviços para eliminar tarefas manuais repetitivas.',
  },
  {
    icon: Zap,
    title: 'Liderança Técnica',
    description:
      'Experiência em arquitetura de software, análise de requisitos e metodologias ágeis (Scrum e Kanban) junto a stakeholders.',
  },
]

export default function About() {
  return (
    <section id="sobre" className="bg-dark-800/50">
      <div className="section-container">
        <h2 className="section-title">Sobre</h2>
        <div className="section-divider" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              Sou Analista de Sistemas com mais de{' '}
              <span className="text-white font-medium">10 anos de experiência</span> em
              desenvolvimento e suporte de sistemas web corporativos. Atuo em análise de
              requisitos, arquitetura de software e liderança técnica.
            </p>
            <p>
              Trabalho com foco em soluções eficientes, estáveis e alinhadas às necessidades do
              negócio. Tenho forte capacidade de transformar demandas em soluções técnicas
              concretas.
            </p>
            <p>
              Além do desenvolvimento tradicional, ofereço{' '}
              <span className="text-brand-500 font-medium">automações com n8n</span> e{' '}
              <span className="text-brand-500 font-medium">
                criação de sistemas e sites personalizados
              </span>{' '}
              — do zero até o deploy, com acompanhamento completo do projeto.
            </p>
          </div>

          <div className="space-y-4">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="flex gap-4 p-4 rounded-xl bg-dark-800 border border-dark-700 hover:border-brand-500/50 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-brand-500/10 rounded-lg flex items-center justify-center text-brand-500">
                  <item.icon size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

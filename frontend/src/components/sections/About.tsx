import { Code2, Workflow, Zap } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const highlights = [
  {
    icon: Code2,
    title: 'Sistemas Personalizados',
    description:
      'Desenvolvimento completo de sistemas web sob medida, do levantamento de requisitos ao deploy, com foco em performance e escalabilidade.',
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
      'Experiência em arquitetura de software, análise de requisitos e metodologias ágeis, com interação direta com stakeholders.',
  },
]

export default function About() {
  return (
    <section id="sobre" className="section-shell">
      <div className="wrap">
        <SectionHeader
          eyebrow="Sobre"
          title="Transformo demandas em tecnologia concreta."
          index="// 01 - PERFIL"
        />

        <div className="about-grid">
          <div className="about-copy reveal">
            <p>
              Sou <b>Analista e Desenvolvedor de Sistemas</b> com sólida atuação em PHP, Laravel,
              Node.js e construção de APIs REST escaláveis, sistemas distribuídos e aplicações de
              alto desempenho.
            </p>
            <p>
              Trabalho com foco em soluções <b>eficientes, estáveis e alinhadas ao negócio</b>,
              com experiência em arquitetura de software, integração com APIs externas, bancos de
              dados, Docker, AWS e práticas modernas de DevOps.
            </p>
            <p>
              Além do desenvolvimento tradicional, ofereço{' '}
              <a className="ln" href="#automacao">automações com n8n</a> e{' '}
              <a className="ln" href="#projetos">criação de sistemas e sites personalizados</a>,
              do zero até o deploy, com acompanhamento completo do projeto.
            </p>
          </div>

          <div className="svc-list">
            {highlights.map((item, index) => (
              <article className={`svc reveal d${index + 1}`} key={item.title}>
                <div className="ic"><item.icon size={22} /></div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

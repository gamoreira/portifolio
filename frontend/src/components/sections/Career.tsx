import { Download } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const resumeUrl = '/assets/docs/guilherme_moreira.pdf'

const timeline = [
  {
    period: 'Abril/2017 - Maio/2026',
    title: 'Analista de Sistemas Sênior',
    company: 'RBXSoft · Maringá, Paraná',
    description:
      'Desenvolvimento e manutenção de sistemas web e APIs REST com PHP, decisões arquiteturais, integração com APIs externas, testes automatizados, bancos PostgreSQL e MySQL, Docker, CI/CD, AWS e liderança técnica junto ao time.',
  },
  {
    period: 'Outubro/2015 - Março/2017',
    title: 'Analista de Suporte',
    company: 'RBXSoft · Maringá, Paraná',
    description:
      'Atendimento técnico, investigação de incidentes em sistemas web PHP, suporte a implantação, manutenção, treinamento de usuários e melhoria contínua da experiência do cliente.',
  },
  {
    period: 'Janeiro/2012 - Dezembro/2014',
    title: 'Instrutor de Informática e Programação / Técnico em Informática',
    company: 'OPCI Informática e Formação Profissional · Barbosa Ferraz, Paraná',
    description:
      'Aulas teóricas e práticas em tecnologia, lógica de programação e desenvolvimento web, além de suporte técnico em hardware, software e infraestrutura de laboratório.',
  },
  {
    period: 'Agosto/2009 - Agosto/2011',
    title: 'Estagiário - Departamento de Tecnologia da Informação',
    company: 'Prefeitura Municipal de Barbosa Ferraz · Barbosa Ferraz, Paraná',
    description:
      'Controle de inventário, manutenção preventiva e corretiva de equipamentos, suporte técnico e configuração de sistemas.',
  },
]

export default function Career() {
  return (
    <section id="carreira" className="section-shell">
      <div className="wrap">
        <SectionHeader
          eyebrow="Carreira"
          title="Trajetória técnica construída em produção."
          index="// 06 - TIMELINE"
        />

        <div className="career-intro reveal">
          <p>
            Analista e Desenvolvedor de Sistemas com sólida atuação em PHP, Laravel e Node.js,
            focado na construção de APIs REST escaláveis, sistemas distribuídos e aplicações de
            alto desempenho. Experiência em arquitetura de software, integrações, automação de
            processos, ambientes cloud com AWS, Docker, DevOps e uso de IA aplicada ao
            desenvolvimento.
          </p>
          <a className="btn btn-primary mt-6" href={resumeUrl} download>
            <Download size={16} />
            baixar currículo
          </a>
        </div>

        <div className="tl">
          {timeline.map((item, index) => (
            <div className={`tl-item reveal d${Math.min(index, 3)}`} key={`${item.period}-${item.title}`}>
              <span className="knob" />
              <div className="yr">{item.period}</div>
              <h4>{item.title}</h4>
              <div className="org">{item.company}</div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

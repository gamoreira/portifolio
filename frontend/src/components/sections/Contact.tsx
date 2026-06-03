import { ArrowUpRight, Download, Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

const WA_NUMBER = '5544998921504'
const WA_URL = `https://wa.me/${WA_NUMBER}`
const EMAIL = 'devgmoreira@gmail.com'
const resumeUrl = '/assets/docs/guilherme_moreira.pdf'

const contacts = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '(44) 9 9892-1504',
    href: WA_URL,
    className: 'wa-ch',
  },
  {
    icon: Mail,
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/guimoreira90',
    href: 'https://www.linkedin.com/in/guimoreira90',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@guimoreira90',
    href: 'https://instagram.com/guimoreira90',
  },
  {
    icon: Download,
    label: 'Currículo',
    value: 'baixar PDF',
    href: resumeUrl,
    download: true,
  },
]

export default function Contact() {
  return (
    <section id="contato" className="section-shell">
      <div className="wrap">
        <SectionHeader eyebrow="Contato" index="// 07 - VAMOS CONVERSAR" />

        <div className="contact-grid">
          <div className="contact-copy reveal">
            <h2>Tem um projeto em mente?</h2>
            <p>Precisa de um sistema personalizado ou automações para o seu negócio?</p>
            <p>Entre em contato pelo canal de sua preferência. Respondo o mais breve possível.</p>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary wa">
              <MessageCircle />
              chamar no WhatsApp
            </a>
          </div>

          <div className="ch-list">
            {contacts.map((item, index) => (
              <a
                href={item.href}
                className={`ch reveal d${Math.min(index, 3)} ${item.className ?? ''}`}
                target={item.download ? undefined : '_blank'}
                rel={item.download ? undefined : 'noopener noreferrer'}
                download={item.download}
                key={item.label}
              >
                <div className="ic"><item.icon size={21} /></div>
                <div><div className="k">{item.label}</div><div className="v">{item.value}</div></div>
                <span className="arr"><ArrowUpRight size={18} /></span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

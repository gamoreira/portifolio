import { Mail, Linkedin, Instagram, MessageCircle } from 'lucide-react'

const WA_NUMBER = '5544998921504'
const WA_URL = `https://wa.me/${WA_NUMBER}`

const contacts = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '(44) 9 9892-1504',
    href: WA_URL,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'guilhermeintegrado@gmail.com',
    href: 'mailto:guilhermeintegrado@gmail.com',
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
]

export default function Contact() {
  return (
    <section id="contato">
      <div className="section-container">
        <h2 className="section-title">Contato</h2>
        <div className="section-divider" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              Tem um projeto em mente? Precisa de um sistema personalizado ou automações para o
              seu negócio?
            </p>
            <p className="text-slate-400 leading-relaxed">
              Entre em contato pelo canal de sua preferência — responderei o mais breve possível.
            </p>
          </div>

          <div className="space-y-4">
            {contacts.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-dark-800 border border-dark-700 hover:border-brand-500/50 transition-colors group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-brand-500/10 rounded-lg flex items-center justify-center text-brand-500 group-hover:bg-brand-500/20 transition-colors">
                  <item.icon size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-0.5">{item.label}</p>
                  <p className="text-slate-200 text-sm font-medium">{item.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

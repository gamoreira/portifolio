import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/5544998921504"
      target="_blank"
      rel="noopener noreferrer"
      className="fab"
      aria-label="Chamar no WhatsApp"
    >
      <MessageCircle size={20} />
      WhatsApp
    </a>
  )
}

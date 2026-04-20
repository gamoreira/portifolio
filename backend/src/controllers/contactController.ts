import type { Request, Response } from 'express'

export async function sendContact(req: Request, res: Response) {
  const { name, email, message } = req.body as { name?: string; email?: string; message?: string }

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Campos obrigatórios: name, email, message' })
  }

  // TODO fase 2: integrar com Resend ou Nodemailer
  console.log('Contato recebido:', { name, email, message })

  return res.json({ success: true })
}

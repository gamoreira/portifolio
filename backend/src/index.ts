import express from 'express'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
// import contactRouter from './routes/contact.js'  // fase 2

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: process.env.CORS_ORIGIN ?? '*' }))
app.use(express.json())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 50 }))

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' })
})

// app.use('/contact', contactRouter)  // fase 2

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`)
})

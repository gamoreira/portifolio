# Portfolio Plan — guimoreiradev.tech

## Objetivo
Site portfólio profissional para Guilherme Moreira, Full Stack Developer.
Domínio: **guimoreiradev.tech**

---

## Stack

| Camada     | Tecnologia                          |
|------------|-------------------------------------|
| Frontend   | React 18 + Vite + TypeScript        |
| Estilo     | Tailwind CSS + shadcn/ui            |
| Roteamento | React Router v6                     |
| Animações  | Framer Motion                       |
| Backend*   | Node.js + Express (estrutura pronta)|
| Deploy     | Vercel (frontend) / Railway (backend futuro) |

> *Backend não será implementado na fase 1, mas a pasta `backend/` já estará estruturada.

---

## Seções do Site

### 1. Hero
- Nome: **Guilherme Moreira**
- Subtítulo: Full Stack Developer | JavaScript · Node.js · React · PHP
- Localização: Maringá, Paraná, Brasil
- Botões CTA: "Ver Projetos" e "Entrar em Contato"
- Links sociais: LinkedIn + Instagram

### 2. Sobre
- Bio baseada no currículo:
  > Analista de Sistemas com +10 anos de experiência em desenvolvimento e suporte de sistemas web corporativos. Atuação em análise de requisitos, arquitetura e liderança técnica.
- **Extras (não estão no currículo):**
  - Automações com **n8n** — criação de fluxos automatizados para processos de negócio com integrações via API
  - **Criação de sistemas e sites personalizados** sob medida — desde o levantamento de requisitos até o deploy

### 3. Stacks
Grid visual com ícones/badges das tecnologias:

**Linguagens:** JavaScript, TypeScript, PHP
**Frameworks/Libs:** React, Laravel, Node.js, Express
**Banco de dados:** MySQL, PostgreSQL
**DevOps/Infra:** Docker, Linux, Git, GitHub
**Automação:** n8n

### 4. Projetos
Cards com preview visual. Ao clicar abre modal com:
- Screenshot/thumbnail do projeto
- Nome e descrição
- Tags de tecnologias utilizadas
- Botão "Visitar site" → abre em nova aba

#### Projetos iniciais:

| Projeto               | URL                          | Descrição                                      |
|-----------------------|------------------------------|------------------------------------------------|
| Ivaitec               | https://ivaitec.com          | Software sob medida e automação com IA         |
| Gato News             | https://gatonews.com.br      | Portal de notícias                             |
| O Tupinambarana       | https://otupinambarana.com.br| Site regional / informativo                    |
| MyFreela              | https://myfreela.guimoreira.tech | Plataforma de freelancers                  |

### 5. Contato / Footer
- Email: devgmoreira@gmail.com
- LinkedIn: https://www.linkedin.com/in/guimoreira90
- Instagram: (a confirmar handle)
- Formulário de contato (fase 2, depende de backend)

---

## Estrutura de Pastas

```
portifolio/
├── frontend/                    # App React + Vite
│   ├── public/
│   │   └── assets/              # Imagens, thumbnails dos projetos
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── sections/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── About.tsx
│   │   │   │   ├── Stacks.tsx
│   │   │   │   ├── Projects.tsx
│   │   │   │   └── Contact.tsx
│   │   │   └── ui/
│   │   │       ├── ProjectCard.tsx
│   │   │       ├── ProjectModal.tsx
│   │   │       ├── TechBadge.tsx
│   │   │       └── SocialLinks.tsx
│   │   ├── data/
│   │   │   ├── projects.ts      # Lista de projetos
│   │   │   └── stacks.ts        # Lista de tecnologias
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
│
├── backend/                     # Estrutura futura (Node.js + Express)
│   ├── src/
│   │   ├── routes/
│   │   │   └── contact.ts       # Endpoint para formulário de contato
│   │   ├── controllers/
│   │   │   └── contactController.ts
│   │   ├── services/
│   │   │   └── emailService.ts  # Envio de email (ex: Resend / Nodemailer)
│   │   ├── middleware/
│   │   │   └── rateLimiter.ts
│   │   └── index.ts
│   ├── .env.example
│   ├── tsconfig.json
│   └── package.json
│
├── docs/
│   └── PORTFOLIO_PLAN.md        # Este arquivo
│
├── CLAUDE.md
└── README.md
```

---

## Fases de Desenvolvimento

### Fase 1 — Frontend (atual)
- [x] Estrutura de pastas criada
- [x] Plano documentado
- [ ] Scaffold React + Vite + Tailwind
- [ ] Componentes: Hero, About, Stacks, Projects, Contact
- [ ] Modal de projetos
- [ ] Responsividade mobile
- [ ] Deploy na Vercel

### Fase 2 — Backend (futuro)
- [ ] API de contato (formulário → email)
- [ ] Rate limiting
- [ ] Deploy no Railway / Render

### Fase 3 — Melhorias (futuro)
- [ ] Internacionalização PT/EN
- [ ] Blog / artigos
- [ ] CMS headless para projetos

---

## Design Guidelines

- **Tema:** Dark mode por padrão, com opção de toggle light
- **Cores primárias:** Azul/Índigo (#6366f1) + fundo escuro (#0f172a)
- **Tipografia:** Inter (sans-serif)
- **Estilo geral:** Moderno, clean, com micro-animações suaves
- **Inspiração:** Portfólios de devs como Brittany Chiang, Josh Comeau

---

## Links e Referências

- LinkedIn: https://www.linkedin.com/in/guimoreira90
- Ivaitec: https://ivaitec.com (Software sob medida e automação com IA)
- Gato News: https://gatonews.com.br
- O Tupinambarana: https://otupinambarana.com.br
- MyFreela: https://myfreela.guimoreira.tech

# CLAUDE.md — Portfólio guimoreira.tech

## Visão Geral

Site portfólio profissional de **Guilherme Moreira**, Full Stack Developer.
Domínio: `https://guimoreira.tech`

## Stack

- **Frontend:** React 18 + Vite + TypeScript + Tailwind CSS
- **Backend (fase 2):** Node.js + Express + TypeScript (estrutura em `backend/`)
- **Deploy:** VPS Hostinger (`187.77.53.199`) — Docker Swarm via Portainer
- **Reverse proxy:** Traefik (rede externa: `network_public`, certresolver: `letsencryptresolver`)
- **DNS:** Cloudflare (DNS only, sem proxy — SSL via Let's Encrypt no Traefik)

## Estrutura do Repositório

```
portifolio/
├── frontend/       # App React + Vite (fase 1 — ativo)
├── backend/        # API Node.js + Express (fase 2 — estrutura pronta)
├── docs/           # Documentação e planos
│   └── PORTFOLIO_PLAN.md
└── CLAUDE.md
```

## Seções do Site

| Seção    | Componente              | Status   |
|----------|-------------------------|----------|
| Hero     | `sections/Hero.tsx`     | pendente |
| Sobre    | `sections/About.tsx`    | pendente |
| Stacks   | `sections/Stacks.tsx`   | pendente |
| Projetos | `sections/Projects.tsx` | pendente |
| Contato  | `sections/Contact.tsx`  | pendente |

## Projetos do Portfólio

Os projetos ficam em `frontend/src/data/projects.ts`:

| Nome           | URL                            |
|----------------|--------------------------------|
| Ivaitec        | https://ivaitec.com            |
| Gato News      | https://gatonews.com.br        |
| O Tupinambarana| https://otupinambarana.com.br  |
| MyFreela       | https://myfreela.guimoreira.tech |

## Dados do Profissional (currículo)

- **Nome:** Guilherme Moreira
- **Título:** Full Stack Developer | JavaScript, Node.js, React, PHP
- **Localização:** Maringá, Paraná, Brasil
- **Email:** guilhermeintegrado@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/guimoreira90
- **Experiência principal:** RBXSoft — Analista de Sistemas Sênior (desde abril/2017)
- **Skills:** Docker, Linux, PHP, Laravel, Node.js, React, JavaScript, TypeScript, MySQL, PostgreSQL, Git, GitHub, n8n

## Serviços Extras (não no currículo)

- **Automações com n8n** — fluxos automatizados, integrações via API
- **Sistemas e sites personalizados** — desenvolvimento sob medida completo

## Convenções

- Componentes em PascalCase: `ProjectCard.tsx`
- Dados estáticos em `src/data/` como arquivos `.ts`
- Tipos centralizados em `src/types/index.ts`
- Sem backend na fase 1 — dados são todos estáticos no frontend
- Dark mode como padrão visual

## Comandos Úteis

```bash
# Instalar dependências do frontend
cd frontend && npm install

# Rodar dev server
cd frontend && npm run dev

# Build de produção
cd frontend && npm run build
```

## Deploy (Docker Swarm via Portainer)

```bash
# 1. Na VPS: build da imagem
docker build -t portfolio-frontend:latest ./frontend

# 2. Deploy do stack via Swarm
docker stack deploy -c docker-compose.yml portfolio
```

Ou pelo **Portainer → Stacks → Add stack** apontando para o `docker-compose.yml`.

**Detalhes do servidor:**
- Rede Traefik: `network_public` (external, já existente)
- certresolver: `letsencryptresolver`
- Entrypoints: `web` (HTTP) e `websecure` (HTTPS)
- Padrão idêntico ao projeto `gatonews`

## Fases

- **Fase 1 (atual):** Frontend completo com dados estáticos
- **Fase 2:** Backend para formulário de contato
- **Fase 3:** Blog, internacionalização PT/EN

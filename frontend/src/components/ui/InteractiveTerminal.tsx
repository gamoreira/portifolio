import { FormEvent, ReactNode, useEffect, useRef, useState } from 'react'

type TerminalLine = {
  id: number
  content: ReactNode
}

const prompt = (
  <>
    <span className="usr">guilherme</span>
    <span className="dim">@</span>
    <span className="pmt">tech</span>
    <span className="dim">:~$</span>{' '}
  </>
)

const bootLines: ReactNode[] = [
  <>
    <span className="ok">&gt;</span> Guilherme Moreira - <span className="key">Full Stack Developer</span> &amp; Analista de Sistemas
  </>,
  <span className="dim">  10+ anos construindo sistemas web, APIs e automações de negócio.</span>,
  <>
    <span className="dim">  -</span> Desenvolvimento de sistemas e sites <span className="key">sob medida</span>
  </>,
  <>
    <span className="dim">  -</span> Automações inteligentes com <span className="pmt">n8n</span> + IA
  </>,
  <>
    <span className="dim">  comandos:</span> <span className="key">whoami</span> <span className="key">stack</span>{' '}
    <span className="key">projetos</span> <span className="key">contato</span> <span className="key">clear</span>
  </>,
]

export default function InteractiveTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const idRef = useRef(0)

  const addLines = (content: ReactNode[]) => {
    setLines((current) => [
      ...current,
      ...content.map((item) => ({ id: idRef.current += 1, content: item })),
    ])
  }

  useEffect(() => {
    addLines([
      <>{prompt}whoami</>,
      ...bootLines.slice(0, 2),
      <>{prompt}cat foco.txt</>,
      ...bootLines.slice(2, 4),
      <>{prompt}help</>,
      bootLines[4],
      <span className="ok">&gt; digite um comando e pressione Enter</span>,
    ])
  }, [])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  const go = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' })
  }

  const run = (raw: string) => {
    const command = raw.toLowerCase().split(' ')[0]

    if (command === 'clear') {
      setLines([])
      return
    }

    const responses: Record<string, ReactNode[]> = {
      help: [
        <span className="dim">  comandos disponíveis: whoami, stack, projetos, automacao, contato, theme, clear</span>,
      ],
      whoami: [
        <>
          <span className="ok">&gt;</span> Guilherme Moreira - Full Stack Developer &amp; Analista de Sistemas
        </>,
        <span className="dim">  APIs REST, arquitetura, liderança técnica, DevOps, IA e automação n8n.</span>,
      ],
      stack: [
        <>
          <span className="pmt">backend</span> PHP, Laravel, Node.js, APIs REST
        </>,
        <>
          <span className="pmt">frontend</span> React, Vue, TypeScript, Tailwind CSS
        </>,
        <>
          <span className="pmt">dados</span> PostgreSQL, MySQL, MongoDB, Redis
        </>,
        <>
          <span className="pmt">devops</span> Docker, Linux, AWS, CI/CD
        </>,
      ],
      contato: [
        <span className="ok">&gt; WhatsApp: (44) 9 9892-1504</span>,
        <span>  email: devgmoreira@gmail.com</span>,
      ],
      n8n: [
        <span className="ok">&gt; n8n: gatilhos, APIs, WhatsApp, Telegram, dados e IA no mesmo fluxo.</span>,
      ],
    }

    if (command === 'projetos') {
      go('#projetos')
      addLines([<span className="ok">&gt; abrindo /projetos...</span>])
      return
    }

    if (command === 'automacao') {
      go('#automacao')
      addLines([<span className="ok">&gt; carregando esteira de automação...</span>])
      return
    }

    if (command === 'theme') {
      const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
      document.documentElement.dataset.theme = next
      window.dispatchEvent(new CustomEvent('gm-theme', { detail: next }))
      addLines([<span className="ok">&gt; tema alterado para {next}</span>])
      return
    }

    addLines(responses[command] ?? [
      <>
        <span style={{ color: '#ff5f57' }}>  comando não encontrado:</span> {raw}{' '}
        <span className="dim">- tente</span> <span className="key">help</span>
      </>,
    ])
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const raw = value.trim()
    setValue('')
    addLines([<>{prompt}{raw}</>])
    if (!raw) return
    setHistory((current) => [...current, raw])
    setHistoryIndex(history.length + 1)
    run(raw)
  }

  return (
    <div className="term reveal d1" aria-label="Terminal interativo">
      <div className="term-bar">
        <div className="dotrow"><i /><i /><i /></div>
        <span className="tt"><b>guilherme</b>@tech: ~/portfolio</span>
        <span className="live">ONLINE</span>
      </div>
      <div className="term-body" ref={bodyRef} onClick={() => inputRef.current?.focus()}>
        {lines.map((line) => (
          <div className="tline" key={line.id}>{line.content}</div>
        ))}
        <form className="tinput-row" onSubmit={handleSubmit}>
          <span className="terminal-prompt pmt">guilherme@tech:~$</span>
          <input
            ref={inputRef}
            className="term-input"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'ArrowUp') {
                event.preventDefault()
                const next = Math.max(0, historyIndex - 1)
                setHistoryIndex(next)
                setValue(history[next] ?? '')
              }
              if (event.key === 'ArrowDown') {
                event.preventDefault()
                const next = Math.min(history.length, historyIndex + 1)
                setHistoryIndex(next)
                setValue(history[next] ?? '')
              }
            }}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Digite um comando"
          />
        </form>
      </div>
    </div>
  )
}

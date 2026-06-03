import { useEffect, useRef } from 'react'

interface NodeParticle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export default function NodeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!canvas || !ctx || reduced) return

    let frameId = 0
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let nodes: NodeParticle[] = []
    let accent = '#22e6ff'
    let mouseX = -9999
    let mouseY = -9999

    const readAccent = () => {
      accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#22e6ff'
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth * dpr
      height = window.innerHeight * dpr
      canvas.width = width
      canvas.height = height
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      const count = Math.min(58, Math.floor(window.innerWidth / 26))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14 * dpr,
        vy: (Math.random() - 0.5) * 0.14 * dpr,
        r: (Math.random() * 1.6 + 0.7) * dpr,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const maxDistance = 132 * dpr

      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1

        const dx = node.x - mouseX
        const dy = node.y - mouseY
        const distance = Math.hypot(dx, dy)
        if (distance > 0 && distance < 150 * dpr) {
          node.x += (dx / distance) * 0.5
          node.y += (dy / distance) * 0.5
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i]
          const b = nodes[j]
          const distance = Math.hypot(a.x - b.x, a.y - b.y)
          if (distance < maxDistance) {
            ctx.strokeStyle = accent
            ctx.globalAlpha = (1 - distance / maxDistance) * 0.16
            ctx.lineWidth = dpr
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 0.55
      for (const node of nodes) {
        ctx.fillStyle = accent
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      frameId = requestAnimationFrame(draw)
    }

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX * dpr
      mouseY = event.clientY * dpr
    }

    const onMouseLeave = () => {
      mouseX = -9999
      mouseY = -9999
    }

    readAccent()
    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('gm-theme', readAccent)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('gm-theme', readAccent)
    }
  }, [])

  return <canvas id="node-canvas" ref={canvasRef} aria-hidden="true" />
}

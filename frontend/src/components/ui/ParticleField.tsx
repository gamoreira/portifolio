import { useEffect, useRef, useCallback } from 'react'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  color: string
  opacity: number
  vx: number
  vy: number
  shape: 'circle' | 'square' | 'diamond'
  rotation: number
  rotationSpeed: number
}

const COLORS = [
  '#6366f1', // brand-500 indigo
  '#818cf8', // indigo-400
  '#4f46e5', // brand-600
  '#a5b4fc', // indigo-300
  '#4338ca', // brand-700
  '#c7d2fe', // indigo-200
  '#312e81', // indigo-900
  '#8b5cf6', // violet-500
  '#7c3aed', // violet-600
  '#a78bfa', // violet-400
  '#475569', // slate-600
  '#64748b', // slate-500
]

const PARTICLE_COUNT = 120
const MOUSE_RADIUS = 200
const REPEL_FORCE = 8
const RETURN_SPEED = 0.04
const FRICTION = 0.92

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const animationRef = useRef<number>(0)
  const dimensionsRef = useRef({ w: 0, h: 0 })

  const createParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = []
    const shapes: Particle['shape'][] = ['circle', 'square', 'diamond']

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = Math.random() * width
      const y = Math.random() * height
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 5 + 1.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.6 + 0.2,
        vx: 0,
        vy: 0,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      })
    }
    return particles
  }, [])

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.save()
    ctx.globalAlpha = p.opacity
    ctx.fillStyle = p.color
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation)

    switch (p.shape) {
      case 'circle':
        ctx.beginPath()
        ctx.arc(0, 0, p.size, 0, Math.PI * 2)
        ctx.fill()
        break
      case 'square':
        ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2)
        break
      case 'diamond':
        ctx.beginPath()
        ctx.moveTo(0, -p.size * 1.2)
        ctx.lineTo(p.size * 1.2, 0)
        ctx.lineTo(0, p.size * 1.2)
        ctx.lineTo(-p.size * 1.2, 0)
        ctx.closePath()
        ctx.fill()
        break
    }

    ctx.restore()
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { w, h } = dimensionsRef.current
    ctx.clearRect(0, 0, w, h)

    const mx = mouseRef.current.x
    const my = mouseRef.current.y

    for (const p of particlesRef.current) {
      // Mouse repulsion
      const dx = p.x - mx
      const dy = p.y - my
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS
        const angle = Math.atan2(dy, dx)
        p.vx += Math.cos(angle) * force * REPEL_FORCE
        p.vy += Math.sin(angle) * force * REPEL_FORCE
      }

      // Return to base position
      p.vx += (p.baseX - p.x) * RETURN_SPEED
      p.vy += (p.baseY - p.y) * RETURN_SPEED

      // Apply friction
      p.vx *= FRICTION
      p.vy *= FRICTION

      // Update position
      p.x += p.vx
      p.y += p.vy

      // Rotate
      p.rotation += p.rotationSpeed

      // Dynamic opacity based on distance from base
      const displacement = Math.sqrt(
        (p.x - p.baseX) ** 2 + (p.y - p.baseY) ** 2
      )
      const baseOpacity = p.opacity
      const extraGlow = Math.min(displacement / 100, 0.4)
      ctx.globalAlpha = baseOpacity + extraGlow

      drawParticle(ctx, p)
    }

    // Draw subtle connection lines between nearby particles
    ctx.globalAlpha = 1
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const a = particlesRef.current[i]
        const b = particlesRef.current[j]
        const dx = a.x - b.x
        const dy = a.y - b.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < 80) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 80)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.stroke()
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [drawParticle])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const parent = canvas.parentElement
    if (!parent) return

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)

      dimensionsRef.current = { w: rect.width, h: rect.height }
      particlesRef.current = createParticles(rect.width, rect.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect()
        mouseRef.current = {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        }
      }
    }

    const handleTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    resize()
    animationRef.current = requestAnimationFrame(animate)

    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true })
    canvas.addEventListener('touchend', handleTouchEnd)

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
    }
  }, [animate, createParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 1 }}
    />
  )
}

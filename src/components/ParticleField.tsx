import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  color: string
  type: 'star' | 'heart' | 'sparkle'
  life: number
  maxLife: number
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const particles: Particle[] = []
    const colors = ['#c9a96e', '#ff3d7f', '#e8c9a0', '#ffffff', '#ff85b3', '#f5c842']

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.5 - 0.1,
      radius: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.6 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
      type: Math.random() < 0.1 ? 'heart' : Math.random() < 0.2 ? 'sparkle' : 'star',
      life: 0,
      maxLife: Math.random() * 300 + 200,
    })

    for (let i = 0; i < 120; i++) {
      const p = createParticle()
      p.life = Math.random() * p.maxLife
      particles.push(p)
    }

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.beginPath()
      ctx.moveTo(0, -size * 0.3)
      ctx.bezierCurveTo(size * 0.5, -size * 0.8, size, -size * 0.1, 0, size * 0.6)
      ctx.bezierCurveTo(-size, -size * 0.1, -size * 0.5, -size * 0.8, 0, -size * 0.3)
      ctx.fill()
      ctx.restore()
    }

    const drawSparkle = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save()
      ctx.translate(x, y)
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 4)
        ctx.beginPath()
        ctx.moveTo(0, -size)
        ctx.lineTo(size * 0.15, -size * 0.15)
        ctx.lineTo(0, size)
        ctx.lineTo(-size * 0.15, -size * 0.15)
        ctx.closePath()
        ctx.fill()
      }
      ctx.restore()
    }

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connection lines between nearby stars
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 80 && particles[i].type === 'star' && particles[j].type === 'star') {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(201, 169, 110, ${0.08 * (1 - dist / 80)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      particles.forEach((p, idx) => {
        p.x += p.vx
        p.y += p.vy
        p.life++

        const lifeRatio = p.life / p.maxLife
        const fadeAlpha = lifeRatio < 0.1 ? lifeRatio * 10 : lifeRatio > 0.9 ? (1 - lifeRatio) * 10 : 1
        const currentAlpha = p.alpha * fadeAlpha

        ctx.globalAlpha = currentAlpha
        ctx.fillStyle = p.color

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.radius * 3)
        } else if (p.type === 'sparkle') {
          drawSparkle(ctx, p.x, p.y, p.radius * 4)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.globalAlpha = 1

        if (p.life >= p.maxLife || p.y < -10 || p.x < -10 || p.x > canvas.width + 10) {
          particles[idx] = createParticle()
          particles[idx].y = canvas.height + 5
        }
      })

      animId = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  )
}

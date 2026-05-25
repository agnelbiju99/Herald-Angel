import { useEffect, useRef } from 'react'

const PETAL_COUNT = 28

function createPetal(width) {
  const colors = ['#f4a7b9', '#f8c8d4', '#f9d5de', '#f2b5c5', '#fce4ec']
  return {
    x: Math.random() * width,
    y: -40 - Math.random() * 200,
    size: Math.random() * 10 + 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 1.2 + 0.5,
    drift: (Math.random() - 0.5) * 0.6,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 2,
    opacity: Math.random() * 0.5 + 0.3,
    wobble: Math.random() * Math.PI * 2,
    wobbleSpeed: Math.random() * 0.02 + 0.01,
  }
}

export default function RosePetals() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const petals = Array.from({ length: PETAL_COUNT }, () => createPetal(canvas.width))

    const drawPetal = (p) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.globalAlpha = p.opacity

      ctx.beginPath()
      ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.shadowColor = p.color
      ctx.shadowBlur = 4
      ctx.fill()

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      petals.forEach(p => {
        p.y += p.speed
        p.wobble += p.wobbleSpeed
        p.x += p.drift + Math.sin(p.wobble) * 0.5
        p.rotation += p.rotationSpeed

        if (p.y > canvas.height + 50) {
          Object.assign(p, createPetal(canvas.width))
          p.y = -40
        }

        drawPetal(p)
      })

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
    />
  )
}

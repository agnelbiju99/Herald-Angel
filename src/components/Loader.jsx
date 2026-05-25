import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function Loader({ onComplete }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = 200
    canvas.height = 200

    const cx = 100, cy = 100
    let progress = 0
    let animId

    // Diamond points
    const diamond = [
      [cx, cy - 60],
      [cx + 42, cy - 42],
      [cx + 60, cy],
      [cx + 42, cy + 42],
      [cx, cy + 60],
      [cx - 42, cy + 42],
      [cx - 60, cy],
      [cx - 42, cy - 42],
      [cx, cy - 60],
    ]

    const totalLen = diamond.length - 1

    const draw = () => {
      ctx.clearRect(0, 0, 200, 200)

      // Glow
      ctx.shadowColor = '#d4af37'
      ctx.shadowBlur = 12
      ctx.strokeStyle = '#d4af37'
      ctx.lineWidth = 1.5
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      const segProgress = progress * totalLen
      const fullSegs = Math.floor(segProgress)
      const partial = segProgress - fullSegs

      ctx.beginPath()
      ctx.moveTo(diamond[0][0], diamond[0][1])
      for (let i = 1; i <= fullSegs && i < diamond.length; i++) {
        ctx.lineTo(diamond[i][0], diamond[i][1])
      }
      if (fullSegs < totalLen) {
        const x = diamond[fullSegs][0] + (diamond[fullSegs + 1][0] - diamond[fullSegs][0]) * partial
        const y = diamond[fullSegs][1] + (diamond[fullSegs + 1][1] - diamond[fullSegs][1]) * partial
        ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Inner diamond
      if (progress > 0.5) {
        const innerP = (progress - 0.5) * 2
        ctx.globalAlpha = innerP * 0.3
        ctx.beginPath()
        const inner = [
          [cx, cy - 30],
          [cx + 21, cy - 21],
          [cx + 30, cy],
          [cx + 21, cy + 21],
          [cx, cy + 30],
          [cx - 21, cy + 21],
          [cx - 30, cy],
          [cx - 21, cy - 21],
          [cx, cy - 30],
        ]
        ctx.moveTo(inner[0][0], inner[0][1])
        inner.slice(1).forEach(([x, y]) => ctx.lineTo(x, y))
        ctx.strokeStyle = '#f5d76e'
        ctx.lineWidth = 0.8
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      progress += 0.008
      if (progress < 1.05) {
        animId = requestAnimationFrame(draw)
      } else {
        setTimeout(onComplete, 400)
      }
    }

    setTimeout(() => draw(), 300)

    return () => cancelAnimationFrame(animId)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      style={{
        position: 'fixed', inset: 0, background: '#0a0a0a',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <canvas ref={canvasRef} width={200} height={200} />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: 'rgba(212,175,55,0.6)',
          marginTop: '24px',
          textTransform: 'uppercase',
        }}
      >
        Herald &amp; Angel
      </motion.p>
    </motion.div>
  )
}

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

    const diamond = [
      [cx, cy - 60],[cx + 42, cy - 42],[cx + 60, cy],[cx + 42, cy + 42],
      [cx, cy + 60],[cx - 42, cy + 42],[cx - 60, cy],[cx - 42, cy - 42],[cx, cy - 60],
    ]
    const totalLen = diamond.length - 1

    const draw = () => {
      ctx.clearRect(0, 0, 200, 200)
      ctx.shadowColor = '#b8860b'
      ctx.shadowBlur = 8
      ctx.strokeStyle = '#b8860b'
      ctx.lineWidth = 1.5
      ctx.lineCap = 'round'

      const segProgress = progress * totalLen
      const fullSegs = Math.floor(segProgress)
      const partial = segProgress - fullSegs

      ctx.beginPath()
      ctx.moveTo(diamond[0][0], diamond[0][1])
      for (let i = 1; i <= fullSegs && i < diamond.length; i++) ctx.lineTo(diamond[i][0], diamond[i][1])
      if (fullSegs < totalLen) {
        const x = diamond[fullSegs][0] + (diamond[fullSegs+1][0] - diamond[fullSegs][0]) * partial
        const y = diamond[fullSegs][1] + (diamond[fullSegs+1][1] - diamond[fullSegs][1]) * partial
        ctx.lineTo(x, y)
      }
      ctx.stroke()

      progress += 0.008
      if (progress < 1.05) animId = requestAnimationFrame(draw)
      else setTimeout(onComplete, 400)
    }

    setTimeout(() => draw(), 300)
    return () => cancelAnimationFrame(animId)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      style={{
        position: 'fixed', inset: 0,
        background: '#fdf8f0',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      {/* Small floral top decoration */}
      <svg width="80" height="40" viewBox="0 0 80 40" style={{ marginBottom: '8px', opacity: 0.4 }}>
        <circle cx="40" cy="20" r="10" fill="#e8a0b0"/>
        <circle cx="40" cy="20" r="6" fill="#f5c8cc"/>
        <circle cx="20" cy="25" r="7" fill="#d4889a"/>
        <circle cx="20" cy="25" r="4" fill="#f0b8be"/>
        <circle cx="60" cy="25" r="7" fill="#d4889a"/>
        <circle cx="60" cy="25" r="4" fill="#f0b8be"/>
        <ellipse cx="30" cy="32" rx="6" ry="12" fill="#8fae7e" opacity="0.6" transform="rotate(-20 30 32)"/>
        <ellipse cx="50" cy="32" rx="6" ry="12" fill="#7a9e6e" opacity="0.6" transform="rotate(20 50 32)"/>
      </svg>
      <canvas ref={canvasRef} width={200} height={200} />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: 'rgba(184,134,11,0.6)',
          marginTop: '16px',
          textTransform: 'uppercase',
        }}
      >
        Herald &amp; Angel
      </motion.p>
    </motion.div>
  )
}

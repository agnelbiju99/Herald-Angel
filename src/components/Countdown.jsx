import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const EVENT_DATE = new Date('2026-10-01T18:00:00+05:30')
function pad(n) { return String(n).padStart(2, '0') }

export default function Countdown() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = EVENT_DATE - Date.now()
      if (diff <= 0) { setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setTime({ days: Math.floor(diff/86400000), hours: Math.floor((diff%86400000)/3600000), minutes: Math.floor((diff%3600000)/60000), seconds: Math.floor((diff%60000)/1000) })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [])

  const units = [{ label: 'Days', value: time.days }, { label: 'Hours', value: pad(time.hours) }, { label: 'Minutes', value: pad(time.minutes) }, { label: 'Seconds', value: pad(time.seconds) }]

  return (
    <div style={{ display: 'flex', gap: 'clamp(16px,4vw,40px)', justifyContent: 'center', alignItems: 'flex-end', flexWrap: 'wrap' }}>
      {units.map((u, i) => (
        <motion.div key={u.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.6 }} style={{ textAlign: 'center', minWidth: '60px' }}>
          <div className="countdown-digit">{u.value}</div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(184,134,11,0.5)', marginTop: '4px', textTransform: 'uppercase' }}>{u.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

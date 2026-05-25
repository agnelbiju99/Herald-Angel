import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const gold = '#b8860b'
const text = '#2c1810'
const muted = 'rgba(44,24,16,0.55)'
const soft = 'rgba(44,24,16,0.38)'

export default function EventCard({ label, dayDate, time, venueName, venueAddress, mapsEmbed }) {
  const [mapOpen, setMapOpen] = useState(false)

  return (
    <>
      <motion.div
        className="deco-card shimmer"
        onClick={() => setMapOpen(true)}
        whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(184,134,11,0.15)' }}
        transition={{ duration: 0.3 }}
        style={{ padding: 'clamp(24px,5vw,40px)', cursor: 'pointer', textAlign: 'center', borderRadius: '4px', flex: 1, minWidth: '260px', maxWidth: '420px' }}
      >
        <div className="corner-tr" /><div className="corner-bl" />

        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(184,134,11,0.6)', textTransform: 'uppercase', marginBottom: '16px' }}>
          {label}
        </div>

        {/* Floral divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', justifyContent: 'center' }}>
          <div style={{ height: '1px', width: '28px', background: `linear-gradient(to right, transparent, rgba(184,134,11,0.3))` }} />
          <svg width="20" height="12" viewBox="0 0 20 12">
            <circle cx="10" cy="6" r="4" fill="#f0b8be" opacity="0.7"/>
            <circle cx="10" cy="6" r="2.5" fill="#fad8da"/>
            <circle cx="3" cy="7" r="2.5" fill="#e8a0b0" opacity="0.6"/>
            <circle cx="17" cy="7" r="2.5" fill="#e8a0b0" opacity="0.6"/>
          </svg>
          <div style={{ height: '1px', width: '28px', background: `linear-gradient(to left, transparent, rgba(184,134,11,0.3))` }} />
        </div>

        <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 'clamp(18px,4vw,26px)', color: text, marginBottom: '8px', lineHeight: 1.2 }}>
          {dayDate}
        </div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(15px,3vw,19px)', color: muted, marginBottom: '16px' }}>
          {time}
        </div>
        <div style={{ width: '40px', height: '1px', background: 'rgba(184,134,11,0.2)', margin: '0 auto 16px' }} />
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(13px,2.5vw,16px)', color: text, marginBottom: '6px', letterSpacing: '0.05em' }}>
          {venueName}
        </div>
        <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '14px', color: soft, marginBottom: '16px' }}>
          {venueAddress}
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(184,134,11,0.5)', textTransform: 'uppercase' }}>
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M5 0C3.07 0 1.5 1.57 1.5 3.5C1.5 6.13 5 10 5 10C5 10 8.5 6.13 8.5 3.5C8.5 1.57 6.93 0 5 0ZM5 4.75C4.31 4.75 3.75 4.19 3.75 3.5C3.75 2.81 4.31 2.25 5 2.25C5.69 2.25 6.25 2.81 6.25 3.5C6.25 4.19 5.69 4.75 5 4.75Z" fill="rgba(184,134,11,0.5)"/>
          </svg>
          View on Maps
        </div>
      </motion.div>

      <AnimatePresence>
        {mapOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMapOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(44,24,16,0.6)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()} className="deco-card" style={{ width: '100%', maxWidth: '600px', overflow: 'hidden', borderRadius: '4px' }}>
              <div className="corner-tr" /><div className="corner-bl" />
              <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.2em', color: gold, textTransform: 'uppercase' }}>{venueName}</span>
                <button onClick={() => setMapOpen(false)} style={{ background: 'none', border: 'none', color: muted, cursor: 'pointer', fontSize: '18px' }}>×</button>
              </div>
              <iframe src={mapsEmbed} width="100%" height="350" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`Map for ${venueName}`} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

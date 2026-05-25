import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function EventCard({ label, dayDate, time, venueName, venueAddress, mapsEmbed }) {
  const [mapOpen, setMapOpen] = useState(false)

  return (
    <>
      <motion.div
        className="deco-card shimmer"
        onClick={() => setMapOpen(true)}
        whileHover={{ y: -4, boxShadow: '0 16px 48px rgba(212,175,55,0.15)' }}
        transition={{ duration: 0.3 }}
        style={{
          padding: 'clamp(24px, 5vw, 40px)',
          cursor: 'pointer',
          textAlign: 'center',
          borderRadius: '2px',
          flex: 1,
          minWidth: '260px',
          maxWidth: '420px',
        }}
      >
        <div className="corner-tr" /><div className="corner-bl" />

        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '9px',
          letterSpacing: '0.35em',
          color: 'rgba(212,175,55,0.6)',
          textTransform: 'uppercase',
          marginBottom: '20px',
        }}>
          {label}
        </div>

        {/* Ornamental line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', justifyContent: 'center' }}>
          <div style={{ height: '1px', width: '30px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.4))' }} />
          <div style={{ width: '4px', height: '4px', background: '#d4af37', transform: 'rotate(45deg)' }} />
          <div style={{ height: '1px', width: '30px', background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.4))' }} />
        </div>

        <div style={{
          fontFamily: 'Cinzel Decorative, serif',
          fontSize: 'clamp(18px, 4vw, 26px)',
          color: '#d4af37',
          marginBottom: '8px',
          lineHeight: 1.2,
        }}>
          {dayDate}
        </div>

        <div style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: 'clamp(15px, 3vw, 19px)',
          color: 'rgba(245,240,232,0.7)',
          marginBottom: '20px',
        }}>
          {time}
        </div>

        <div style={{
          width: '40px', height: '1px',
          background: 'rgba(212,175,55,0.3)',
          margin: '0 auto 20px',
        }} />

        <div style={{
          fontFamily: 'Cinzel, serif',
          fontSize: 'clamp(13px, 2.5vw, 16px)',
          color: '#f5f0e8',
          marginBottom: '6px',
          letterSpacing: '0.05em',
        }}>
          {venueName}
        </div>
        <div style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontStyle: 'italic',
          fontSize: '14px',
          color: 'rgba(245,240,232,0.45)',
          marginBottom: '20px',
        }}>
          {venueAddress}
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'Cinzel, serif',
          fontSize: '9px',
          letterSpacing: '0.2em',
          color: 'rgba(212,175,55,0.5)',
          textTransform: 'uppercase',
        }}>
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M5 0C3.07 0 1.5 1.57 1.5 3.5C1.5 6.13 5 10 5 10C5 10 8.5 6.13 8.5 3.5C8.5 1.57 6.93 0 5 0ZM5 4.75C4.31 4.75 3.75 4.19 3.75 3.5C3.75 2.81 4.31 2.25 5 2.25C5.69 2.25 6.25 2.81 6.25 3.5C6.25 4.19 5.69 4.75 5 4.75Z" fill="rgba(212,175,55,0.5)"/>
          </svg>
          View on Maps
        </div>
      </motion.div>

      <AnimatePresence>
        {mapOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMapOpen(false)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.85)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
              className="deco-card"
              style={{ width: '100%', maxWidth: '600px', overflow: 'hidden', borderRadius: '2px' }}
            >
              <div className="corner-tr" /><div className="corner-bl" />
              <div style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.2em', color: '#d4af37', textTransform: 'uppercase' }}>
                  {venueName}
                </span>
                <button
                  onClick={() => setMapOpen(false)}
                  style={{ background: 'none', border: 'none', color: 'rgba(245,240,232,0.4)', cursor: 'pointer', fontSize: '18px' }}
                >×</button>
              </div>
              <iframe
                src={mapsEmbed}
                width="100%"
                height="350"
                style={{ border: 0, display: 'block' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map for ${venueName}`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

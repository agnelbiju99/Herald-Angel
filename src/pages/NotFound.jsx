import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center',
      padding: '40px 24px',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ margin: '0 auto 24px', display: 'block' }}>
          <polygon points="40,4 76,68 4,68" fill="none" stroke="rgba(212,175,55,0.25)" strokeWidth="1"/>
          <polygon points="40,16 66,62 14,62" fill="none" stroke="rgba(212,175,55,0.12)" strokeWidth="0.5"/>
        </svg>

        <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 'clamp(48px, 10vw, 80px)', color: 'rgba(212,175,55,0.15)', lineHeight: 1, marginBottom: '12px' }}>
          404
        </div>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.35em', color: 'rgba(212,175,55,0.5)', textTransform: 'uppercase', marginBottom: '20px' }}>
          Invitation Not Found
        </div>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '18px', color: 'rgba(245,240,232,0.4)', maxWidth: '400px', margin: '0 auto 32px', lineHeight: 1.7 }}>
          This invitation link does not exist or may have been removed.
        </p>
        <Link to="/dashboard" style={{
          fontFamily: 'Cinzel, serif',
          fontSize: '10px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#d4af37',
          textDecoration: 'none',
          border: '1px solid rgba(212,175,55,0.3)',
          padding: '12px 28px',
          borderRadius: '2px',
          transition: 'background 0.2s',
        }}>
          Go to Dashboard
        </Link>
      </motion.div>
    </div>
  )
}

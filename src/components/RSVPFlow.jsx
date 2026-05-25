import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase'

const gold = '#b8860b'
const text = '#2c1810'
const muted = 'rgba(44,24,16,0.55)'
const soft = 'rgba(44,24,16,0.38)'

export default function RSVPFlow({ inviteeId, guestName, initialRsvp }) {
  const [step, setStep] = useState(initialRsvp && initialRsvp !== 'pending' ? 3 : 1)
  const [choice, setChoice] = useState(initialRsvp || null)
  const [count, setCount] = useState(1)
  const [loading, setLoading] = useState(false)
  const [finalStatus, setFinalStatus] = useState(initialRsvp || null)

  const confirm = async () => {
    setLoading(true)
    try {
      await supabase.from('invitees').update({ rsvp: choice, guest_count: choice === 'attending' ? count : 0, responded_at: new Date().toISOString() }).eq('id', inviteeId)
      setFinalStatus(choice)
      setStep(3)
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  const btnBase = {
    fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.2em',
    textTransform: 'uppercase', border: '1px solid', cursor: 'pointer',
    padding: '12px 28px', transition: 'all 0.3s', background: 'transparent', borderRadius: '3px',
  }

  return (
    <div style={{ minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }} style={{ textAlign: 'center', width: '100%' }}>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(184,134,11,0.7)', marginBottom: '24px', textTransform: 'uppercase' }}>
              Will you be joining us?
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { setChoice('attending'); setStep(2) }} style={{ ...btnBase, borderColor: gold, color: gold }}
                onMouseEnter={e => e.target.style.background = 'rgba(184,134,11,0.08)'}
                onMouseLeave={e => e.target.style.background = 'transparent'}>
                🥂 Joyfully Accept
              </button>
              <button onClick={() => { setChoice('declined'); setStep(2) }} style={{ ...btnBase, borderColor: 'rgba(44,24,16,0.2)', color: muted }}
                onMouseEnter={e => e.target.style.background = 'rgba(44,24,16,0.04)'}
                onMouseLeave={e => e.target.style.background = 'transparent'}>
                🙏 Regretfully Decline
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && choice === 'attending' && (
          <motion.div key="s2a" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }} style={{ textAlign: 'center', width: '100%' }}>
            <p style={{ fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.25em', color: 'rgba(184,134,11,0.7)', marginBottom: '8px', textTransform: 'uppercase' }}>How many guests will be joining?</p>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '13px', color: soft, marginBottom: '24px' }}>Including yourself</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '28px' }}>
              <button onClick={() => setCount(c => Math.max(1, c - 1))} style={{ ...btnBase, padding: '8px 16px', borderColor: 'rgba(184,134,11,0.3)', color: gold, fontSize: '18px' }}>−</button>
              <span style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: '36px', color: gold, minWidth: '50px', textAlign: 'center' }}>{count}</span>
              <button onClick={() => setCount(c => Math.min(20, c + 1))} style={{ ...btnBase, padding: '8px 16px', borderColor: 'rgba(184,134,11,0.3)', color: gold, fontSize: '18px' }}>+</button>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setStep(1)} style={{ ...btnBase, borderColor: 'rgba(44,24,16,0.15)', color: soft, fontSize: '10px' }}>← Back</button>
              <button onClick={confirm} disabled={loading} style={{ ...btnBase, borderColor: gold, color: '#fff', background: gold, fontSize: '10px' }}>
                {loading ? 'Confirming…' : 'Confirm Attendance'}
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && choice === 'declined' && (
          <motion.div key="s2b" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }} style={{ textAlign: 'center', width: '100%' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '18px', color: muted, marginBottom: '28px', lineHeight: 1.6 }}>
              We shall miss your presence,<br />but understand completely.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setStep(1)} style={{ ...btnBase, borderColor: 'rgba(44,24,16,0.15)', color: soft, fontSize: '10px' }}>← Back</button>
              <button onClick={confirm} disabled={loading} style={{ ...btnBase, borderColor: 'rgba(184,134,11,0.4)', color: gold, fontSize: '10px' }}>
                {loading ? 'Sending…' : 'Send Response'}
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} style={{ textAlign: 'center', width: '100%' }}>
            {(finalStatus === 'attending' || choice === 'attending') ? (
              <>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🥂</div>
                <p style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 'clamp(14px,3vw,18px)', color: gold, marginBottom: '10px' }}>We are delighted!</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '17px', color: muted, lineHeight: 1.7 }}>
                  Your presence shall make this day truly blessed.<br />We look forward to celebrating with you.
                </p>
              </>
            ) : (
              <>
                <div style={{ fontSize: '28px', marginBottom: '12px' }}>🙏</div>
                <p style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 'clamp(13px,3vw,16px)', color: 'rgba(184,134,11,0.7)', marginBottom: '10px' }}>Thank you for letting us know</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '16px', color: muted, lineHeight: 1.7 }}>
                  Your love and prayers are always cherished.
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function StatCard({ label, value, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        background: '#111',
        border: '1px solid rgba(212,175,55,0.15)',
        borderRadius: '4px',
        padding: '20px 24px',
        flex: '1 1 140px',
        minWidth: '120px',
      }}
    >
      <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(245,240,232,0.4)', textTransform: 'uppercase', marginBottom: '8px' }}>
        {label}
      </div>
      <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: '36px', color, lineHeight: 1 }}>
        {value}
      </div>
    </motion.div>
  )
}

export default function OverviewTab({ invitees }) {
  const attending = invitees.filter(i => i.rsvp === 'attending')
  const declined = invitees.filter(i => i.rsvp === 'declined')
  const pending = invitees.filter(i => i.rsvp === 'pending')
  const totalGuests = attending.reduce((s, i) => s + (i.guest_count || 0), 0)
  const responded = invitees.filter(i => i.rsvp !== 'pending').length
  const responseRate = invitees.length ? (responded / invitees.length) * 100 : 0
  const attendRate = invitees.length ? (attending.length / invitees.length) * 100 : 0
  const declineRate = invitees.length ? (declined.length / invitees.length) * 100 : 0
  const pendingRate = 100 - attendRate - declineRate

  const recent = [...invitees]
    .filter(i => i.responded_at)
    .sort((a, b) => new Date(b.responded_at) - new Date(a.responded_at))
    .slice(0, 8)

  const barRef = useRef(null)
  const [barVisible, setBarVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setBarVisible(true) }, { threshold: 0.3 })
    if (barRef.current) obs.observe(barRef.current)
    return () => obs.disconnect()
  }, [])

  const statusLabel = (r) => {
    if (r === 'attending') return { label: 'Attending', color: '#4ade80' }
    if (r === 'declined') return { label: 'Declined', color: '#f87171' }
    return { label: 'Pending', color: '#fbbf24' }
  }

  return (
    <div>
      {/* Stat cards */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '28px' }}>
        <StatCard label="Total Invited" value={invitees.length} color="#d4af37" delay={0} />
        <StatCard label="Attending" value={attending.length} color="#4ade80" delay={0.05} />
        <StatCard label="Declined" value={declined.length} color="#f87171" delay={0.1} />
        <StatCard label="Pending" value={pending.length} color="#fbbf24" delay={0.15} />
        <StatCard label="Total Guests" value={totalGuests} color="#d4af37" delay={0.2} />
      </div>

      {/* Response rate bar */}
      <div ref={barRef} style={{ marginBottom: '28px' }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(245,240,232,0.4)', textTransform: 'uppercase', marginBottom: '10px' }}>
          Response Rate — {Math.round(responseRate)}%
        </div>
        <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: barVisible ? `${attendRate}%` : 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: '#4ade80', height: '100%' }}
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: barVisible ? `${declineRate}%` : 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: '#f87171', height: '100%' }}
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: barVisible ? `${pendingRate}%` : 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: '#fbbf24', height: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '16px', marginTop: '8px', flexWrap: 'wrap' }}>
          {[['#4ade80', `Attending ${Math.round(attendRate)}%`], ['#f87171', `Declined ${Math.round(declineRate)}%`], ['#fbbf24', `Pending ${Math.round(pendingRate)}%`]].map(([c, t]) => (
            <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: c }} />
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.1em' }}>{t}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent responses */}
      <div>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.25em', color: 'rgba(245,240,232,0.4)', textTransform: 'uppercase', marginBottom: '14px' }}>
          Recent Responses
        </div>
        {recent.length === 0 ? (
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: 'rgba(245,240,232,0.3)', fontSize: '15px', padding: '20px 0' }}>
            No responses yet
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recent.map(inv => {
              const s = statusLabel(inv.rsvp)
              return (
                <div key={inv.id} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(212,175,55,0.08)',
                  borderRadius: '3px',
                  flexWrap: 'wrap', gap: '8px',
                }}>
                  <span style={{ fontFamily: 'Cinzel, serif', fontSize: '12px', color: '#f5f0e8', letterSpacing: '0.05em' }}>{inv.name}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', color: 'rgba(245,240,232,0.3)' }}>
                      {inv.responded_at ? new Date(inv.responded_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : '—'}
                    </span>
                    <span style={{
                      fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.2em',
                      color: s.color, padding: '3px 8px',
                      border: `1px solid ${s.color}40`, borderRadius: '2px',
                      textTransform: 'uppercase',
                    }}>
                      {s.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import OverviewTab from '../components/OverviewTab'
import AllInviteesTab from '../components/AllInviteesTab'
import AddImportTab from '../components/AddImportTab'

const TABS = ['Overview', 'All Invitees', 'Add & Import']

export default function Dashboard() {
  const [tab, setTab] = useState(0)
  const [invitees, setInvitees] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchInvitees = useCallback(async () => {
    const { data } = await supabase
      .from('invitees')
      .select('*')
      .order('created_at', { ascending: false })
    setInvitees(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchInvitees() }, [fetchInvitees])

  return (
    <div style={{ minHeight: '100vh', background: '#080808', color: '#f5f0e8' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #0d0b07, #0a0805)',
        borderBottom: '1px solid rgba(212,175,55,0.12)',
        padding: 'clamp(16px, 3vw, 24px) clamp(20px, 4vw, 48px)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div>
          <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 'clamp(14px, 3vw, 20px)', color: '#d4af37', letterSpacing: '0.06em' }}>
            Herald &amp; Angel
          </div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(212,175,55,0.45)', textTransform: 'uppercase', marginTop: '4px' }}>
            Betrothal Dashboard
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.6)', textTransform: 'uppercase' }}>
            1st October 2026
          </div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '13px', color: 'rgba(245,240,232,0.3)', marginTop: '2px' }}>
            La Maria Castle, Thrissur
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(20px, 4vw, 40px) clamp(16px, 4vw, 32px)' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '2px', marginBottom: '28px', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
          {TABS.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Cinzel, serif',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: tab === i ? '#d4af37' : 'rgba(245,240,232,0.35)',
                padding: '12px 20px',
                position: 'relative',
                transition: 'color 0.2s',
              }}
            >
              {t}
              {tab === i && (
                <motion.div
                  layoutId="tabUnderline"
                  style={{
                    position: 'absolute',
                    bottom: -1,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: '#d4af37',
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: 'rgba(245,240,232,0.3)', fontSize: '18px' }}>
            Loading invitees…
          </div>
        ) : (
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === 0 && <OverviewTab invitees={invitees} />}
            {tab === 1 && <AllInviteesTab invitees={invitees} onRefresh={fetchInvitees} />}
            {tab === 2 && <AddImportTab onRefresh={fetchInvitees} />}
          </motion.div>
        )}
      </div>
    </div>
  )
}

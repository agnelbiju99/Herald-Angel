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
    const { data } = await supabase.from('invitees').select('*').order('created_at', { ascending: false })
    setInvitees(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchInvitees() }, [fetchInvitees])

  return (
    <div style={{ minHeight: '100vh', background: '#f7f0e6', color: '#2c1810' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(180deg, #fdf8f0, #faf3e8)',
        borderBottom: '1px solid rgba(184,134,11,0.15)',
        padding: 'clamp(16px,3vw,24px) clamp(20px,4vw,48px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '12px', position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 2px 16px rgba(184,134,11,0.08)',
      }}>
        <div>
          <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 'clamp(14px,3vw,20px)', color: '#b8860b', letterSpacing: '0.06em' }}>
            Herald &amp; Angel
          </div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(44,24,16,0.4)', textTransform: 'uppercase', marginTop: '4px' }}>
            Betrothal Dashboard
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.2em', color: 'rgba(44,24,16,0.6)', textTransform: 'uppercase' }}>
            1st October 2026
          </div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '13px', color: 'rgba(44,24,16,0.4)', marginTop: '2px' }}>
            La Maria Castle, Thrissur
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(20px,4vw,40px) clamp(16px,4vw,32px)' }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '2px', marginBottom: '28px', borderBottom: '1px solid rgba(184,134,11,0.15)' }}>
          {TABS.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'Cinzel, serif', fontSize: '10px', letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: tab === i ? '#b8860b' : 'rgba(44,24,16,0.4)',
              padding: '12px 20px', position: 'relative', transition: 'color 0.2s',
            }}>
              {t}
              {tab === i && (
                <motion.div layoutId="tabUnderline" style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: '2px', background: '#b8860b' }} transition={{ type: 'spring', stiffness: 500, damping: 40 }} />
              )}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', color: 'rgba(44,24,16,0.35)', fontSize: '18px' }}>
            Loading invitees…
          </div>
        ) : (
          <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            {tab === 0 && <OverviewTab invitees={invitees} />}
            {tab === 1 && <AllInviteesTab invitees={invitees} onRefresh={fetchInvitees} />}
            {tab === 2 && <AddImportTab onRefresh={fetchInvitees} />}
          </motion.div>
        )}
      </div>
    </div>
  )
}

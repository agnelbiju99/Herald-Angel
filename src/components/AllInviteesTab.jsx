import { useState } from 'react'
import { supabase } from '../lib/supabase'

const BASE_URL = window.location.origin

function buildWAMessage(name, slug) {
  return encodeURIComponent(`Greetings ${name}! The family of Herald Thomas and Swapna Biju cordially invite you to their Betrothal on Thursday 1st October 2026 at La Maria Castle, Eranellur, Thrissur at 6 PM. View your personal invitation here: ${BASE_URL}/invite/${slug}`)
}

const statusStyle = (rsvp) => {
  if (rsvp === 'attending') return { color: '#2d7a47', border: '1px solid #2d7a4740' }
  if (rsvp === 'declined') return { color: '#a33030', border: '1px solid #a3303040' }
  return { color: '#8a6500', border: '1px solid #8a650040' }
}

export default function AllInviteesTab({ invitees, onRefresh }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [deletingId, setDeletingId] = useState(null)
  const [copied, setCopied] = useState(null)

  const filtered = invitees.filter(inv => {
    const matchSearch = inv.name.toLowerCase().includes(search.toLowerCase()) || inv.slug.includes(search.toLowerCase())
    const matchFilter = filter === 'all' || inv.rsvp === filter
    return matchSearch && matchFilter
  })

  const handleDelete = async (inv) => {
    if (!window.confirm(`Delete invitation for "${inv.name}"? This cannot be undone.`)) return
    setDeletingId(inv.id)
    await supabase.from('invitees').delete().eq('id', inv.id)
    setDeletingId(null)
    onRefresh()
  }

  const handleCopy = (slug) => {
    navigator.clipboard.writeText(`${BASE_URL}/invite/${slug}`)
    setCopied(slug)
    setTimeout(() => setCopied(null), 2000)
  }

  const btnSm = {
    fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em',
    textTransform: 'uppercase', padding: '5px 10px', border: '1px solid',
    cursor: 'pointer', borderRadius: '2px', background: 'transparent',
    transition: 'all 0.2s', whiteSpace: 'nowrap',
  }

  return (
    <div>
      {/* Search + Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by name or slug…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: '1 1 220px', background: '#fffdf7', border: '1px solid rgba(184,134,11,0.2)', borderRadius: '3px', padding: '10px 14px', color: '#2c1810', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', outline: 'none' }}
        />
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['all', 'pending', 'attending', 'declined'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ ...btnSm, borderColor: filter === f ? '#b8860b' : 'rgba(184,134,11,0.25)', color: filter === f ? '#b8860b' : 'rgba(44,24,16,0.45)', background: filter === f ? 'rgba(184,134,11,0.08)' : 'transparent' }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fffdf7', border: '1px solid rgba(184,134,11,0.15)', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(184,134,11,0.06)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(184,134,11,0.12)', background: 'rgba(184,134,11,0.04)' }}>
                {['Name', 'Invitation Link', 'RSVP', 'Guests', 'Responded', 'Actions'].map(h => (
                  <th key={h} style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.25em', color: 'rgba(44,24,16,0.45)', textTransform: 'uppercase', textAlign: 'left', padding: '12px 16px', fontWeight: 400 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv, idx) => {
                const ss = statusStyle(inv.rsvp)
                const link = `${BASE_URL}/invite/${inv.slug}`
                return (
                  <tr key={inv.id} style={{ borderBottom: '1px solid rgba(184,134,11,0.08)', background: idx % 2 === 0 ? 'transparent' : 'rgba(184,134,11,0.02)', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(184,134,11,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? 'transparent' : 'rgba(184,134,11,0.02)'}
                  >
                    <td style={{ padding: '12px 16px', fontFamily: 'Cinzel, serif', fontSize: '12px', color: '#2c1810', letterSpacing: '0.04em' }}>{inv.name}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', color: 'rgba(44,24,16,0.45)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>/invite/{inv.slug}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '3px 8px', borderRadius: '2px', ...ss }}>{inv.rsvp}</span>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'Cinzel Decorative, serif', fontSize: '16px', color: '#2c1810', textAlign: 'center' }}>
                      {inv.rsvp === 'attending' ? inv.guest_count || 0 : '—'}
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', color: 'rgba(44,24,16,0.45)', whiteSpace: 'nowrap' }}>
                      {inv.responded_at ? new Date(inv.responded_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        <a href={`https://wa.me/${inv.phone ? inv.phone.replace(/\D/g,'') : ''}?text=${buildWAMessage(inv.name, inv.slug)}`} target="_blank" rel="noopener noreferrer"
                          style={{ ...btnSm, borderColor: '#25d366', color: '#1a7a43', textDecoration: 'none' }}
                          onMouseEnter={e => e.target.style.background = 'rgba(37,211,102,0.08)'}
                          onMouseLeave={e => e.target.style.background = 'transparent'}>WA</a>
                        <a href={link} target="_blank" rel="noopener noreferrer"
                          style={{ ...btnSm, borderColor: 'rgba(184,134,11,0.35)', color: '#8a6500', textDecoration: 'none' }}
                          onMouseEnter={e => e.target.style.background = 'rgba(184,134,11,0.08)'}
                          onMouseLeave={e => e.target.style.background = 'transparent'}>View</a>
                        <button onClick={() => handleCopy(inv.slug)}
                          style={{ ...btnSm, borderColor: 'rgba(44,24,16,0.2)', color: copied === inv.slug ? '#2d7a47' : 'rgba(44,24,16,0.5)' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(44,24,16,0.04)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          {copied === inv.slug ? '✓' : 'Copy'}
                        </button>
                        <button onClick={() => handleDelete(inv)} disabled={deletingId === inv.id}
                          style={{ ...btnSm, borderColor: 'rgba(163,48,48,0.3)', color: '#a33030' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(163,48,48,0.06)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                          {deletingId === inv.id ? '…' : 'Del'}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(44,24,16,0.35)', marginTop: '12px', textTransform: 'uppercase' }}>
        Showing {filtered.length} of {invitees.length} invitees
      </div>
    </div>
  )
}

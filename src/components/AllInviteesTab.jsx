import { useState } from 'react'
import { supabase } from '../lib/supabase'

const BASE_URL = window.location.origin

function buildWAMessage(name, slug) {
  return encodeURIComponent(
    `Greetings ${name}! The family of Herald Thomas and Swapna Biju cordially invite you to their Betrothal on Thursday 1st October 2026 at La Maria Castle, Eranellur, Thrissur at 6 PM. View your personal invitation here: ${BASE_URL}/invite/${slug}`
  )
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

  const statusStyle = (rsvp) => {
    if (rsvp === 'attending') return { color: '#4ade80', border: '1px solid #4ade8040' }
    if (rsvp === 'declined') return { color: '#f87171', border: '1px solid #f8717140' }
    return { color: '#fbbf24', border: '1px solid #fbbf2440' }
  }

  const handleDelete = async (inv) => {
    if (!window.confirm(`Delete invitation for "${inv.name}"? This cannot be undone.`)) return
    setDeletingId(inv.id)
    await supabase.from('invitees').delete().eq('id', inv.id)
    setDeletingId(null)
    onRefresh()
  }

  const handleCopy = (slug) => {
    const link = `${BASE_URL}/invite/${slug}`
    navigator.clipboard.writeText(link)
    setCopied(slug)
    setTimeout(() => setCopied(null), 2000)
  }

  const btnSm = {
    fontFamily: 'Cinzel, serif',
    fontSize: '8px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    padding: '5px 10px',
    border: '1px solid',
    cursor: 'pointer',
    borderRadius: '2px',
    background: 'transparent',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap',
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
          style={{
            flex: '1 1 220px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '3px',
            padding: '10px 14px',
            color: '#f5f0e8',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '15px',
            outline: 'none',
          }}
        />
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {['all', 'pending', 'attending', 'declined'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                ...btnSm,
                borderColor: filter === f ? '#d4af37' : 'rgba(212,175,55,0.2)',
                color: filter === f ? '#d4af37' : 'rgba(245,240,232,0.4)',
                background: filter === f ? 'rgba(212,175,55,0.08)' : 'transparent',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(212,175,55,0.12)' }}>
              {['Name', 'Invitation Link', 'RSVP', 'Guests', 'Responded', 'Actions'].map(h => (
                <th key={h} style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '8px',
                  letterSpacing: '0.25em',
                  color: 'rgba(212,175,55,0.5)',
                  textTransform: 'uppercase',
                  textAlign: 'left',
                  padding: '10px 12px',
                  fontWeight: 400,
                }}>
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
                <tr
                  key={inv.id}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.04)',
                    background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.04)'}
                  onMouseLeave={e => e.currentTarget.style.background = idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)'}
                >
                  <td style={{ padding: '12px', fontFamily: 'Cinzel, serif', fontSize: '12px', color: '#f5f0e8', letterSpacing: '0.04em' }}>
                    {inv.name}
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', color: 'rgba(245,240,232,0.4)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    /invite/{inv.slug}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.15em',
                      textTransform: 'uppercase', padding: '3px 8px', borderRadius: '2px',
                      ...ss,
                    }}>
                      {inv.rsvp}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'Cinzel Decorative, serif', fontSize: '16px', color: 'rgba(245,240,232,0.6)', textAlign: 'center' }}>
                    {inv.rsvp === 'attending' ? inv.guest_count || 0 : '—'}
                  </td>
                  <td style={{ padding: '12px', fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', color: 'rgba(245,240,232,0.35)', whiteSpace: 'nowrap' }}>
                    {inv.responded_at ? new Date(inv.responded_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }) : '—'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {/* WA */}
                      <a
                        href={`https://wa.me/${inv.phone ? inv.phone.replace(/\D/g, '') : ''}?text=${buildWAMessage(inv.name, inv.slug)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ ...btnSm, borderColor: '#25d366', color: '#25d366', textDecoration: 'none' }}
                        onMouseEnter={e => e.target.style.background = 'rgba(37,211,102,0.1)'}
                        onMouseLeave={e => e.target.style.background = 'transparent'}
                      >
                        WA
                      </a>
                      {/* View */}
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ ...btnSm, borderColor: 'rgba(212,175,55,0.3)', color: 'rgba(212,175,55,0.7)', textDecoration: 'none' }}
                        onMouseEnter={e => e.target.style.background = 'rgba(212,175,55,0.08)'}
                        onMouseLeave={e => e.target.style.background = 'transparent'}
                      >
                        View
                      </a>
                      {/* Copy */}
                      <button
                        onClick={() => handleCopy(inv.slug)}
                        style={{ ...btnSm, borderColor: 'rgba(245,240,232,0.15)', color: copied === inv.slug ? '#4ade80' : 'rgba(245,240,232,0.4)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,240,232,0.05)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        {copied === inv.slug ? '✓' : 'Copy'}
                      </button>
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(inv)}
                        disabled={deletingId === inv.id}
                        style={{ ...btnSm, borderColor: 'rgba(248,113,113,0.3)', color: 'rgba(248,113,113,0.6)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(248,113,113,0.08)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
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

      <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.15em', color: 'rgba(245,240,232,0.25)', marginTop: '12px', textTransform: 'uppercase' }}>
        Showing {filtered.length} of {invitees.length} invitees
      </div>
    </div>
  )
}

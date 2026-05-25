import { useState, useRef } from 'react'
import { supabase } from '../lib/supabase'
import { generateUniqueSlug } from '../lib/slugify'

const BASE_URL = window.location.origin

export default function AddImportTab({ onRefresh }) {
  // Single add
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [adding, setAdding] = useState(false)
  const [addedLink, setAddedLink] = useState(null)
  const [addError, setAddError] = useState('')
  const [copiedNew, setCopiedNew] = useState(false)

  // CSV import
  const [csvFile, setCsvFile] = useState(null)
  const [importing, setImporting] = useState(false)
  const [importProgress, setImportProgress] = useState(null)
  const [importDone, setImportDone] = useState(null)
  const fileRef = useRef(null)

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(212,175,55,0.15)',
    borderRadius: '3px',
    padding: '12px 16px',
    color: '#f5f0e8',
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '16px',
    outline: 'none',
    marginBottom: '12px',
    boxSizing: 'border-box',
  }

  const handleAdd = async () => {
    if (!name.trim()) { setAddError('Name is required'); return }
    setAddError('')
    setAdding(true)
    setAddedLink(null)
    try {
      const slug = await generateUniqueSlug(name.trim(), supabase)
      const { error } = await supabase.from('invitees').insert({
        name: name.trim(),
        slug,
        phone: phone.trim() || null,
      })
      if (error) throw error
      setAddedLink(`${BASE_URL}/invite/${slug}`)
      setName('')
      setPhone('')
      onRefresh()
    } catch (e) {
      setAddError(e.message || 'Failed to create invitation')
    }
    setAdding(false)
  }

  const handleCSV = async () => {
    if (!csvFile) return
    setImporting(true)
    setImportDone(null)
    setImportProgress(0)

    const text = await csvFile.text()
    const lines = text.split('\n').map(l => l.trim()).filter(Boolean)
    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[^a-z]/g, ''))
    const nameIdx = headers.indexOf('name')
    const phoneIdx = headers.indexOf('phone')

    if (nameIdx === -1) {
      setImportDone({ error: 'CSV must have a "name" column' })
      setImporting(false)
      return
    }

    const rows = lines.slice(1)
    let success = 0, failed = 0

    for (let i = 0; i < rows.length; i++) {
      setImportProgress(Math.round(((i + 1) / rows.length) * 100))
      const cols = rows[i].split(',').map(c => c.trim())
      const rowName = cols[nameIdx]
      const rowPhone = phoneIdx !== -1 ? cols[phoneIdx] : null
      if (!rowName) { failed++; continue }
      try {
        const slug = await generateUniqueSlug(rowName, supabase)
        await supabase.from('invitees').insert({ name: rowName, slug, phone: rowPhone || null })
        success++
      } catch {
        failed++
      }
    }

    setImportDone({ success, failed })
    setImporting(false)
    setCsvFile(null)
    onRefresh()
  }

  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>

      {/* Left: Single Add */}
      <div style={{ flex: '1 1 280px', minWidth: '260px' }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(212,175,55,0.6)', textTransform: 'uppercase', marginBottom: '20px' }}>
          Add Single Invitee
        </div>

        <input
          type="text"
          placeholder="Full Name *"
          value={name}
          onChange={e => setName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="WhatsApp Number (optional)"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          style={inputStyle}
        />

        {addError && (
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '14px', color: '#f87171', marginBottom: '12px' }}>
            {addError}
          </div>
        )}

        <button
          onClick={handleAdd}
          disabled={adding}
          style={{
            width: '100%',
            padding: '14px',
            background: 'linear-gradient(135deg, #d4af37, #f5d76e)',
            border: 'none',
            borderRadius: '2px',
            fontFamily: 'Cinzel, serif',
            fontSize: '10px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#0a0a0a',
            cursor: adding ? 'not-allowed' : 'pointer',
            opacity: adding ? 0.7 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {adding ? 'Creating…' : 'Create Invitation'}
        </button>

        {addedLink && (
          <div style={{
            marginTop: '16px',
            padding: '16px',
            background: 'rgba(74,222,128,0.06)',
            border: '1px solid rgba(74,222,128,0.2)',
            borderRadius: '3px',
          }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', color: '#4ade80', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '8px' }}>
              ✓ Invitation Created
            </div>
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', color: 'rgba(245,240,232,0.5)', wordBreak: 'break-all', marginBottom: '10px' }}>
              {addedLink}
            </div>
            <button
              onClick={() => { navigator.clipboard.writeText(addedLink); setCopiedNew(true); setTimeout(() => setCopiedNew(false), 2000) }}
              style={{
                background: 'transparent',
                border: '1px solid rgba(74,222,128,0.3)',
                color: copiedNew ? '#4ade80' : 'rgba(74,222,128,0.7)',
                fontFamily: 'Cinzel, serif',
                fontSize: '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '6px 14px',
                cursor: 'pointer',
                borderRadius: '2px',
              }}
            >
              {copiedNew ? '✓ Copied!' : 'Copy Link'}
            </button>
          </div>
        )}
      </div>

      {/* Right: CSV Import */}
      <div style={{ flex: '1 1 280px', minWidth: '260px' }}>
        <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.3em', color: 'rgba(212,175,55,0.6)', textTransform: 'uppercase', marginBottom: '20px' }}>
          Bulk CSV Import
        </div>

        <div
          onClick={() => fileRef.current?.click()}
          style={{
            border: `2px dashed ${csvFile ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.15)'}`,
            borderRadius: '4px',
            padding: '32px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            marginBottom: '16px',
            transition: 'border-color 0.2s',
            background: csvFile ? 'rgba(212,175,55,0.04)' : 'transparent',
          }}
          onDragOver={e => e.preventDefault()}
          onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f?.name.endsWith('.csv')) setCsvFile(f) }}
        >
          <div style={{ fontSize: '24px', marginBottom: '8px' }}>📄</div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.5)', textTransform: 'uppercase' }}>
            {csvFile ? csvFile.name : 'Drop CSV here or click to browse'}
          </div>
          {csvFile && (
            <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '13px', color: 'rgba(245,240,232,0.3)', marginTop: '4px' }}>
              {(csvFile.size / 1024).toFixed(1)} KB
            </div>
          )}
        </div>

        <input ref={fileRef} type="file" accept=".csv" style={{ display: 'none' }} onChange={e => setCsvFile(e.target.files[0])} />

        {importing && (
          <div style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', color: 'rgba(245,240,232,0.4)', letterSpacing: '0.15em' }}>Importing…</span>
              <span style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: '14px', color: '#d4af37' }}>{importProgress}%</span>
            </div>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{ width: `${importProgress}%`, height: '100%', background: 'linear-gradient(90deg, #d4af37, #f5d76e)', transition: 'width 0.2s' }} />
            </div>
          </div>
        )}

        {importDone && !importDone.error && (
          <div style={{ marginBottom: '12px', padding: '12px 16px', background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: '3px', fontFamily: 'Cinzel, serif', fontSize: '10px', letterSpacing: '0.15em', color: '#4ade80' }}>
            ✓ Imported {importDone.success} — {importDone.failed} failed
          </div>
        )}
        {importDone?.error && (
          <div style={{ marginBottom: '12px', padding: '12px 16px', background: 'rgba(248,113,113,0.06)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '3px', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '14px', color: '#f87171' }}>
            {importDone.error}
          </div>
        )}

        <button
          onClick={handleCSV}
          disabled={!csvFile || importing}
          style={{
            width: '100%',
            padding: '14px',
            background: csvFile ? 'rgba(212,175,55,0.12)' : 'rgba(255,255,255,0.04)',
            border: `1px solid ${csvFile ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.1)'}`,
            borderRadius: '2px',
            fontFamily: 'Cinzel, serif',
            fontSize: '10px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: csvFile ? '#d4af37' : 'rgba(245,240,232,0.25)',
            cursor: csvFile && !importing ? 'pointer' : 'not-allowed',
            marginBottom: '20px',
          }}
        >
          {importing ? 'Importing…' : 'Import CSV'}
        </button>

        {/* Sample format */}
        <div>
          <div style={{ fontFamily: 'Cinzel, serif', fontSize: '8px', letterSpacing: '0.25em', color: 'rgba(245,240,232,0.3)', textTransform: 'uppercase', marginBottom: '10px' }}>
            Sample CSV Format
          </div>
          <pre style={{
            background: 'rgba(0,0,0,0.4)',
            border: '1px solid rgba(212,175,55,0.1)',
            borderRadius: '3px',
            padding: '14px 16px',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: 'rgba(245,240,232,0.5)',
            overflowX: 'auto',
            lineHeight: 1.6,
          }}>
{`name,phone
John Thomas,+919876543210
Mary Kurien,+919876543211
Abraham Varghese,`}
          </pre>
        </div>
      </div>
    </div>
  )
}

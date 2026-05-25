// Floral watercolor background — replaces dark particle canvas
export default function FloralBackground() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0,
      width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0,
      overflow: 'hidden',
    }}>
      {/* Top-left corner bouquet */}
      <svg viewBox="0 0 320 320" style={{ position: 'absolute', top: -20, left: -20, width: 'clamp(180px,30vw,320px)', opacity: 0.18 }} xmlns="http://www.w3.org/2000/svg">
        {/* Leaves */}
        <ellipse cx="80" cy="180" rx="28" ry="60" fill="#7a9e6e" transform="rotate(-40 80 180)"/>
        <ellipse cx="110" cy="200" rx="22" ry="50" fill="#8fae7e" transform="rotate(-20 110 200)"/>
        <ellipse cx="60" cy="160" rx="18" ry="44" fill="#6b8e5e" transform="rotate(-55 60 160)"/>
        <ellipse cx="140" cy="190" rx="16" ry="38" fill="#9abf88" transform="rotate(-10 140 190)"/>
        {/* Roses */}
        <circle cx="100" cy="120" r="38" fill="#e8a0a8"/>
        <circle cx="100" cy="120" r="30" fill="#f0b8be"/>
        <circle cx="100" cy="120" r="22" fill="#f5c8cc"/>
        <circle cx="100" cy="120" r="14" fill="#fad8da"/>
        <circle cx="100" cy="120" r="7" fill="#fde8e8"/>
        <circle cx="155" cy="90" r="28" fill="#d4889a"/>
        <circle cx="155" cy="90" r="21" fill="#e09aac"/>
        <circle cx="155" cy="90" r="14" fill="#ecb0be"/>
        <circle cx="155" cy="90" r="7" fill="#f5c8d2"/>
        <circle cx="65" cy="85" r="22" fill="#c87090"/>
        <circle cx="65" cy="85" r="16" fill="#d888a4"/>
        <circle cx="65" cy="85" r="9" fill="#e8a0b8"/>
        {/* Small buds */}
        <circle cx="180" cy="110" r="14" fill="#e8a0b0"/>
        <circle cx="180" cy="110" r="9" fill="#f0b8c4"/>
        <circle cx="40" cy="120" r="12" fill="#d4889a"/>
        <circle cx="40" cy="120" r="7" fill="#e8a0b0"/>
      </svg>

      {/* Bottom-right corner bouquet */}
      <svg viewBox="0 0 320 320" style={{ position: 'absolute', bottom: -20, right: -20, width: 'clamp(180px,30vw,320px)', opacity: 0.18, transform: 'rotate(180deg)' }} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="80" cy="180" rx="28" ry="60" fill="#7a9e6e" transform="rotate(-40 80 180)"/>
        <ellipse cx="110" cy="200" rx="22" ry="50" fill="#8fae7e" transform="rotate(-20 110 200)"/>
        <ellipse cx="60" cy="160" rx="18" ry="44" fill="#6b8e5e" transform="rotate(-55 60 160)"/>
        <ellipse cx="140" cy="190" rx="16" ry="38" fill="#9abf88" transform="rotate(-10 140 190)"/>
        <circle cx="100" cy="120" r="38" fill="#e8a0a8"/>
        <circle cx="100" cy="120" r="30" fill="#f0b8be"/>
        <circle cx="100" cy="120" r="22" fill="#f5c8cc"/>
        <circle cx="100" cy="120" r="14" fill="#fad8da"/>
        <circle cx="100" cy="120" r="7" fill="#fde8e8"/>
        <circle cx="155" cy="90" r="28" fill="#d4889a"/>
        <circle cx="155" cy="90" r="21" fill="#e09aac"/>
        <circle cx="155" cy="90" r="14" fill="#ecb0be"/>
        <circle cx="155" cy="90" r="7" fill="#f5c8d2"/>
        <circle cx="65" cy="85" r="22" fill="#c87090"/>
        <circle cx="65" cy="85" r="16" fill="#d888a4"/>
        <circle cx="65" cy="85" r="9" fill="#e8a0b8"/>
        <circle cx="180" cy="110" r="14" fill="#e8a0b0"/>
        <circle cx="180" cy="110" r="9" fill="#f0b8c4"/>
        <circle cx="40" cy="120" r="12" fill="#d4889a"/>
        <circle cx="40" cy="120" r="7" fill="#e8a0b0"/>
      </svg>

      {/* Top-right small sprig */}
      <svg viewBox="0 0 200 200" style={{ position: 'absolute', top: -10, right: -10, width: 'clamp(100px,18vw,200px)', opacity: 0.13, transform: 'scaleX(-1)' }} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="130" rx="16" ry="40" fill="#8fae7e" transform="rotate(-30 60 130)"/>
        <ellipse cx="90" cy="140" rx="14" ry="34" fill="#7a9e6e" transform="rotate(-10 90 140)"/>
        <circle cx="70" cy="80" r="24" fill="#f0b8be"/>
        <circle cx="70" cy="80" r="16" fill="#f5c8cc"/>
        <circle cx="70" cy="80" r="9" fill="#fad8da"/>
        <circle cx="110" cy="65" r="18" fill="#e09aac"/>
        <circle cx="110" cy="65" r="11" fill="#ecb0be"/>
      </svg>

      {/* Bottom-left small sprig */}
      <svg viewBox="0 0 200 200" style={{ position: 'absolute', bottom: -10, left: -10, width: 'clamp(100px,18vw,200px)', opacity: 0.13, transform: 'rotate(180deg) scaleX(-1)' }} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="60" cy="130" rx="16" ry="40" fill="#8fae7e" transform="rotate(-30 60 130)"/>
        <ellipse cx="90" cy="140" rx="14" ry="34" fill="#7a9e6e" transform="rotate(-10 90 140)"/>
        <circle cx="70" cy="80" r="24" fill="#f0b8be"/>
        <circle cx="70" cy="80" r="16" fill="#f5c8cc"/>
        <circle cx="70" cy="80" r="9" fill="#fad8da"/>
        <circle cx="110" cy="65" r="18" fill="#e09aac"/>
        <circle cx="110" cy="65" r="11" fill="#ecb0be"/>
      </svg>

      {/* Subtle texture overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(255,248,235,0) 0%, rgba(253,248,240,0.4) 100%)',
      }}/>
    </div>
  )
}

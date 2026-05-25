import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import FloralBackground from '../components/ParticleCanvas'
import RosePetals from '../components/RosePetals'
import Loader from '../components/Loader'
import Countdown from '../components/Countdown'
import Reveal from '../components/Reveal'
import RSVPFlow from '../components/RSVPFlow'
import EventCard from '../components/EventCard'

const MAPS_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.488182017774!2d76.1266819!3d10.619131299999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7eb015c50c837%3A0x2ea4467dd74a4e24!2sLa%20Maria%20Castle!5e0!3m2!1sen!2sin!4v1779693854960!5m2!1sen!2sin"

export default function InvitePage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [showLoader, setShowLoader] = useState(true)
  const [invitee, setInvitee] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase.from('invitees').select('*').eq('slug', slug).single()
      if (error || !data) setNotFound(true)
      else setInvitee(data)
      setLoading(false)
    }
    fetch()
  }, [slug])

  const handleLoaderDone = () => setShowLoader(false)
  const guestName = invitee?.name || 'Dear Guest'
  const firstName = guestName.split(' ')[0]

  const waMessage = encodeURIComponent(
    `Greetings ${guestName}! The family of Herald Thomas and Swapna Biju cordially invite you to their Betrothal on Thursday 1st October 2026 at La Maria Castle, Eranellur, Thrissur at 6 PM. View your personal invitation here: ${window.location.href}`
  )

  const heroVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.25 } } }
  const heroItem = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }

  if (notFound) { navigate('/404'); return null }

  // Color shortcuts
  const gold = '#b8860b'
  const gold2 = '#d4af37'
  const text = '#2c1810'
  const muted = 'rgba(44,24,16,0.55)'
  const soft = 'rgba(44,24,16,0.38)'

  return (
    <>
      <AnimatePresence>{showLoader && <Loader key="loader" onComplete={handleLoaderDone} />}</AnimatePresence>

      {!showLoader && (
        <div style={{ position: 'relative', minHeight: '100vh', background: '#fdf8f0' }}>
          <FloralBackground />
          <RosePetals />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', margin: '0 auto', padding: 'clamp(32px,6vw,80px) clamp(16px,4vw,40px)' }}>

            {/* ── HERO ── */}
            <motion.div variants={heroVariants} initial="hidden" animate="visible" style={{ textAlign: 'center', marginBottom: 'clamp(48px,8vw,96px)' }}>

              {/* Floral top ornament */}
              <motion.div variants={heroItem} style={{ marginBottom: '20px' }}>
                <svg width="160" height="60" viewBox="0 0 160 60" style={{ margin: '0 auto', display: 'block' }}>
                  <line x1="0" y1="38" x2="55" y2="38" stroke="rgba(184,134,11,0.3)" strokeWidth="0.5"/>
                  <line x1="105" y1="38" x2="160" y2="38" stroke="rgba(184,134,11,0.3)" strokeWidth="0.5"/>
                  <circle cx="80" cy="30" r="12" fill="#f0b8be" opacity="0.7"/>
                  <circle cx="80" cy="30" r="7" fill="#f5c8cc" opacity="0.8"/>
                  <circle cx="80" cy="30" r="3.5" fill="#fad8da"/>
                  <circle cx="58" cy="36" r="8" fill="#e8a0b0" opacity="0.6"/>
                  <circle cx="58" cy="36" r="4.5" fill="#f0b8be" opacity="0.7"/>
                  <circle cx="102" cy="36" r="8" fill="#e8a0b0" opacity="0.6"/>
                  <circle cx="102" cy="36" r="4.5" fill="#f0b8be" opacity="0.7"/>
                  <ellipse cx="66" cy="48" rx="5" ry="12" fill="#8fae7e" opacity="0.45" transform="rotate(-20 66 48)"/>
                  <ellipse cx="94" cy="48" rx="5" ry="12" fill="#7a9e6e" opacity="0.45" transform="rotate(20 94 48)"/>
                  <circle cx="44" cy="40" r="5" fill="#d4889a" opacity="0.5"/>
                  <circle cx="116" cy="40" r="5" fill="#d4889a" opacity="0.5"/>
                </svg>
              </motion.div>

              {/* Scripture */}
              <motion.p variants={heroItem} style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(15px,3vw,20px)', color: muted, lineHeight: 1.8, marginBottom: '36px', maxWidth: '520px', margin: '0 auto 36px' }}>
                "I have found the one whom my soul loves."<br />
                <span style={{ fontSize: '0.75em', letterSpacing: '0.1em', fontFamily: 'Cinzel, serif', fontStyle: 'normal', color: soft }}>— Song of Solomon 3:4</span>
              </motion.p>

              {/* Greeting */}
              <motion.div variants={heroItem} style={{ marginBottom: '16px' }}>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(10px,2vw,13px)', letterSpacing: '0.3em', color: gold, textTransform: 'uppercase', marginBottom: '8px' }}>
                  Dear {firstName},
                </p>
              </motion.div>

              {/* Hosts */}
              <motion.div variants={heroItem} style={{ marginBottom: '8px' }}>
                <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 'clamp(14px,3vw,20px)', color: gold, letterSpacing: '0.08em' }}>
                  Mr &amp; Mrs Biju Thomas
                </div>
              </motion.div>

              <motion.div variants={heroItem}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(15px,3vw,19px)', color: muted, lineHeight: 1.8, maxWidth: '520px', margin: '0 auto 40px' }}>
                  extend their warm greetings and have the pleasure of inviting<br />
                  you and your family to grace the betrothal ceremony of their daughter
                </p>
              </motion.div>

              {/* Honoree 1 */}
              <motion.div variants={heroItem} style={{ marginBottom: '8px' }}>
                <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 'clamp(26px,6vw,48px)', color: text, letterSpacing: '0.04em', lineHeight: 1.1 }}>
                  Herald Thomas
                </div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(12px,2.5vw,15px)', color: soft, marginTop: '6px', marginBottom: '24px' }}>
                  Son of Kannambuzha M.D. Thomas and Sheela Thomas, Kuriachira
                </div>
              </motion.div>

              {/* Weds divider with floral */}
              <motion.div variants={heroItem} style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '24px' }}>
                  <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, rgba(184,134,11,0.3))` }} />
                  <svg width="48" height="24" viewBox="0 0 48 24">
                    <circle cx="24" cy="12" r="6" fill="#f0b8be" opacity="0.7"/>
                    <circle cx="24" cy="12" r="3.5" fill="#fad8da"/>
                    <circle cx="10" cy="14" r="4" fill="#e8a0b0" opacity="0.6"/>
                    <circle cx="38" cy="14" r="4" fill="#e8a0b0" opacity="0.6"/>
                  </svg>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: '10px', letterSpacing: '0.4em', color: gold, textTransform: 'uppercase' }}>WEDS</div>
                  <svg width="48" height="24" viewBox="0 0 48 24">
                    <circle cx="24" cy="12" r="6" fill="#f0b8be" opacity="0.7"/>
                    <circle cx="24" cy="12" r="3.5" fill="#fad8da"/>
                    <circle cx="10" cy="14" r="4" fill="#e8a0b0" opacity="0.6"/>
                    <circle cx="38" cy="14" r="4" fill="#e8a0b0" opacity="0.6"/>
                  </svg>
                  <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, rgba(184,134,11,0.3))` }} />
                </div>

                {/* Honoree 2 */}
                <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 'clamp(26px,6vw,48px)', color: text, letterSpacing: '0.04em', lineHeight: 1.1 }}>
                  Angel Biju
                </div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(12px,2.5vw,15px)', color: soft, marginTop: '6px' }}>
                  Daughter of Olakkenkil Biju Thomas and Swapna Biju
                </div>
              </motion.div>

              <motion.div variants={heroItem} style={{ marginTop: '20px' }}>
                <p style={{ fontFamily: 'Cinzel, serif', fontSize: '10px', letterSpacing: '0.35em', color: 'rgba(184,134,11,0.55)', textTransform: 'uppercase' }}>
                  With God's Blessing
                </p>
              </motion.div>
            </motion.div>

            {/* ── COUNTDOWN ── */}
            <Reveal>
              <div className="deco-card shimmer" style={{ padding: 'clamp(28px,5vw,48px)', textAlign: 'center', marginBottom: 'clamp(40px,7vw,72px)', borderRadius: '4px' }}>
                <div className="corner-tr" /><div className="corner-bl" />
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(184,134,11,0.55)', textTransform: 'uppercase', marginBottom: '24px' }}>
                  Counting Down To The Celebration
                </div>
                <Countdown />
              </div>
            </Reveal>

            {/* ── EVENT CARD ── */}
            <Reveal>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: 'clamp(40px,7vw,72px)' }}>
                <EventCard
                  label="Betrothal Ceremony"
                  dayDate="1st October 2026"
                  time="6:00 PM"
                  venueName="La Maria Castle"
                  venueAddress="Eranellur, Thrissur, Kerala"
                  mapsEmbed={MAPS_EMBED}
                />
              </div>
            </Reveal>

            {/* ── RSVP ── */}
            <Reveal>
              <div className="deco-card shimmer" style={{ padding: 'clamp(28px,5vw,48px)', marginBottom: 'clamp(40px,7vw,72px)', borderRadius: '4px' }}>
                <div className="corner-tr" /><div className="corner-bl" />
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(184,134,11,0.55)', textTransform: 'uppercase', marginBottom: '12px' }}>RSVP</div>
                  <div style={{ width: '40px', height: '1px', background: 'rgba(184,134,11,0.25)', margin: '0 auto' }} />
                </div>
                {invitee ? (
                  <RSVPFlow inviteeId={invitee.id} guestName={guestName} initialRsvp={invitee.rsvp} />
                ) : (
                  <div style={{ textAlign: 'center', color: muted, fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>Loading…</div>
                )}
              </div>
            </Reveal>

            {/* ── WHATSAPP ── */}
            <Reveal>
              <div style={{ marginBottom: 'clamp(40px,7vw,72px)' }}>
                <a href={`https://wa.me/?text=${waMessage}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', width: '100%', padding: '16px', background: 'linear-gradient(135deg, #25d366, #128c7e)', borderRadius: '4px', textDecoration: 'none', fontFamily: 'Cinzel, serif', fontSize: '11px', letterSpacing: '0.25em', color: '#fff', textTransform: 'uppercase', transition: 'opacity 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                    <path d="M10 0C4.477 0 0 4.477 0 10c0 1.762.459 3.418 1.26 4.86L0 20l5.292-1.232A9.96 9.96 0 0010 20c5.523 0 10-4.477 10-10S15.523 0 10 0zm4.895 14.11c-.208.578-1.21 1.108-1.657 1.143-.448.036-.46.337-2.894-.703-2.433-1.04-3.876-3.558-3.993-3.72-.117-.163-.946-1.312-.916-2.466.03-1.153.63-1.706.86-1.946.228-.24.495-.3.66-.303l.476-.005c.154-.003.36-.058.563.454.208.52.706 1.79.768 1.92.063.128.104.277.02.447-.083.17-.124.275-.25.42-.125.148-.264.33-.376.445-.125.127-.256.266-.109.516.147.25.65 1.103 1.392 1.786.956.876 1.762 1.146 2.011 1.276.25.13.395.11.542-.065.148-.175.635-.74.804-.992.169-.253.337-.213.567-.13.23.084 1.466.713 1.717.844.25.13.415.195.476.306.06.11.06.636-.148 1.213z"/>
                  </svg>
                  Share This Invitation on WhatsApp
                </a>
              </div>
            </Reveal>

            {/* ── BLESSING ── */}
            <Reveal>
              <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,7vw,72px)' }}>
                <svg width="120" height="50" viewBox="0 0 120 50" style={{ margin: '0 auto 20px', display: 'block' }}>
                  <line x1="0" y1="28" x2="42" y2="28" stroke="rgba(184,134,11,0.25)" strokeWidth="0.5"/>
                  <line x1="78" y1="28" x2="120" y2="28" stroke="rgba(184,134,11,0.25)" strokeWidth="0.5"/>
                  <circle cx="60" cy="20" r="10" fill="#f0b8be" opacity="0.6"/>
                  <circle cx="60" cy="20" r="6" fill="#f5c8cc" opacity="0.7"/>
                  <circle cx="60" cy="20" r="3" fill="#fad8da"/>
                  <circle cx="46" cy="26" r="6" fill="#e8a0b0" opacity="0.5"/>
                  <circle cx="74" cy="26" r="6" fill="#e8a0b0" opacity="0.5"/>
                  <ellipse cx="52" cy="38" rx="4" ry="9" fill="#8fae7e" opacity="0.4" transform="rotate(-15 52 38)"/>
                  <ellipse cx="68" cy="38" rx="4" ry="9" fill="#7a9e6e" opacity="0.4" transform="rotate(15 68 38)"/>
                </svg>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: 'clamp(16px,3vw,21px)', color: muted, lineHeight: 1.9, maxWidth: '500px', margin: '0 auto 16px' }}>
                  May Almighty bless this marriage with love, happiness, understanding, good health, and endless prosperity.
                </p>
                <div style={{ fontFamily: 'Cinzel Decorative, serif', fontSize: 'clamp(16px,3vw,22px)', color: gold }}>
                  Amen
                </div>
              </div>
            </Reveal>

            {/* ── FOOTER ── */}
            <Reveal>
              <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid rgba(184,134,11,0.12)' }}>
                <svg width="80" height="32" viewBox="0 0 80 32" style={{ margin: '0 auto 14px', display: 'block' }}>
                  <line x1="0" y1="16" x2="28" y2="16" stroke="rgba(184,134,11,0.2)" strokeWidth="0.5"/>
                  <line x1="52" y1="16" x2="80" y2="16" stroke="rgba(184,134,11,0.2)" strokeWidth="0.5"/>
                  <circle cx="40" cy="12" r="7" fill="#f0b8be" opacity="0.55"/>
                  <circle cx="40" cy="12" r="4" fill="#f5c8cc" opacity="0.65"/>
                  <circle cx="40" cy="12" r="2" fill="#fad8da"/>
                  <circle cx="30" cy="16" r="4" fill="#e8a0b0" opacity="0.45"/>
                  <circle cx="50" cy="16" r="4" fill="#e8a0b0" opacity="0.45"/>
                </svg>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic', fontSize: '15px', color: soft, letterSpacing: '0.05em' }}>
                  No gifts please, just your love and prayers
                </p>
              </div>
            </Reveal>

          </div>
        </div>
      )}
    </>
  )
}

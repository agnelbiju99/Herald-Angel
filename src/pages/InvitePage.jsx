import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import ParticleCanvas from '../components/ParticleCanvas'
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
      const { data, error } = await supabase
        .from('invitees')
        .select('*')
        .eq('slug', slug)
        .single()

      if (error || !data) {
        setNotFound(true)
      } else {
        setInvitee(data)
      }
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

  const heroVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.25 } },
  }
  const heroItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  }

  if (notFound) {
    navigate('/404')
    return null
  }

  return (
    <>
      <AnimatePresence>
        {showLoader && <Loader key="loader" onComplete={handleLoaderDone} />}
      </AnimatePresence>

      {!showLoader && (
        <div style={{ position: 'relative', minHeight: '100vh', background: '#0a0a0a' }}>
          <ParticleCanvas />
          <RosePetals />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px', margin: '0 auto', padding: 'clamp(32px, 6vw, 80px) clamp(16px, 4vw, 40px)' }}>

            {/* ── HERO ── */}
            <motion.div
              variants={heroVariants}
              initial="hidden"
              animate="visible"
              style={{ textAlign: 'center', marginBottom: 'clamp(48px, 8vw, 96px)' }}
            >
              {/* Top ornament */}
              <motion.div variants={heroItem} style={{ marginBottom: '28px' }}>
                <svg width="120" height="24" viewBox="0 0 120 24" fill="none" style={{ margin: '0 auto', display: 'block' }}>
                  <line x1="0" y1="12" x2="48" y2="12" stroke="rgba(212,175,55,0.35)" strokeWidth="0.5"/>
                  <polygon points="55,12 60,6 65,12 60,18" fill="none" stroke="rgba(212,175,55,0.5)" strokeWidth="0.8"/>
                  <line x1="72" y1="12" x2="120" y2="12" stroke="rgba(212,175,55,0.35)" strokeWidth="0.5"/>
                </svg>
              </motion.div>

              {/* Scripture */}
              <motion.p variants={heroItem} style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(15px, 3vw, 20px)',
                color: 'rgba(245,240,232,0.55)',
                lineHeight: 1.8,
                marginBottom: '36px',
                maxWidth: '520px',
                margin: '0 auto 36px',
              }}>
                "I have found the one whom my soul loves."<br />
                <span style={{ fontSize: '0.75em', letterSpacing: '0.1em', fontFamily: 'Cinzel, serif', fontStyle: 'normal' }}>— Song of Solomon 3:4</span>
              </motion.p>

              {/* Personalized greeting */}
              <motion.div variants={heroItem} style={{ marginBottom: '16px' }}>
                <p style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: 'clamp(10px, 2vw, 13px)',
                  letterSpacing: '0.3em',
                  color: 'rgba(212,175,55,0.6)',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}>
                  Dear {firstName},
                </p>
              </motion.div>

              {/* Host names */}
              <motion.div variants={heroItem} style={{ marginBottom: '8px' }}>
                <div style={{
                  fontFamily: 'Cinzel Decorative, serif',
                  fontSize: 'clamp(14px, 3vw, 20px)',
                  color: '#d4af37',
                  letterSpacing: '0.08em',
                }}>
                  Mr &amp; Mrs Biju Thomas
                </div>
              </motion.div>

              <motion.div variants={heroItem}>
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(15px, 3vw, 19px)',
                  color: 'rgba(245,240,232,0.6)',
                  lineHeight: 1.8,
                  maxWidth: '520px',
                  margin: '0 auto 40px',
                }}>
                  extend their warm greetings and have the pleasure of inviting<br />
                  you and your family to grace the betrothal ceremony of<br />their daughter
                </p>
              </motion.div>

              {/* Honorees */}
              <motion.div variants={heroItem} style={{ marginBottom: '8px' }}>
                <div style={{
                  fontFamily: 'Cinzel Decorative, serif',
                  fontSize: 'clamp(26px, 6vw, 48px)',
                  color: '#f5f0e8',
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                }}>
                  Herald Thomas
                </div>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(12px, 2.5vw, 15px)',
                  color: 'rgba(245,240,232,0.4)',
                  marginTop: '6px',
                  marginBottom: '24px',
                }}>
                  Son of Kannambuzha M.D. Thomas and Sheela Thomas, Kuriachira
                </div>
              </motion.div>

              <motion.div variants={heroItem} style={{ marginBottom: '8px' }}>
                {/* Weds separator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', justifyContent: 'center', marginBottom: '24px' }}>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.3))' }} />
                  <div style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '10px',
                    letterSpacing: '0.4em',
                    color: 'rgba(212,175,55,0.7)',
                    textTransform: 'uppercase',
                  }}>
                    WEDS
                  </div>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.3))' }} />
                </div>

                <div style={{
                  fontFamily: 'Cinzel Decorative, serif',
                  fontSize: 'clamp(26px, 6vw, 48px)',
                  color: '#f5f0e8',
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                }}>
                  Angel Biju
                </div>
                <div style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(12px, 2.5vw, 15px)',
                  color: 'rgba(245,240,232,0.4)',
                  marginTop: '6px',
                }}>
                  Daughter of Olakkenkil Biju Thomas and Swapna Biju
                </div>
              </motion.div>

              <motion.div variants={heroItem} style={{ marginTop: '24px' }}>
                <p style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '10px',
                  letterSpacing: '0.35em',
                  color: 'rgba(212,175,55,0.5)',
                  textTransform: 'uppercase',
                }}>
                  With God's Blessing
                </p>
              </motion.div>
            </motion.div>

            {/* ── COUNTDOWN ── */}
            <Reveal>
              <div className="deco-card shimmer" style={{ padding: 'clamp(28px, 5vw, 48px)', textAlign: 'center', marginBottom: 'clamp(40px, 7vw, 72px)', borderRadius: '2px' }}>
                <div className="corner-tr" /><div className="corner-bl" />
                <div style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '9px',
                  letterSpacing: '0.35em',
                  color: 'rgba(212,175,55,0.5)',
                  textTransform: 'uppercase',
                  marginBottom: '24px',
                }}>
                  Counting Down To The Celebration
                </div>
                <Countdown />
              </div>
            </Reveal>

            {/* ── EVENT CARD ── */}
            <Reveal>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: 'clamp(40px, 7vw, 72px)' }}>
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
              <div className="deco-card shimmer" style={{ padding: 'clamp(28px, 5vw, 48px)', marginBottom: 'clamp(40px, 7vw, 72px)', borderRadius: '2px' }}>
                <div className="corner-tr" /><div className="corner-bl" />
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                  <div style={{
                    fontFamily: 'Cinzel, serif',
                    fontSize: '9px',
                    letterSpacing: '0.35em',
                    color: 'rgba(212,175,55,0.5)',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                  }}>
                    RSVP
                  </div>
                  <div style={{ width: '40px', height: '1px', background: 'rgba(212,175,55,0.25)', margin: '0 auto' }} />
                </div>
                {invitee ? (
                  <RSVPFlow
                    inviteeId={invitee.id}
                    guestName={guestName}
                    initialRsvp={invitee.rsvp}
                  />
                ) : (
                  <div style={{ textAlign: 'center', color: 'rgba(245,240,232,0.3)', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
                    Loading…
                  </div>
                )}
              </div>
            </Reveal>

            {/* ── WHATSAPP SHARE ── */}
            <Reveal>
              <div style={{ marginBottom: 'clamp(40px, 7vw, 72px)' }}>
                <a
                  href={`https://wa.me/?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '16px',
                    background: 'linear-gradient(135deg, #25d366, #128c7e)',
                    borderRadius: '2px',
                    textDecoration: 'none',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '11px',
                    letterSpacing: '0.25em',
                    color: '#fff',
                    textTransform: 'uppercase',
                    transition: 'opacity 0.3s',
                  }}
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
              <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 7vw, 72px)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', justifyContent: 'center' }}>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.25))' }} />
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <polygon points="8,1 9.5,6 15,6 10.5,9.5 12,15 8,11.5 4,15 5.5,9.5 1,6 6.5,6" fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="0.8"/>
                  </svg>
                  <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(212,175,55,0.25))' }} />
                </div>
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(16px, 3vw, 21px)',
                  color: 'rgba(245,240,232,0.55)',
                  lineHeight: 1.9,
                  maxWidth: '500px',
                  margin: '0 auto 16px',
                }}>
                  May Almighty bless this marriage with love, happiness, understanding, good health, and endless prosperity.
                </p>
                <div style={{
                  fontFamily: 'Cinzel Decorative, serif',
                  fontSize: 'clamp(16px, 3vw, 22px)',
                  color: 'rgba(212,175,55,0.7)',
                }}>
                  Amen
                </div>
              </div>
            </Reveal>

            {/* ── FOOTER ── */}
            <Reveal>
              <div style={{ textAlign: 'center', paddingTop: '20px', borderTop: '1px solid rgba(212,175,55,0.08)' }}>
                <svg width="80" height="16" viewBox="0 0 80 16" fill="none" style={{ margin: '0 auto 16px', display: 'block' }}>
                  <line x1="0" y1="8" x2="30" y2="8" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5"/>
                  <polygon points="37,8 40,3 43,8 40,13" fill="rgba(212,175,55,0.3)"/>
                  <line x1="50" y1="8" x2="80" y2="8" stroke="rgba(212,175,55,0.2)" strokeWidth="0.5"/>
                </svg>
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontStyle: 'italic',
                  fontSize: '15px',
                  color: 'rgba(245,240,232,0.3)',
                  letterSpacing: '0.05em',
                }}>
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

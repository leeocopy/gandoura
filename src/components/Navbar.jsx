import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang, t, dir } = useLanguage()

  const navLinks = [
    { label: t('nav.collection'), href: '#collection' },
    { label: t('nav.story'), href: '#story' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const languages = [
    { code: 'ar', label: 'AR' },
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          height: '80px', // Increased height
          display: 'flex',
          alignItems: 'center',
          paddingInline: 'clamp(24px, 5vw, 64px)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
          background: scrolled ? 'rgba(252, 252, 252, 0.98)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(229, 229, 229, 0.55)' : '1px solid transparent',
          transition: 'backdrop-filter 0.4s ease, background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo - Keeping BEHJA latin */}
        <a
          href="/"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '18px', // Increased
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#121212',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          BEHJA
        </a>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Desktop Links */}
        <div 
          style={{
            display: 'flex',
            gap: '40px',
            alignItems: 'center',
          }}
          className="nav-links-desktop"
        >
          <ul
            style={{
              display: 'flex',
              gap: '40px',
              listStyle: 'none',
              alignItems: 'center',
            }}
          >
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  style={{
                    fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
                    fontSize: '16px', // Increased
                    fontWeight: 500,
                    color: '#121212',
                    textDecoration: 'none',
                    position: 'relative',
                    paddingBottom: '2px',
                    transition: 'opacity 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.5')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Vertical Divider */}
          <div style={{ width: '1px', height: '20px', background: '#E5E5E5', margin: '0 8px' }} />

          {/* Language Switcher */}
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', fontWeight: 600, color: '#999' }}>
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: lang === l.code ? '#121212' : '#999',
                  transition: 'color 0.2s ease',
                  padding: '4px',
                }}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/212659672184"
            target="_blank"
            rel="noreferrer"
            className="btn-outline"
            style={{ padding: '12px 28px', fontSize: '14px', marginLeft: dir === 'rtl' ? '0' : '12px', marginRight: dir === 'rtl' ? '12px' : '0' }}
          >
            {t('nav.orderNow')}
          </a>
        </div>

        {/* Mobile Language Switcher (Compact) */}
        <div 
          className="mobile-lang-mini"
          style={{ display: 'none', marginRight: '20px', marginLeft: '20px', gap: '8px', fontSize: '11px', fontWeight: 700 }}
        >
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              style={{
                background: 'none',
                border: 'none',
                color: lang === l.code ? '#121212' : '#CCC',
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: '#121212',
          }}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: '80px',
              left: 0,
              right: 0,
              zIndex: 99,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              background: 'rgba(252, 252, 252, 0.98)',
              borderBottom: '1px solid rgba(229, 229, 229, 0.7)',
              padding: '40px clamp(24px, 5vw, 64px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '32px',
            }}
          >
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
                  fontSize: '20px', // Bigger on mobile
                  fontWeight: 500,
                  color: '#121212',
                  textDecoration: 'none',
                }}
              >
                {label}
              </a>
            ))}
            <a
              href="https://wa.me/212659672184"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
              style={{ alignSelf: 'flex-start', marginTop: '12px', width: '100%', justifyContent: 'center', fontSize: '15px' }}
            >
              {t('nav.orderNow')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .mobile-lang-mini { display: flex !important; }
        }
      `}</style>
    </>
  )
}

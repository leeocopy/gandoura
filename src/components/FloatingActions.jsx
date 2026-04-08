import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, ArrowUp } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function FloatingActions() {
  const { t, dir } = useLanguage()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  // Position based on direction
  const positionStyle = {
    position: 'fixed',
    bottom: '28px',
    zIndex: 200,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'center',
  }

  if (dir === 'rtl') {
    positionStyle.left = '28px'
  } else {
    positionStyle.right = '28px'
  }

  return (
    <div style={positionStyle}>
      {/* Back to Top — appears after scrolling 500px */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.85 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={scrollToTop}
            aria-label={t('floating.top')}
            title={t('floating.top')}
            style={{
              width: '44px',
              height: '44px',
              background: '#FCFCFC',
              border: '1px solid #E5E5E5',
              color: '#121212',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.2s ease, background 0.2s ease',
              boxShadow: '0 2px 16px rgba(0,0,0,0.08)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#121212'
              e.currentTarget.style.color = '#FCFCFC'
              e.currentTarget.style.borderColor = '#121212'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#FCFCFC'
              e.currentTarget.style.color = '#121212'
              e.currentTarget.style.borderColor = '#E5E5E5'
            }}
          >
            <ArrowUp size={16} strokeWidth={1.75} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp — always visible */}
      <motion.a
        href="https://wa.me/212659672184?text=Salam%20Behja%2C%20bit%20nchouf%20l-collection"
        target="_blank"
        rel="noreferrer"
        aria-label={t('floating.whatsapp')}
        title={t('floating.whatsapp')}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.8, duration: 0.4, ease: 'easeOut' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '52px',
          height: '52px',
          background: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(37, 211, 102, 0.38)',
          transition: 'box-shadow 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 6px 28px rgba(37, 211, 102, 0.55)')}
        onMouseLeave={e => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.38)')}
      >
        <MessageCircle size={22} strokeWidth={1.75} />
      </motion.a>
    </div>
  )
}

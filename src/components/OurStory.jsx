import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

// Animated number/stat block
function Stat({ value, label, lang }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <p style={{
        fontFamily: lang === 'ar' ? "'Palestine', serif" : "'Playfair Display', serif",
        fontSize: 'clamp(36px, 5vw, 56px)', // Increased
        fontWeight: 600,
        color: '#121212',
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}>
        {value}
      </p>
      <p style={{
        fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
        fontSize: '12px', // Increased from 10px
        fontWeight: 400,
        color: '#999',
        letterSpacing: lang === 'ar' ? '0' : '0.14em',
        textTransform: lang === 'ar' ? 'none' : 'uppercase',
        marginTop: '12px',
      }}>
        {label}
      </p>
    </div>
  )
}

export default function OurStory() {
  const { lang, t } = useLanguage()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const paragraphLines = [
    t('story.p1'),
    t('story.p2'),
    t('story.p3'),
  ]

  return (
    <section
      id="story"
      ref={ref}
      style={{
        background: '#FCFCFC',
        padding: 'clamp(80px, 12vw, 160px) clamp(24px, 10vw, 200px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background character */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontFamily: lang === 'ar' ? "'Palestine', serif" : "'Playfair Display', serif",
          fontSize: 'clamp(200px, 35vw, 500px)',
          fontWeight: 700,
          color: 'rgba(18,18,18,0.025)',
          userSelect: 'none',
          pointerEvents: 'none',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          whiteSpace: 'nowrap',
        }}
      >
        {lang === 'ar' ? 'ب' : 'B'}
      </div>

      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{
          fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
          fontSize: '14px', // Increased from 12px
          fontWeight: 500,
          letterSpacing: lang === 'ar' ? '0' : '0.1em',
          textTransform: lang === 'ar' ? 'none' : 'uppercase',
          color: '#2D3A2F',
          marginBottom: '32px',
        }}
      >
        ✦ {t('story.badge')}
      </motion.p>

      {/* Main Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        style={{
          fontFamily: lang === 'ar' ? "'Palestine', serif" : "'Playfair Display', serif",
          fontSize: 'clamp(40px, 6vw, 84px)', // Increased
          fontWeight: 600,
          lineHeight: 1.25,
          color: '#121212',
          marginBottom: '64px',
          maxWidth: '900px',
          marginInline: 'auto',
          textAlign: 'center',
        }}
      >
        {t('story.headline')}
      </motion.h2>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '64px', // Increased from 48px
          height: '1px',
          background: '#2D3A2F',
          marginInline: 'auto',
          marginBottom: '64px',
          transformOrigin: 'center',
        }}
      />

      {/* Paragraphs */}
      <div style={{ maxWidth: '720px', marginInline: 'auto', marginBottom: '100px' }}>
        {paragraphLines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
              fontSize: 'clamp(18px, 2.2vw, 24px)', // Increased
              fontWeight: 300,
              lineHeight: 1.8,
              color: i === paragraphLines.length - 1 ? '#121212' : '#666666',
              marginBottom: i < paragraphLines.length - 1 ? '32px' : 0,
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(40px, 10vw, 120px)', // Increased gap
          flexWrap: 'wrap',
          paddingTop: '64px',
          borderTop: '1px solid #E5E5E5',
          maxWidth: '800px',
          marginInline: 'auto',
        }}
      >
        <Stat value={'120 ' + t('card.currency')} label={t('story.stat1')} lang={lang} />
        <Stat value="100%" label={t('story.stat2')} lang={lang} />
        <Stat value="∞" label={t('story.stat3')} lang={lang} />
      </motion.div>
    </section>
  )
}

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

// ── Encode WhatsApp message ──────────────────────────────────────────────────
const whatsappURL = (name) =>
  `https://wa.me/212659672184?text=Salam%20Behja%2C%20bit%20n-commander%20had%20l-gandoura%3A%20${encodeURIComponent(name)}`

// ── Card-level fade-up animation ─────────────────────────────────────────────
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: i * 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

// ── Single Product Card ───────────────────────────────────────────────────────
function ProductCard({ product, index }) {
  const { lang, t, dir } = useLanguage()
  const [hovered, setHovered] = useState(false)
  const [imgSrc, setImgSrc] = useState(product.image)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const handleMouseEnter = () => {
    setHovered(true)
    setImgSrc(product.alt)
  }
  const handleMouseLeave = () => {
    setHovered(false)
    setImgSrc(product.image)
  }

  const localizedName = product.name[lang] || product.name['ar']
  const localizedDesc = product.description[lang] || product.description['ar']

  return (
    <motion.article
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      custom={index % 3}
      style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.open(whatsappURL(localizedName), '_blank')}
    >
      {/* ── Image Container: 4:5 ratio ── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '125%',   /* 4:5 = 125% */
          overflow: 'hidden',
          background: '#F5F4F2',
        }}
      >
        {/* Main image */}
        <img
          src={imgSrc}
          alt={localizedName}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease',
            willChange: 'transform',
          }}
        />

        {/* Hover overlay — "Order on WhatsApp" CTA */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(18, 18, 18, 0.38)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '24px',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
            border: 'none',
            backdropFilter: hovered ? 'blur(2px)' : 'none',
            pointerEvents: hovered ? 'auto' : 'none',
          }}
          className="product-card-overlay"
        >
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 20px',
              background: '#FCFCFC',
              border: 'none',
              color: '#121212',
              fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              justifyContent: 'center',
              transition: 'background 0.2s ease',
              textTransform: lang === 'ar' ? 'none' : 'uppercase',
            }}
            onClick={(e) => {
              e.stopPropagation()
              window.open(whatsappURL(localizedName), '_blank')
            }}
          >
            <MessageCircle size={14} />
            {t('card.orderWhatsapp')}
          </button>
        </div>

        {/* Mobile-only visible button */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            display: 'none',
          }}
          className="mobile-cta-wrapper"
        >
           <button
             style={{
               display: 'flex',
               alignItems: 'center',
               gap: '8px',
               padding: '12px 16px',
               background: 'rgba(252, 252, 252, 0.98)',
               border: '1.5px solid #121212',
               color: '#121212',
               fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
               fontSize: '13px',
               fontWeight: 600,
               width: '100%',
               justifyContent: 'center',
               borderRadius: '2px',
               boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
             }}
           >
              {t('card.orderNow')}
           </button>
        </div>
      </div>

      {/* ── Product Info Row ── */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingTop: '20px',
          paddingBottom: '24px',
          borderBottom: '1px solid #E5E5E5',
          marginTop: '0',
          textAlign: dir === 'rtl' ? 'right' : 'left',
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
              fontSize: '18px', // Increased
              fontWeight: 500,
              color: '#121212',
              marginBottom: '6px',
            }}
          >
            {localizedName}
          </p>
          <p
            style={{
              fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
              fontSize: '14px', // Increased
              color: '#888',
              lineHeight: 1.5,
            }}
          >
            {localizedDesc}
          </p>
        </div>

        <p
          style={{
            fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
            fontSize: '18px', // Increased
            fontWeight: 600,
            color: '#121212',
            flexShrink: 0,
            marginLeft: dir === 'ltr' ? '20px' : '0',
            marginRight: dir === 'rtl' ? '20px' : '0',
          }}
        >
          {product.price} {t('card.currency')}
        </p>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .mobile-cta-wrapper { display: flex !important; }
          .product-card-overlay { display: none !important; }
        }
      `}</style>
    </motion.article>
  )
}

export default ProductCard

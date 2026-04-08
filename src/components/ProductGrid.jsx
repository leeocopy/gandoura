import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ProductCard from './ProductCard'
import { products } from '../data/products'
import { useLanguage } from '../context/LanguageContext'

export default function ProductGrid() {
  const { lang, t, dir } = useLanguage()
  const headingRef = useRef(null)
  const inView = useInView(headingRef, { once: true, margin: '-60px' })

  const ArrowIcon = dir === 'rtl' ? ArrowLeft : ArrowRight

  return (
    <section
      id="collection"
      style={{
        background: '#FCFCFC',
        padding: 'clamp(100px, 12vw, 160px) clamp(24px, 5vw, 80px)',
      }}
    >
      {/* ── Section Header ─────────────────────────────────────────────────── */}
      <div
        ref={headingRef}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexDirection: dir === 'rtl' ? 'row' : 'row', // Let's keep flex-row and rely on dir
          marginBottom: 'clamp(48px, 8vw, 84px)',
          borderBottom: '1px solid #E5E5E5',
          paddingBottom: '32px',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <div style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
              fontSize: '14px', // Increased
              fontWeight: 500,
              textTransform: lang === 'ar' ? 'none' : 'uppercase',
              color: '#2D3A2F',
              marginBottom: '16px',
            }}
          >
            ✦ {t('grid.badge')}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: lang === 'ar' ? "'Palestine', serif" : "'Playfair Display', serif",
              fontSize: 'clamp(32px, 4vw, 56px)', // Increased
              fontWeight: 600,
              lineHeight: 1.1,
              color: '#121212',
            }}
          >
            {t('grid.title')}
          </motion.h2>
        </div>

        <motion.a
          href="https://wa.me/212659672184"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="btn-outline"
          style={{ flexShrink: 0, gap: '12px', fontSize: '14px' }}
        >
          {t('grid.allItems')}
          <ArrowIcon size={14} />
        </motion.a>
      </div>

      {/* ── Product Grid ────────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(32px, 4vw, 56px) clamp(20px, 3vw, 40px)', // Increased gap for organization
        }}
        className="product-grid"
      >
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* ── Bottom CTA ──────────────────────────────────────────────────────── */}
      <div
        style={{
          marginTop: 'clamp(64px, 10vw, 120px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px', // Increased gap
        }}
      >
        <p
          style={{
            fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
            fontSize: '18px', // Increased from 14px
            color: '#666',
            textAlign: 'center',
            maxWidth: '600px',
            lineHeight: 1.6,
          }}
        >
          {t('grid.priceNotice').replace('{price}', '120')}
        </p>
        <a
          href="https://wa.me/212659672184?text=Salam%20Behja%2C%20bit%20nchouf%20l-collection"
          target="_blank"
          rel="noreferrer"
          className="btn-outline"
          style={{ padding: '16px 40px', fontSize: '15px' }} // Bigger button
        >
          {t('grid.orderWhatsapp')}
          <ArrowIcon size={16} />
        </a>
      </div>

      {/* ── Responsive grid override ─────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 1024px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 640px) {
          .product-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
      `}</style>
    </section>
  )
}

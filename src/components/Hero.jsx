import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

// Transitions for that "Expensive" Look
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
}

const textVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + i * 0.08,
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function Hero() {
  const { lang, t, dir } = useLanguage()
  const [[page, direction], setPage] = useState([0, 0])

  // Map translations to slide data
  const collections = [
    {
      id: 1,
      name: t('hero.collections.klassik.name'),
      image: '/h_new1.png',
      price: '120 ' + t('card.currency'),
    },
    {
      id: 2,
      name: t('hero.collections.sahel.name'),
      image: '/h_new2.png',
      price: '120 ' + t('card.currency'),
    },
    {
      id: 3,
      name: t('hero.collections.sultane.name'),
      image: '/h_new3.png',
      price: '120 ' + t('card.currency'),
    },
  ]

  const activeIndex = Math.abs(page % collections.length)

  const paginate = useCallback(
    (newDirection) => {
      setPage([page + newDirection, newDirection])
    },
    [page]
  )

  const setIndex = (index) => {
    const dir = index > activeIndex ? 1 : -1
    setPage([index, dir])
  }

  // Auto-play logic (8s interval)
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 8000)
    return () => clearInterval(timer)
  }, [paginate])

  const activeCollection = collections[activeIndex]

  return (
    <section className={`relative h-screen w-full overflow-hidden bg-[#FCFCFC] flex flex-col md:flex-row ${dir === 'rtl' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
      {/* ── Main Stage (Centered Product Image) ── */}
      <div className="absolute inset-0 z-0 flex items-center justify-center p-8 md:p-16 translate-y-[-2%] md:translate-y-[-4%]">
        <div className="relative w-full h-full max-w-5xl flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 200, damping: 25, duration: 1.2 },
                opacity: { duration: 1.2 },
                scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              <motion.img
                src={activeCollection.image}
                alt={activeCollection.name}
                className="max-w-full max-h-full object-contain pointer-events-none drop-shadow-md"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, ease: 'easeOut' }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Content Area: Higher up from bottom ── */}
      <div 
        className={`relative z-20 flex-1 flex flex-col justify-end p-8 md:p-20 pb-44 md:pb-64 pointer-events-none ${dir === 'rtl' ? 'items-start' : 'items-start'}`}
      >
        <div className={`max-w-md pointer-events-auto ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          {/* Collection Name & Type */}
          <motion.div
             key={`content-${activeIndex}-${lang}`}
             className="flex flex-col gap-1"
          >
            <motion.h1
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-[20px] md:text-[24px] font-medium tracking-wide text-[#121212] mb-3"
              style={{ fontFamily: lang === 'ar' ? "'Palestine', serif" : "'Playfair Display', serif" }}
            >
              {activeCollection.name}
            </motion.h1>
            
            <motion.p
              custom={1.5}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-6xl md:text-8xl font-light text-[#121212] mb-12"
              style={{ fontFamily: lang === 'ar' ? "'Palestine', serif" : "'Playfair Display', serif" }}
            >
              {t('hero.collectionTitle')}
            </motion.p>
          </motion.div>

          {/* Price & Annotation */}
          <motion.div
            key={`cta-${activeIndex}-${lang}`}
            custom={2}
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            <p 
              className={`text-[18px] md:text-[20px] text-[#666] flex items-center gap-6 ${dir === 'rtl' ? 'flex-row' : 'flex-row'}`}
              style={{ fontFamily: lang === 'ar' ? "'Palestine', serif" : "'Playfair Display', serif", fontStyle: lang === 'ar' ? 'normal' : 'italic' }}
            >
              {dir === 'rtl' && <span className="w-12 h-[1px] bg-[#E5E5E5]" />}
              {activeCollection.price} — {t('hero.unifiedPrice')}
              {dir === 'ltr' && <span className="w-12 h-[1px] bg-[#E5E5E5]" />}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Side Navigation: Collection Switcher ── */}
      <div className={`relative z-30 w-full md:w-28 flex md:flex-col justify-center items-center gap-6 p-6 md:p-8 pointer-events-auto`}>
        {collections.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setIndex(index)}
            className="group relative flex items-center gap-4"
          >
            {/* Preview Rectangle */}
            <div
              className={`relative overflow-hidden transition-all duration-700 ease-[0.22, 1, 0.36, 1] 
              ${activeIndex === index ? 'w-12 md:w-16 h-12 md:h-16 border border-black scale-110' : 'w-10 md:w-14 h-10 md:h-14 border border-[#E5E5E5] opacity-50 hover:opacity-100'}`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span 
                  style={{ fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif" }} 
                  className="text-white text-[11px] md:text-[13px] font-medium"
                >
                  {item.name}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ── Responsive Styling ── */}
      <style>{`
        @media (max-width: 768px) {
          section {
            display: flex !important;
            flex-direction: column !important;
          }
          .absolute.inset-0.z-0 {
             height: 50vh !important;
             position: relative !important;
          }
          .relative.z-20 {
             padding-top: 20px !important;
             justify-content: center !important;
             align-items: center !important;
             text-align: center !important;
          }
          .z-20 .max-w-md {
             text-align: center !important;
          }
          .flex-col.gap-6 p {
             justify-content: center !important;
          }
        }
      `}</style>
    </section>
  )
}

import { useLanguage } from '../context/LanguageContext'

// ── Inline SVG brand icons ────────────────────────────────────────────────────
function InstagramIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

function TikTokIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  )
}

function WhatsAppIcon({ size = 17 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.109.549 4.09 1.508 5.814L0 24l6.354-1.465A11.946 11.946 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.807 9.807 0 0 1-5.002-1.368l-.36-.213-3.718.857.881-3.63-.234-.373A9.777 9.777 0 0 1 2.182 12C2.182 6.575 6.575 2.182 12 2.182S21.818 6.575 21.818 12 17.425 21.818 12 21.818z"/>
    </svg>
  )
}

export default function Footer() {
  const { lang, t, dir } = useLanguage()
  const year = new Date().getFullYear()

  const navLinks = [
    { label: t('nav.collection'), href: '#collection' },
    { label: t('nav.story'), href: '#story' },
    { label: t('nav.contact'), href: '#contact' },
  ]

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/abdeleo1/',
      icon: <InstagramIcon size={17} />,
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@behjagandoura',
      icon: <TikTokIcon size={17} />,
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/212659672184',
      icon: <WhatsAppIcon size={17} />,
    },
  ]

  return (
    <footer
      id="contact"
      style={{
        background: '#FCFCFC',
        borderTop: '1px solid #E5E5E5',
        padding: 'clamp(60px, 8vw, 100px) clamp(24px, 5vw, 80px)', // Increased padding
      }}
    >
      {/* ── Main Footer Row ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '48px', // Increased gap
          marginBottom: '60px',
          textAlign: dir === 'rtl' ? 'right' : 'left',
        }}
        className="footer-row"
      >
        {/* Logo Section */}
        <div style={{ flex: '1 0 200px' }}>
          <p style={{
            fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
            fontSize: '20px', // Increased
            fontWeight: 600,
            color: '#121212',
            marginBottom: '10px',
          }}>
            {lang === 'ar' ? 'بهجة غندورة' : 'BEHJA'}
          </p>
          <p style={{
            fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
            fontSize: '14px', // Increased
            fontWeight: 300,
            color: '#999',
            lineHeight: 1.6,
          }}>
            {t('footer.tagline')}
          </p>
        </div>

        {/* Center: Nav links */}
        <nav aria-label="Footer navigation">
          <ul style={{
            display: 'flex',
            gap: '32px', // Increased gap
            listStyle: 'none',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
            {navLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  style={{
                    fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
                    fontSize: '15px', // Increased
                    fontWeight: 500,
                    color: '#666',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#121212')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#666')}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px', // Increased
                height: '42px',
                border: '1px solid #E5E5E5',
                color: '#666',
                textDecoration: 'none',
                transition: 'border-color 0.2s ease, color 0.2s ease, background 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#2D3A2F'
                e.currentTarget.style.color = '#2D3A2F'
                e.currentTarget.style.background = 'rgba(45,58,47,0.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E5E5E5'
                e.currentTarget.style.color = '#666'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div style={{
        paddingTop: '32px',
        borderTop: '1px solid #F0F0F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: lang === 'ar' ? "'Palestine', sans-serif" : "'Inter', sans-serif",
          fontSize: '13px', // Increased
          color: '#bbb',
        }}>
          © {year} {lang === 'ar' ? 'بهجة غندورة' : 'BEHJA'}. {t('footer.rights')}
        </p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px', // Increased
          color: '#bbb',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {t('footer.madeIn')} {lang === 'ar' ? '🇲🇦' : '🇲🇦'}
        </p>
      </div>

      {/* Responsive footer */}
      <style>{`
        @media (max-width: 900px) {
          .footer-row {
            flex-direction: column !important;
            align-items: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  )
}

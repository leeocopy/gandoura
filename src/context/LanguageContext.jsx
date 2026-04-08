import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../i18n/translations'

const LanguageContext = createContext()

export const LanguageProvider = ({ children }) => {
  // Default to Arabic
  const [lang, setLang] = useState('ar')
  const [dir, setDir] = useState('rtl')

  useEffect(() => {
    // Update HTML attributes when language changes
    document.documentElement.lang = lang
    const newDir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dir = newDir
    setDir(newDir)
  }, [lang])

  const t = (key) => {
    const keys = key.split('.')
    let result = translations[lang]
    for (const k of keys) {
      if (result[k] === undefined) return key
      result = result[k]
    }
    return result
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, dir, t }}>
      <div style={{ direction: dir }}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)

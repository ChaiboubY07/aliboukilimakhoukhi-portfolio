import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { dict } from './translations.js';

const LangContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('fr');
  const t = dict[lang];

  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title =
      lang === 'ar'
        ? 'ALI BOUKILI MAKHOUKHI — نقّاش الحجر'
        : 'ALI BOUKILI MAKHOUKHI — Tailleur de pierre';
  }, [lang]);

  const switchLang = useCallback((next) => setLang(next), []);

  return <LangContext.Provider value={{ lang, setLang, switchLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
}

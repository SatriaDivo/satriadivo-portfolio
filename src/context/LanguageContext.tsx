import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'id' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  hasChosenLang: boolean;
  setHasChosenLang: (chosen: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'satria_portfolio_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>('id');
  const [hasChosenLang, setHasChosenLang] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'id' || saved === 'en') {
        setLangState(saved);
        setHasChosenLang(true);
      }
    } catch {
      // localStorage unavailable fallback
    }
  }, []);

  // Synchronize document HTML lang attribute and browser tab title dynamically
  useEffect(() => {
    document.documentElement.lang = lang;
    if (lang === 'id') {
      document.title = 'Satria Divo Praditya: Data Scientist & Rekayasa IoT';
    } else {
      document.title = 'Satria Divo Praditya: Data Scientist & IoT Engineer';
    }
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    setHasChosenLang(true);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === 'id' ? 'en' : 'id');
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, hasChosenLang, setHasChosenLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { en } from "@/i18n/en";
import { ptBR } from "@/i18n/pt-BR";

type Language = "en" | "pt-BR";
type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en,
  "pt-BR": ptBR,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = useCallback(
    (key: string) => {
      const keys = key.split(".");
      let value: any = translations[language];
      
      for (const k of keys) {
        if (value?.[k] === undefined) {
          console.warn(`Translation key not found: ${key}`);
          return key;
        }
        value = value[k];
      }
      
      return value;
    },
    [language]
  );

  return (
    <LanguageContext.Provider
      value={{
        language,
        translations: translations[language],
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
} 
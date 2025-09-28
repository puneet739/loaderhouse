import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import en from './locales/en.json';
import fr from './locales/fr.json';

const dictionaries = { en, fr };

function format(str, params) {
  if (!params) return str;
  return Object.keys(params).reduce((acc, k) => acc.replace(new RegExp(`{${k}}`, 'g'), String(params[k])), str);
}

const I18nContext = createContext({
  locale: 'en',
  setLocale: () => {},
  t: (key, params) => key,
});

export function I18nProvider({ defaultLocale = 'en', children }) {
  const [locale, setLocale] = useState(defaultLocale);

  const t = useCallback((key, params) => {
    const dict = dictionaries[locale] || dictionaries.en;
    const parts = key.split('.');
    let cur = dict;
    for (const p of parts) {
      cur = (cur && cur[p]) || undefined;
    }
    if (typeof cur === 'string') return format(cur, params);
    // fallback to key
    return key;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}

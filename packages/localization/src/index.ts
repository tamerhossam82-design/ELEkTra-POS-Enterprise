import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { Language } from '@elektra/shared';
import { en } from './locales/en.js';
import { ar } from './locales/ar.js';
import { applyDocumentDirection } from './config.js';

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

export async function initI18n(defaultLanguage: Language = 'en'): Promise<typeof i18n> {
  await i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

  applyDocumentDirection(defaultLanguage);
  return i18n;
}

export async function changeLanguage(language: Language): Promise<void> {
  await i18n.changeLanguage(language);
  applyDocumentDirection(language);
}

export { i18n };
export { applyDocumentDirection, getDirection, languageConfig } from './config.js';

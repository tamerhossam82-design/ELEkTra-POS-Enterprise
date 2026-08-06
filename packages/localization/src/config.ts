import type { Language } from '@elektra/shared';

export const languageConfig: Record<
  Language,
  { label: string; direction: 'ltr' | 'rtl'; locale: string }
> = {
  en: { label: 'English', direction: 'ltr', locale: 'en-US' },
  ar: { label: 'العربية', direction: 'rtl', locale: 'ar-SA' },
};

export function getDirection(language: Language): 'ltr' | 'rtl' {
  return languageConfig[language].direction;
}

export function applyDocumentDirection(language: Language): void {
  const { direction, locale } = languageConfig[language];
  document.documentElement.dir = direction;
  document.documentElement.lang = language;
  document.documentElement.setAttribute('data-locale', locale);
}

import { useCallback } from 'react';
import { changeLanguage } from '@elektra/localization';
import { useAppStore } from '@/presentation/stores';
import type { Language } from '@elektra/shared';

export function useLanguageSwitch() {
  const { language, setLanguage } = useAppStore();

  const switchLanguage = useCallback(
    async (lang: Language) => {
      await changeLanguage(lang);
      setLanguage(lang);
    },
    [setLanguage],
  );

  return { language, switchLanguage };
}

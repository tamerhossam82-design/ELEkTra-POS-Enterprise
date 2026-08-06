import { useEffect, useState, type ReactNode } from 'react';
import { initI18n } from '@elektra/localization';
import { useAppStore } from '@/presentation/stores';
import type { Language } from '@elektra/shared';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const language = useAppStore((s) => s.language);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void initI18n(language as Language).then(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Bell, Sun, Moon, Globe, LogOut } from 'lucide-react';
import { Avatar, Button, cn } from '@elektra/ui';
import { useAppStore, useAuthStore, useNotificationStore } from '@/presentation/stores';
import { useLanguageSwitch } from '@/presentation/hooks/use-language';
import type { Language } from '@elektra/shared';

export function Header() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useAppStore();
  const { session, logout } = useAuthStore();
  const { notifications, unreadCount, markAllRead } = useNotificationStore();
  const { language, switchLanguage } = useLanguageSwitch();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleLang = () => {
    void switchLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="relative w-full max-w-md">
        <Search className="absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder={t('common.search')}
          className={cn(
            'h-10 w-full rounded-lg border border-input bg-muted/50 ps-10 pe-4',
            'text-sm focus:outline-none focus:ring-2 focus:ring-ring',
          )}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleLang} title={t('language.switch')}>
          <Globe className="h-5 w-5" />
          <span className="sr-only">{language.toUpperCase()}</span>
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme} title={t('theme.toggle')}>
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        <div className="relative" ref={notifRef}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -end-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </Button>

          {showNotifications && (
            <div className="absolute end-0 top-full z-50 mt-2 w-80 rounded-lg border bg-card shadow-lg">
              <div className="flex items-center justify-between border-b p-3">
                <span className="text-sm font-semibold">{t('notifications.title')}</span>
                <button onClick={markAllRead} className="text-xs text-primary hover:underline">
                  {t('notifications.markAllRead')}
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-center text-sm text-muted-foreground">
                    {t('notifications.empty')}
                  </p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={cn('border-b p-3 last:border-0', !n.read && 'bg-primary/5')}
                    >
                      <p className="text-sm font-medium">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {session && (
          <div className="ms-2 flex items-center gap-3 border-s ps-4">
            <Avatar name={session.user.fullName} size="sm" />
            <div className="hidden md:block">
              <p className="text-sm font-medium">{session.user.fullName}</p>
              <p className="text-xs text-muted-foreground">{session.user.role.name}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={logout} title={t('auth.logout')}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthSession, Theme, Language } from '@elektra/shared';

interface AuthState {
  session: AuthSession | null;
  isAuthenticated: boolean;
  setSession: (session: AuthSession | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      isAuthenticated: false,
      setSession: (session) => set({ session, isAuthenticated: !!session }),
      logout: () => set({ session: null, isAuthenticated: false }),
    }),
    { name: 'elektra-auth' },
  ),
);

interface AppState {
  theme: Theme;
  language: Language;
  sidebarCollapsed: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setLanguage: (language: Language) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      language: 'en',
      sidebarCollapsed: false,
      setTheme: (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        set({ theme });
      },
      toggleTheme: () => {
        const next = get().theme === 'light' ? 'dark' : 'light';
        document.documentElement.classList.toggle('dark', next === 'dark');
        set({ theme: next });
      },
      setLanguage: (language) => set({ language }),
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
    }),
    {
      name: 'elektra-app',
      onRehydrateStorage: () => (state) => {
        if (state?.theme === 'dark') {
          document.documentElement.classList.add('dark');
        }
      },
    },
  ),
);

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [
    {
      id: '1',
      title: 'Low Stock Alert',
      message: 'Premium Coffee Beans is running low (5 units left)',
      read: false,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: 'Daily Report Ready',
      message: 'Your daily sales report is ready for review',
      read: false,
      createdAt: new Date(Date.now() - 3600000),
    },
  ],
  unreadCount: 2,
  markAllRead: () =>
    set({
      notifications: get().notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }),
  addNotification: (notification) => {
    const newNotif: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      read: false,
      createdAt: new Date(),
    };
    set((s) => ({
      notifications: [newNotif, ...s.notifications],
      unreadCount: s.unreadCount + 1,
    }));
  },
}));

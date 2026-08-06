import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Warehouse,
  Users,
  BarChart3,
  Settings,
  UserCog,
  ChevronLeft,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { cn } from '@elektra/ui';
import { useAppStore } from '@/presentation/stores';

const navItems = [
  { key: 'dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { key: 'pos', icon: ShoppingCart, path: '/pos' },
  { key: 'products', icon: Package, path: '/products' },
  { key: 'inventory', icon: Warehouse, path: '/inventory' },
  { key: 'customers', icon: Users, path: '/customers' },
  { key: 'reports', icon: BarChart3, path: '/reports' },
  { key: 'users', icon: UserCog, path: '/users' },
  { key: 'settings', icon: Settings, path: '/settings' },
] as const;

export function Sidebar() {
  const { t } = useTranslation();
  const { sidebarCollapsed, toggleSidebar } = useAppStore();

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 72 : 256 }}
      transition={{ duration: 0.2 }}
      className="flex h-full flex-col bg-sidebar text-sidebar-foreground"
    >
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
          <Zap className="h-5 w-5 text-primary-foreground" />
        </div>
        {!sidebarCollapsed && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="truncate text-sm font-bold"
          >
            {t('common.appName')}
          </motion.span>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map(({ key, icon: Icon, path }) => (
          <NavLink
            key={key}
            to={path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-white/10 hover:text-sidebar-foreground',
              )
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>{t(`nav.${key}`)}</span>}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={toggleSidebar}
        className="flex h-12 items-center justify-center border-t border-white/10 hover:bg-white/10"
        aria-label="Toggle sidebar"
      >
        {sidebarCollapsed ? (
          <ChevronRight className="h-5 w-5 rtl:rotate-180" />
        ) : (
          <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
        )}
      </button>
    </motion.aside>
  );
}

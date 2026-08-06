import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@elektra/ui';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const location = useLocation();

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
      <Link to="/dashboard" className="hover:text-foreground">
        <Home className="h-4 w-4" />
      </Link>
      {items.map((item, index) => (
        <span key={item.path ?? item.label} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4 rtl:rotate-180" />
          {item.path && index < items.length - 1 ? (
            <Link
              to={item.path}
              className={cn(
                'hover:text-foreground',
                location.pathname === item.path && 'text-foreground font-medium',
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

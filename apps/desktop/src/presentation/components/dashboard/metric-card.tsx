import type { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: ReactNode;
}

export function MetricCard({ title, value, change, icon }: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-1 text-2xl font-bold">{value}</p>
            <div className="mt-2 flex items-center gap-1">
              <span
                className={`text-xs ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}
              >
                {isPositive ? '↑' : '↓'} {Math.abs(change)}%
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
        </div>
      </div>
    </div>
  );
}

export function formatCurrency(value: number, locale = 'en-SA', currency = 'SAR'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

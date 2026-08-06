import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  Package,
  CreditCard,
  Banknote,
  ShoppingCart,
  Plus,
  Truck,
  BarChart3,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Badge, cn } from '@elektra/ui';
import { Breadcrumb } from '@/presentation/components/layout/breadcrumb';
import { MetricCard, formatCurrency } from '@/presentation/components/dashboard/metric-card';
import { useDashboard } from '@/presentation/hooks/use-dashboard';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const quickActions = [
  { key: 'newSale', icon: ShoppingCart, color: 'bg-emerald-500' },
  { key: 'addProduct', icon: Plus, color: 'bg-blue-500' },
  { key: 'receiveStock', icon: Truck, color: 'bg-amber-500' },
  { key: 'viewReports', icon: BarChart3, color: 'bg-purple-500' },
] as const;

export function DashboardPage() {
  const { t } = useTranslation();
  const { metrics, topProducts, recentActivity, isLoading } = useDashboard();

  if (isLoading || !metrics) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb items={[{ label: t('dashboard.title') }]} />
        <h1 className="mt-2 text-2xl font-bold">{t('dashboard.title')}</h1>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
      >
        <motion.div variants={item}>
          <MetricCard title={t('dashboard.todaySales')} value={formatCurrency(metrics.todaySales)} change={12.5} icon={<DollarSign className="h-5 w-5" />} />
        </motion.div>
        <motion.div variants={item}>
          <MetricCard title={t('dashboard.todayProfit')} value={formatCurrency(metrics.todayProfit)} change={8.3} icon={<TrendingUp className="h-5 w-5" />} />
        </motion.div>
        <motion.div variants={item}>
          <MetricCard title={t('dashboard.inventoryValue')} value={formatCurrency(metrics.inventoryValue)} change={-2.1} icon={<Package className="h-5 w-5" />} />
        </motion.div>
        <motion.div variants={item}>
          <MetricCard title={t('dashboard.customerCredit')} value={formatCurrency(metrics.customerCredit)} change={5.7} icon={<CreditCard className="h-5 w-5" />} />
        </motion.div>
        <motion.div variants={item}>
          <MetricCard title={t('dashboard.cashDrawer')} value={formatCurrency(metrics.cashDrawer)} change={0} icon={<Banknote className="h-5 w-5" />} />
        </motion.div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <motion.div variants={item} initial="hidden" animate="show">
          <Card>
            <CardHeader><CardTitle>{t('dashboard.quickActions')}</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {quickActions.map(({ key, icon: Icon, color }) => (
                <button key={key} className="flex flex-col items-center gap-2 rounded-lg border p-4 transition-colors hover:bg-accent">
                  <div className={cn('rounded-lg p-2 text-white', color)}><Icon className="h-5 w-5" /></div>
                  <span className="text-xs font-medium">{t(`dashboard.${key}`)}</span>
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show">
          <Card className="h-full">
            <CardHeader><CardTitle>{t('dashboard.recentActivity')}</CardTitle></CardHeader>
            <CardContent>
              {recentActivity.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t('common.noResults')}</p>
              ) : (
                <ul className="space-y-3">
                  {recentActivity.map((activity) => (
                    <li key={activity.id} className="flex items-start gap-3 border-b pb-3 last:border-0">
                      <Badge variant="secondary">{activity.action}</Badge>
                      <div className="flex-1">
                        <p className="text-sm">{activity.entity}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.userName ?? 'System'} · {activity.createdAt.toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} initial="hidden" animate="show">
          <Card className="h-full">
            <CardHeader><CardTitle>{t('dashboard.topProducts')}</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {topProducts.map((product, index) => (
                  <li key={product.id} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.quantitySold} {t('dashboard.unitsSold')}</p>
                    </div>
                    <span className="text-sm font-semibold">{formatCurrency(product.revenue)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

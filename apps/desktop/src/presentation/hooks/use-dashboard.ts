import { useEffect, useState } from 'react';
import { getDashboardUseCase } from '@/infrastructure/di/container';
import type { IDashboardMetrics, ITopProduct, IRecentActivity } from '@elektra/shared';

interface DashboardData {
  metrics: IDashboardMetrics | null;
  topProducts: ITopProduct[];
  recentActivity: IRecentActivity[];
  isLoading: boolean;
  error: string | null;
}

export function useDashboard(): DashboardData {
  const [metrics, setMetrics] = useState<IDashboardMetrics | null>(null);
  const [topProducts, setTopProducts] = useState<ITopProduct[]>([]);
  const [recentActivity, setRecentActivity] = useState<IRecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const useCase = getDashboardUseCase();
        const [m, tp, ra] = await Promise.all([
          useCase.getMetrics(),
          useCase.getTopProducts(5),
          useCase.getRecentActivity(10),
        ]);
        setMetrics(m);
        setTopProducts(tp);
        setRecentActivity(ra);
      } catch {
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };
    void load();
  }, []);

  return { metrics, topProducts, recentActivity, isLoading, error };
}

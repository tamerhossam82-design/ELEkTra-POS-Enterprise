/// <reference types="vite/client" />

import type { LoginCredentials, AuthSession, Result } from '@elektra/shared';

interface ElektraAPI {
  platform: string;
  auth: {
    login: (credentials: LoginCredentials) => Promise<Result<AuthSession, string>>;
  };
  dashboard: {
    getMetrics: () => Promise<{
      todaySales: number;
      todayProfit: number;
      inventoryValue: number;
      customerCredit: number;
      cashDrawer: number;
    }>;
    getTopProducts: (limit: number) => Promise<
      Array<{ id: string; name: string; quantitySold: number; revenue: number }>
    >;
    getRecentActivity: (limit: number) => Promise<
      Array<{
        id: string;
        action: string;
        entity: string;
        userName: string | null;
        createdAt: string;
      }>
    >;
  };
}

interface Window {
  elektra?: ElektraAPI;
}

import type { Result } from '../types/common.js';
import type { AuthSession, LoginCredentials } from '../repositories/index.js';

export interface ILoginUseCase {
  execute(credentials: LoginCredentials): Promise<Result<AuthSession, string>>;
}

export interface IDashboardMetrics {
  todaySales: number;
  todayProfit: number;
  inventoryValue: number;
  customerCredit: number;
  cashDrawer: number;
}

export interface ITopProduct {
  id: string;
  name: string;
  quantitySold: number;
  revenue: number;
}

export interface IRecentActivity {
  id: string;
  action: string;
  entity: string;
  userName: string | null;
  createdAt: Date;
}

export interface IDashboardUseCase {
  getMetrics(): Promise<IDashboardMetrics>;
  getTopProducts(limit: number): Promise<ITopProduct[]>;
  getRecentActivity(limit: number): Promise<IRecentActivity[]>;
}

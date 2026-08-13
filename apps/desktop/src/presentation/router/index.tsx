import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/presentation/components/layout/app-shell';
import { ProtectedRoute } from '@/presentation/components/auth/protected-route';
import { ProductsPage } from '@/presentation/pages/products-page';
import { LoginPage } from '@/presentation/pages/login-page';
import { DashboardPage } from '@/presentation/pages/dashboard-page';

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex h-64 items-center justify-center rounded-lg border border-dashed">
      <p className="text-muted-foreground">{title} — Coming Soon</p>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/pos" element={<PlaceholderPage title="Point of Sale" />} />
          <Route path="/products" element={<PlaceholderPage title="Products" />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/inventory" element={<PlaceholderPage title="Inventory" />} />
          <Route path="/customers" element={<PlaceholderPage title="Customers" />} />
          <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
          <Route path="/users" element={<PlaceholderPage title="Users" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

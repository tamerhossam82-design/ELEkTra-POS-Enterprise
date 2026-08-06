import { AppProviders } from '@/presentation/providers/app-providers';
import { AppRouter } from '@/presentation/router';

export function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

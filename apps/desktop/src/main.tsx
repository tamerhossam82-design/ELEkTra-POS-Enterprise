import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@elektra/ui/styles.css';
import './index.css';
import { App } from './app/App';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

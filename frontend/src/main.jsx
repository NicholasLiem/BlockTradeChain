import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BlockchainProvider } from './context/BlockchainContext';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BlockchainProvider>
        <App />
      </BlockchainProvider>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
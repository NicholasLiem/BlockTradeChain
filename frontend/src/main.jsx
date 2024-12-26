// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BlockchainProvider } from './context/BlockchainContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    // <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BlockchainProvider>
          <App />
        </BlockchainProvider>
      </AuthProvider>
    </BrowserRouter>
    // </StrictMode>
  );
} else {
  console.error('Root element not found');
}
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BlockchainProvider } from './context/BlockchainContext';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { NotificationProvider } from './context/NotificationContext';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from "@chakra-ui/react/preset";

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <ChakraProvider value={system}>
          <NotificationProvider>
            <AuthProvider>
              <BlockchainProvider>
                <App />
              </BlockchainProvider>
            </AuthProvider>
          </NotificationProvider>
        </ChakraProvider>
      </BrowserRouter>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}
import './App.css'
import { useEffect, useState } from 'react';
import { Provider } from "@/components/ui/provider"
import UserMenu from './components/menubar/UserMenu'
import VisitorMenu from './components/menubar/VisitorMenu'
import { Center, Flex } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './components/page/HomePage'
import InboxPage from './components/page/InboxPage'
import ExportPage from './components/page/ExportPage'
import HistoryPage from './components/page/HistoryPage'
import SettingsPage from './components/page/SettingsPage'
import Dashboard from './components/Dashboard'
import LoginPage from './components/page/LoginPage'
import isSessionValid from './util/isSessionValid'

function App() {
  return (
    <Provider>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

function AppContent() {
  const location = useLocation();
  const [isValidSession, setIsValidSession] = useState(isSessionValid());

  useEffect(() => {
    setIsValidSession(isSessionValid());
  }, [location]);

  return (
    <>
      <Center className='menu-container'>
        {isValidSession ? <UserMenu /> : <VisitorMenu />}
      </Center>
      <Center className='page-container'>
        <Flex direction={'column'} align={'start'} w={'100%'} h={'100%'} p={'5%'}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/export" element={<ExportPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Flex>
      </Center>
    </>
  );
}

export default App;

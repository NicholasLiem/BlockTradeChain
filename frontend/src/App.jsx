import './App.css'
import { Provider } from "@/components/ui/provider"
import UserMenu from './components/menubar/UserMenu'
import VisitorMenu from './components/menubar/VisitorMenu'
import { Center, Flex } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/page/HomePage'
import InboxPage from './components/page/InboxPage'
import ExportPage from './components/page/ExportPage'
import HistoryPage from './components/page/HistoryPage'
import SettingsPage from './components/page/SettingsPage'

function App() {

  return (
    <>
      <Provider>
        <Router>
          <Center className='menu-container'>
            {/* <VisitorMenu/> */}
            <UserMenu/>
          </Center>
          <Center className='page-container'>
            <Flex direction={'column'} align={'start'} w={'100%'} h={'100%'} p={'5%'}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/inbox" element={<InboxPage />} />
                <Route path="/export" element={<ExportPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </Flex>
          </Center>
        </Router>
      </Provider>
    </>
  )
}

export default App

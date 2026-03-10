import { Routes, Route, Navigate } from 'react-router-dom'
import { PollingProvider } from './context/PollingContext'
import AdminView from './components/AdminView'
import UserView from './components/UserView'
import Navigation from './components/Navigation'

function App() {
  return (
    <PollingProvider>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Navigation />
        <Routes>
          <Route path="/" element={<Navigate to="/user" replace />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/user" element={<UserView />} />
        </Routes>
      </div>
    </PollingProvider>
  )
}

export default App

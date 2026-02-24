import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from './context'
import TopNav from './components/TopNav'
import LoginPage from './pages/LoginPage'
import CitizenDashboard from './pages/CitizenDashboard'
import PoliticianDashboard from './pages/PoliticianDashboard'
import AdminDashboard from './pages/AdminDashboard'

function AppRoutes() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soft-green-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-soft-green-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  return (
    <>
      <TopNav />
      <Routes>
        <Route
          path="/dashboard"
          element={
            user.role === 'citizen' ? <CitizenDashboard /> :
            user.role === 'politician' ? <PoliticianDashboard /> :
            user.role === 'admin' || user.role === 'moderator' ? <AdminDashboard /> :
            <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App

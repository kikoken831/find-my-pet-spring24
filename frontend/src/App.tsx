import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import 'leaflet/dist/leaflet.css'
import 'react-toastify/dist/ReactToastify.css'

import Locator from './components/Locator/locator'
import Report from './components/Report/report'
import ReportHistory from './components/Report/reportHistory'
import Sidebar from './components/sidebar/Sidebar'
import Main from './components/main/Main'
import LoginPage from './components/Auth/Login'
import RegisterPage from './components/Auth/Register'
import { ToastContainer } from 'react-toastify'
import useToken from './hooks/useToken'

export const App: React.FC = () => {
  const GetRoutes = () => {
    const token = useToken()
    if (!token) return <UnauthenticatedRoutes />
    return <AuthenticatedRoutes />
  }

  return (
    <>
      <Router>
        <ToastContainer />
        <GetRoutes />
      </Router>
    </>
  )
}

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/report" element={<Report />} />
      <Route path="/locator" element={<Locator />} />
      <Route path="/profile" element={<div>myprofile</div>} />
      <Route path="/reportHistory" element={<ReportHistory />} />
    </Routes>
  )
}

const UnauthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

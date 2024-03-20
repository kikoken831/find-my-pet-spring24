import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import 'leaflet/dist/leaflet.css'
import 'react-toastify/dist/ReactToastify.css'

import Locator from './components/Locator/locator'
import Report from './components/Report/report'
import ReportHistory from './components/Report/reportHistory'
import Sidebar from './components/sidebar/Sidebar'
import Main from './components/main/Main'
import { useAppSelector } from './common'
import LoginPage from './components/Auth/Login'
import RegisterPage from './components/Auth/Register'
import { ToastContainer } from 'react-toastify'

export const App: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token)

  const GetRoutes = () => {
    if (!token) return <UnauthenticatedRoutes />

    return <AuthenticatedRoutes />
  }
  return (
    <>
      <ToastContainer />
      <Router>
        <GetRoutes />
      </Router>
    </>
  )
}

const AuthenticatedRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <Routes>
        <Route path="/report" element={<Report />} />
      </Routes>
      <Routes>
        <Route path="/locator" element={<Locator />} />
      </Routes>
      <Routes>
        <Route path="/profile" element={<div>myprofile</div>} />
      </Routes>
      <Routes>
        <Route
          path="/reportHistory"
          element={<ReportHistory></ReportHistory>}
        />
      </Routes>
    </>
  )
}

const UnauthenticatedRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  )
}

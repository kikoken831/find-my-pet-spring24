import 'leaflet/dist/leaflet.css'
import 'react-toastify/dist/ReactToastify.css'

import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Locator from './Component/Locator/locator'
import Report from './Component/Report/report'
import ReportHistory from './Component/Report/reportHistory'
import Sidebar from './Component/sidebar/Sidebar'
import Main from './Component/main/Main'
import LoginPage from './Component/Auth/Login'
import RegisterPage from './Component/Auth/Register'
import { ToastContainer } from 'react-toastify'
import useToken from './hooks/useToken'
import Loader from './Component/common/Loader'

export const App: React.FC = () => {
  const token = useToken()

  const GetRoutes = () => {
    if (!token) return <UnauthenticatedRoutes />

    return <AuthenticatedRoutes />
  }

  return (
    <Router>
      <Loader />
      <div>{token && <Sidebar />}</div>
      <GetRoutes />
      <ToastContainer />
    </Router>
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

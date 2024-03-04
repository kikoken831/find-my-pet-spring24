import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import Locator from '../Component/Locator/locator'
import Report from '../Component/Report/report'
import ReportHistory from '../Component/Report/reportHistory'
import Sidebar from '../Component/sidebar/Sidebar'
import Footer from '../Component/footer/footer'

export const PageRouter: React.FC = () => {
  return (
    <Router>
      <div>
        <Sidebar />
      </div>

      <Routes>
        <Route path="/" element={<div>main</div>} />
      </Routes>
      <Routes>
        <Route path="/report" element={<Report></Report>} />
      </Routes>
      <Routes>
        <Route path="/locator" element={<Locator></Locator>} />
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
    </Router>
  )
}

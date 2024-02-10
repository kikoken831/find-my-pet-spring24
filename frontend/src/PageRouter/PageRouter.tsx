import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

export const PageRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Hello</div>} />
      </Routes>
    </Router>
  )
}

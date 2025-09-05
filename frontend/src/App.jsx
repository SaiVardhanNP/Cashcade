import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import SendMoney from './pages/SendMoney'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import ErrorPage from './pages/ErrorPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/' element={<LandingPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/send-money' element={<SendMoney />} />
        <Route path='/*' element={<ErrorPage />} />



      </Routes>
    </Router>
  )
}

export default App

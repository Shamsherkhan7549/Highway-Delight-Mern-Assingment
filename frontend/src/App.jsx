import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './component/Navbar'
import { AppContext } from './context/ContextApi.jsx'


const App = () => {
  const context = useContext(AppContext);
  return (
    <>

      <BrowserRouter>
          <Navbar />
        <Routes>
          <Route path="/" element={context.token == null ? <Navigate to="/login" /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
import React from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import Booking from './pages/Customer/Booking';
import Login from './pages/Login';
import Register from './pages/Customer/Register';
import ProvProfile from './pages/Provider/ProvProfile';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path='/login' element={<Login />}/>
      {/* Customer */}
      <Route path='/register' element={<Register />}/>
      <Route path="/booking" element={<Booking />} />
      {/* Provider */}
      <Route path='/provider/profile' element={<ProvProfile />}/>
    </Routes>
  )
}

export default App

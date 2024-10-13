import React from 'react'
import {Routes, Route, Navigate } from 'react-router-dom'
import Booking from './pages/Customer/Booking';
import Login from './pages/Login';
import Register from './pages/Customer/Register';
import ProvProfile from './pages/Provider/ProvProfile';
import Confirm from './pages/Provider/Confirm';
import HomePro from './pages/Provider/HomePro';
import CusHistory from './pages/Customer/History';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path='/login' element={<Login />}/>
      {/* Customer */}
      <Route path='/register' element={<Register />}/>
      <Route path="/booking" element={<Booking />} />
      <Route path="/history" element={<CusHistory />} />
      {/* Provider */}
      <Route path="/HomeProvider" element={<HomePro/>} />
      <Route path="/Confirm" element={<Confirm/>} />
      <Route path='/Profile' element={<ProvProfile />}/>
    </Routes>
  )
}

export default App

import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CusHome from './pages/Customer/Home';
import CusHistory from './pages/Customer/History';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CusHome />} />
      <Route path="/history" element={<CusHistory />} />
    </Routes>
  )
}

export default App

import React from 'react'
import {Routes, Route} from 'react-router-dom'
import CusHome from './pages/Customer/Home';
import Confirm from './pages/Provider/Confirm';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CusHome />} />
      <Route path="/Confirm" element={<Confirm/>} />
    </Routes>
  )
}

export default App

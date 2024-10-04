import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CusHome from './pages/Customer/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CusHome />} />
    </Routes>
  )
}

export default App

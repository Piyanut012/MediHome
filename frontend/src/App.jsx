import React from 'react'
import {Routes, Route} from 'react-router-dom'
import CusHome from './pages/Customer/Home';
import Confirm from './pages/Provider/Confirm';
import HomePro from './pages/Provider/HomePro';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CusHome />} />
      <Route path="/Confirm" element={<Confirm/>} />
      <Route path="/HomeProvider" element={<HomePro/>} />
    </Routes>
  )
}

export default App

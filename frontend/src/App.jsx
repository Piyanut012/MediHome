import React from 'react'
import {Routes, Route} from 'react-router-dom'
import CusHome from './pages/Customer/Home';
import Login from './pages/Login';
import Register from './pages/Customer/Register';
import ProvProfile from './pages/Provider/ProvProfile';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CusHome />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/provider/profile' element={<ProvProfile />}/>
    </Routes>
  )
}

export default App

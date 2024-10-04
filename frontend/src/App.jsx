import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import CusHome from './pages/Customer/Home';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<CusHome />} />
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
    </Routes>
  )
}

export default App

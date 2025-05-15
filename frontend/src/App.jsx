import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage'
import Loginpage from './pages/Loginpage'
import UserRegistrationpage from './pages/UserRegistrationpage'
import SellerLoginpage from './pages/SellerLoginpage'
import SellerRegistrationpage from './pages/SellerRegistrationpage'
import AdminLoginpage from './pages/AdminLoginpage'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/user-registration" element={<UserRegistrationpage />} />
        <Route path="/seller-login" element={<SellerLoginpage />} />
        <Route path="/seller-registration" element={<SellerRegistrationpage />} />
        <Route path="/admin-login" element={<AdminLoginpage />} />
      </Routes>
    </div>
  )
}

export default App

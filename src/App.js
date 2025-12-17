import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Watches from './pages/Watches'
import Cart from './pages/Cart'
import Checkout from "./pages/Checkout"
import Orders from './pages/Orders'
import Invoice from './pages/Invoice'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <BrowserRouter>

      {/* Navbar only after login */}
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}

      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} />
          }
        />

        <Route
          path="/signup"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Signup setIsLoggedIn={setIsLoggedIn} />
          }
        />

        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/watches"
          element={isLoggedIn ? <Watches /> : <Navigate to="/login" />}
        />

        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
        />

        <Route
          path="/checkout"
          element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />}
        />

        <Route
          path="/orders"
          element={isLoggedIn ? <Orders /> : <Navigate to="/login" />}
        />

        {/* 🔥 FIXED INVOICE ROUTE */}
        <Route
          path="/invoice/:id"
          element={isLoggedIn ? <Invoice /> : <Navigate to="/login" />}
        />

        <Route
          path="/settings"
          element={isLoggedIn ? <Settings /> : <Navigate to="/login" />}
        />

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App

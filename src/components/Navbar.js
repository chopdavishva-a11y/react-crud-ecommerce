import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Navbar({ setIsLoggedIn }) {
  const navigate = useNavigate()
  const [count, setCount] = useState(0)

  // 🔹 Cart count load
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || []
    setCount(cart.reduce((sum, i) => sum + (i.qty || 1), 0))
  }, [])

  const logout = () => {
    setIsLoggedIn(false)
    navigate("/login")
  }

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center px-[150px]">
      <h2 className="text-xl font-bold">My CRUD</h2>

      <nav className="flex items-center gap-5 text-sm">
        <Link to="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
        <Link to="/watches" className="text-blue-600 font-medium">Watches</Link>

        {/* 🛒 CART WITH BADGE */}
        <Link
          to="/cart"
          className="relative text-blue-600 font-medium"
        >
          Cart
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
              {count}
            </span>
          )}
        </Link>
        <Link to="/checkout" className="text-blue-600 font-medium">Checkout</Link>
        <Link to="/orders" className="text-blue-600 font-medium">Orders</Link>
        <Link to="/invoice" className="text-blue-600 font-medium">Invoice</Link>
        <Link to="/settings" className="text-blue-600 font-medium">Settings</Link>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </nav>
    </header>
  )
}

export default Navbar

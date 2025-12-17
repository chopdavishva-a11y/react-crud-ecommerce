import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const users = JSON.parse(localStorage.getItem('users')) || []

    const validUser = users.find(
      (u) => u.email === email && u.password === password
    )

    if (!validUser) {
      setError('Invalid email or password')
      return
    }

    setIsLoggedIn(true)
    navigate('/dashboard')
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-6 shadow w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-blue-600 text-white w-full py-2 mb-3">
          Login
        </button>

        <p className="text-sm text-center">
          You haven’t an account?{' '}
          <Link to="/signup" className="text-blue-600 font-medium">
            Signup
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login


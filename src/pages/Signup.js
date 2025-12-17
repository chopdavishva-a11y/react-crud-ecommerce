import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup({ setIsLoggedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSignup = (e) => {
    e.preventDefault()

    // Get existing users
    const users = JSON.parse(localStorage.getItem('users')) || []

    // Check duplicate email
    const userExists = users.find((u) => u.email === email)

    if (userExists) {
      setError('User already exists. Please login.')
      return
    }

    // Add new user
    users.push({ email, password })

    // Save back to localStorage
    localStorage.setItem('users', JSON.stringify(users))

    setIsLoggedIn(true)
    navigate('/dashboard')
  }

  return (
    <div className="h-screen flex items-center justify-center">
      <form onSubmit={handleSignup} className="bg-white p-6 shadow w-80">
        <h2 className="text-xl font-bold mb-4">Signup</h2>

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

        <button className="bg-green-600 text-white w-full py-2">
          Signup
        </button>
      </form>
    </div>
  )
}

export default Signup



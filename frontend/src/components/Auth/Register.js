import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { registerUser } from '../../Api/api'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await registerUser({ username, email, password })
      history.push('/login')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full border-2 border-black  bg-gradient-to-t from-white to-sky-300  p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          <i className="pi pi-user-plus px-2 text-sky-500 mx-auto"></i>
          Kayıt Ol
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className=" grid grid-flow-col">
            <i className="pi pi-user text-sky-500 my-auto text-xl"></i>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full col-span-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-flow-col">
            <i className="pi pi-at text-sky-500 my-auto text-xl"></i>
            <input
              type="email"
              placeholder="Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full col-span-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-flow-col">
            <i className="pi pi-key text-sky-500 my-auto text-xl"></i>
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full col-span-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-1/2 mx-auto text-center bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register

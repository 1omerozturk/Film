import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { loginUser } from '../../Api/api'
import 'react-toastify/dist/ReactToastify.css'
import { Link, NavLink } from 'react-router-dom/cjs/react-router-dom.min'
import showToast from '../Alert/ShowToast'

const LoginPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const history = useHistory()


  const validateForm = () => {
    const errors = {}
    // Email validation
    if (!email) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email address is invalid'
    }

    // Password validation
    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 5) {
      errors.password = 'Password must be at least 5 characters long'
    }

    setErrors(errors)
  }


  const handleLogin = async (e) => {
    e.preventDefault()
    validateForm() // Formu tekrar doğrula

    if (Object.keys(errors).length > 0) {
      return // Hatalar varsa giriş işlemini yapma
    }

    try {
      const response = await loginUser({ email, password })
      const token=localStorage.setItem('token', response.data.token)
      const user=localStorage.setItem('user', JSON.stringify(response.data.user))
      setIsAuthenticated(!!user && !!token);
      const admin=localStorage.getItem( 'user')
      const loggedUser=JSON.parse(admin)
      const role=JSON.parse(admin)
      
      if(role.role==="admin"){
        showToast(`Hoşgeldiniz, ${loggedUser.username} ${loggedUser.role}`,"info")
        setTimeout(()=>{
          history.push('/admin')
          window.location.reload();
        },2000)
      }
      else{
        showToast(`Hoşgeldiniz, ${loggedUser.username} ${loggedUser.role}`
          ,"info")
        setTimeout(()=>{
          history.push('/')
          window.location.reload();
        },2000)
      }
    } 
    
    catch (error) {
      console.error('Login failed:', error)
      setErrors({ api: 'Login failed. Please try again.' })
    }
  }

  return (
    <div className="login-page flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full border-2 border-black  bg-gradient-to-t from-slate-400 to-slate-200  p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">
          <i className="pi pi-user px-2 text-sky-500 mx-auto"></i>
          Giriş
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {errors.api && (
            <p className="text-red-500 text-center">{errors.api}</p>
          )}
          <div className="grid grid-flow-col">
            <i className="pi pi-at text-sky-500 my-auto text-xl"></i>
            <input
              type="email"
              placeholder="Email"
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
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            required
              className="w-full col-span-5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
           
          </div>
          <div className='text-center'>

          <button
            type="submit"
            className="w-1/2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
            Login
          </button>
              </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from '../Auth/LogOutButton'
import {
  useHistory,
  useLocation,
} from 'react-router-dom/cjs/react-router-dom.min'
import showToast from '../Alert/ShowToast'
import { slide as Menu } from 'react-burger-menu'
import { Sidebar } from "flowbite-react";
import './Navbar.css' // react-burger-menu için gerekli CSS dosyasını import edin

const Navbar = ({ setSearchTerm }) => {
  const [user, setUser] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const history = useHistory()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsAuthenticated(true)
      var name = localStorage.getItem('user')
      name = JSON.parse(name)
      setUser(name.username)
    }
  }, [isAuthenticated])

  const handleLogout = () => {
    var user = localStorage.getItem('user')
    user = JSON.parse(user)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setIsAuthenticated(false)
    history.push('/login')
    showToast(`Tekrar görüşmek üzere, ${user.username}`, 'error')
  }

  return (
        <Menu >
        {location.pathname !== '/' && (
          <Link to="/">
            <button className="menu-item px-1 ml-5 py-2 bg-sky-500 w-1/2  text-white rounded-full font-semibold hover:bg-blue-700">
              <i className="pi pi-home text-2xl px-2 text-white"></i>
              Anasayfa
            </button>
          </Link>
        )}
        {location.pathname === '/' || location.pathname === '/admin' ? (
          <div className="menu-item">
            <input
              onChange={handleInputChange}
              className="rounded-3xl p-2 text-lg bg-transparent border-2 border-gray-600 placeholder:text-slate-300 focus:ring-blue-600 focus:ring-2 hover:border-sky-600 text-white px-3 font-semibold w-full text-nowrap"
              placeholder="Film ara"
              size={80}
            />
          </div>
        ) : (
          ''
        )}
        <div className="">
          {isAuthenticated ? (
            <>
              <Link to={isAuthenticated && '/admin'}>
                <button className=" text-sky-600 ml-5 bg-slate-300 w-1/2 rounded-full p-2 active:text-black active:bg-slate-100 text-xl font-semibold">
                  <i className="pi pi-user pr-3 text-2xl text-black"></i>

                  {user}
                </button>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="bg-slate-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded"
              >
                <i className="pi pi-sign-in px-2 text-white"></i>
                Giriş
              </Link>
              <Link to="/register">
                <button className=" bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  <i className="pi pi-user-plus px-2 text-white"></i>
                  Kayıt Ol
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="menu-item px-1 ml-5 py-2 bg-red-500 w-1/2  text-white rounded-full font-semibold hover:bg-red-700"
            >
              <i className="pi pi-sign-out text-2xl px-2 text-black"></i>
              Çıkış
            </button>
          )}
        </div>
      </Menu>
  )
}

export default Navbar

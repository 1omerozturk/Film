import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../Auth/LogOutButton';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import showToast from '../Alert/ShowToast';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history=useHistory();
  const location=useLocation();
 

  // Film Arama fonksiyonu Devam edilecek 

const handleSearch=(e)=>{
  e.preventDefault();
  const searchQuery=e.target.search.value.trim();
  if(searchQuery.length===0) return;
  history.push(`/search/${searchQuery}`)
  e.target.search.value=''
  }


  useEffect(()=>{
    if(localStorage.getItem('token')){
      setIsAuthenticated(true)
      }
  },isAuthenticated)


  const handleLogout = () => {
    var user=localStorage.getItem('user');
    user=JSON.parse(user);
    localStorage.removeItem('user');
  
    localStorage.removeItem('token');
  
    setIsAuthenticated(false);
    history.push('/login')
    showToast(`Tekrar görüşmek üzere, 
      ${user.username}`
      ,"error")
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-r to-slate-400 via-blue-500 from-slate-800 shadow-md">
      {location.pathname!=='/'?(

      <Link to="/" className="text-sky-600 bg-slate-300 rounded-full p-2 active:text-black active:bg-slate-100 text-xl font-semibold">
      <i className='pi pi-home px-2 text-black'></i>
        Anasayfa
      </Link>
      ):('')}
        <div className='flex items-center bg-transparent  space-x-4'>
          <input
          onChange={handleSearch}
          className='rounded-3xl p-2 text-lg bg-transparent border-2 
           placeholder:text-black
          active:ring-blue-500  hover:border-sky-600 border-slate-800 text-white px-3 font-semibold w-full text-nowrap'
          placeholder='Film ara'
          size={80}
          />

        </div>
      <div className="flex items-center space-x-4">
        {!isAuthenticated && (
          <>
            <Link to="/login" className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <i className='pi pi-sign-in px-2 text-white'></i>
              Giriş
            </Link>
            <Link to="/register" className="bg-slate-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            <i className='pi pi-user-plus px-2 text-white'></i>
              Kayıt Ol
            </Link>
          </>
        )}
        {isAuthenticated && (
           <button
           onClick={handleLogout}
           className="px-4 py-2 bg-red-500 text-white rounded-full underline hover:bg-red-700"
         >
           Çıkış
         </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

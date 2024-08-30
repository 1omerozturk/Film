import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../Auth/LogOutButton';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const user = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!user && !!token);
    };

    // Sayfa her yüklendiğinde veya localStorage'de değişiklik olduğunda çalışır
    checkAuthStatus();

    // localStorage değişikliklerini dinlemek için
    window.addEventListener('storage', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-gradient-to-r to-slate-400 via-blue-500 from-slate-800 shadow-md">
      <Link to="/" className="text-sky-600 bg-slate-300 rounded-full p-2 active:text-black active:bg-slate-100 text-xl font-semibold">
      <i className='pi pi-home px-2 text-black'></i>
        Anasayfa
      </Link>

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

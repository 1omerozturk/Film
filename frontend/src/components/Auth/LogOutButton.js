import React from 'react';

const handleLogout = () => {
  // Kullanıcıya ait token'ı temizleyin
localStorage.removeItem('token'); // veya sessionStorage.removeItem('token');
localStorage.removeItem('user');
  // Kullanıcıyı login sayfasına yönlendirin
  window.location.href = '/login'; // veya useHistory hook'u ile yönlendirme yapılabilir.
};
const LogoutButton = () => {
  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-full underline hover:bg-red-700"
    >
      Çıkış
    </button>
  );
};

export default LogoutButton;

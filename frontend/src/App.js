import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'primeicons/primeicons.css';
import MoviePage from './pages/MoviePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './components/Auth/Login';
import Register from './components/Auth/Register';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar/Navbar';
import PrivateRoute from './components/PrivateRoute';
import BgImage from './images/bg.jpeg'
import { Switch } from 'react-router-dom/cjs/react-router-dom';

const App = () => {
  return (
    <Router>
      <div
      className='h-full'
      style={{
        backgroundImage: `url(${BgImage})`,
        height: '100vh',
        backgroundSize: 'cover', // Resmin tüm ekrana sığması için cover kullanılır
        backgroundRepeat:'repeat-y',
        backgroundPosition: 'center', // Resmi ortalamak için
      }}
    >

      <Navbar />
      <ToastContainer />
      <Switch>
        <Route exact path="/"  component={Home} />
        <Route path="/movie/:id" component={MoviePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={Register} />
        <PrivateRoute path="/admin" component={AdminPage} />
        <Route component={NotFound} />
      </Switch>
      </div>
    </Router>
  );
};

export default App;
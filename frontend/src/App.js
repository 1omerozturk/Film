import React, { useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify'
import 'primeicons/primeicons.css'
import MoviePage from './pages/MoviePage'
import AdminPage from './pages/AdminPage'
import LoginPage from './components/Auth/Login'
import Register from './components/Auth/Register'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar/Navbar'
import PrivateRoute from './components/PrivateRoute'
import BgImage from './images/bg.jpeg'
import { Switch } from 'react-router-dom/cjs/react-router-dom'
import MovieSearch from './components/Movie/MovieSearch'
import WatchList from './components/Movie/WatchList'


const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  

  return (
    <Router>
      <div
        className="h-full bg-gradient-to-b from-sky-200 via-purple-400 to-emerald-300"
        // style={{
        //   backgroundImage: `url(${BgImage})`,
        //   height: '100vh',
        //   backgroundRepeat:'repeat-y',
        //   backgroundSize: 'cover', // Resmin tüm ekrana sığması için cover kullanılır
        //   backgroundPosition: 'center', // Resmi ortalamak için
        // }}
      >
        <ToastContainer />
        <div className="sticky z-10">
          <Navbar className="bg-transparent" setSearchTerm={setSearchTerm} />
        </div>


        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <Home {...props} searchTerm={searchTerm} />}
          />
          <Route path="/movie/:id" component={MoviePage} />
import Search from './components/Movie/MovieSearch'
          <Route path="/search" component={MovieSearch} />
          <Route path='/watchList' component={WatchList} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={Register} />
          <PrivateRoute
            path="/admin"
            component={AdminPage}
            searchTerm={searchTerm}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App

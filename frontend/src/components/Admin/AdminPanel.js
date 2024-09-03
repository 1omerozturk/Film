import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { deleteMovieById, fetchMovies } from '../../Api/api'
import MovieForm from '../Movie/MovieForm'
import BgImage from '../../images/bg.jpeg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import showToast from '../Alert/ShowToast'

const AdminPanel = ({ searchTerm }) => {
  const [movies, setMovies] = useState([])
  const [editingMovie, setEditingMovie] = useState(null)
  const [error, setError] = useState(null)
  const [confirmed, setConfirmed] = useState(null)
  const [filteredMovies, setFilteredMovies] = useState([])

  useEffect(() => {
    const loadMovies = async () => {
      const response = await fetchMovies()
      setMovies(response.data)
    }
    loadMovies()
  }, [])

  useEffect(() => {
    if (searchTerm !== '') {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredMovies(filtered)
    } else {
      setFilteredMovies(movies)
    }
  }, [searchTerm, movies])

  const handleEditClick = (movie) => {
    setEditingMovie(movie)
  }

  const handleDeleteClick = async (movie) => {
    const confirmDelete = () =>
      new Promise((resolve) => {
        const ConfirmComponent = () => (
          <div>
            <div className="text-xl text-black">
              Are you sure you want to delete the movie{' '}
              <span className="text-rose-700">"{movie.title}"?</span>
            </div>
            <div className="text-center mt-2">
              <button
                onClick={() => {
                  resolve(true)
                  setConfirmed(true)
                  toast.dismiss()
                }}
                style={{
                  marginRight: '50%',
                  backgroundColor: 'skyblue',
                  color: 'white',
                  padding: '3px',
                  borderRadius: '30%',
                  border: '2px solid black',
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  resolve(false)
                  setConfirmed(false)
                  toast.dismiss()
                }}
                style={{
                  backgroundColor: 'red',
                  color: 'white',
                  padding: '3px',
                  borderRadius: '30%',
                  border: '2px solid black',
                }}
              >
                No
              </button>
            </div>
          </div>
        )

        toast.info(<ConfirmComponent />, {
          position: 'top-center',
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          pauseOnHover: true,
          closeButton: true,
        })
      })

    const userConfirmed = await confirmDelete()

    if (!userConfirmed) {
      return // Eğer kullanıcı "Hayır" derse, işlem iptal edilir
    }

    try {
      await deleteMovieById(movie._id)
      toast.success('Movie deleted successfully.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      // Film listesini yeniden yükle
      const response = await fetchMovies()
      setMovies(response.data)
    } catch (err) {
      toast.error('Failed to delete movie.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleFormSubmit = () => {
    // Yeniden film listesini yükle
    const loadMovies = async () => {
      const response = await fetchMovies()
      setMovies(response.data)
    }
    loadMovies()
  }
  return (
    <div
      style={{ backgroundImage: `url(${BgImage})` }}
      className="grid grid-cols-6"
    >
      <MovieForm movie={editingMovie} onFormSubmit={handleFormSubmit} />

      <div className="w-auto col-span-5">
        <h1 className="text-center text-white font-extrabold font-mono">
          Filmlerim
        </h1>
        <ul className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {filteredMovies
            ? filteredMovies.map((movie) => (
                <li
                  className="rounded-2xl text-center mb-0 pb-0   bg-gradient-to-b to-slate-300 text-white px-2 my-0 h-full via-sky-400 from-black"
                  key={movie._id}
                >
                  <Link
                    style={{ textDecoration: 'none' }}
                    to={`/movie/${movie._id}`}
                  >
                    <div className="h-[80px] my-3 font-extrabold font-mono text-xl">
                      {movie.title}
                    </div>
                    <img
                      className="w-full aspect-[3/4] select-none mx-auto mb-4 rounded-xl hover:shadow-xl hover:shadow-blue-900 object-cover hover:transition hover:duration-700 hover:ease-linear"
                      src={movie.poster_url}
                      alt={movie.title}
                    />
                  </Link>
                  <div className="btn-group gap-2 my-auto mb-4">
                    <button
                      className="text-lg w-fit mx-auto bg-lime-600 px-2 rounded-full transition duration-0 hover:transition hover:duration-1000 hover:ease-in-out hover:text-lime-500 hover:bg-white"
                      onClick={() => handleEditClick(movie)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(movie)}
                      className="w-fit text-lg mx-auto bg-rose-600 px-2 rounded-full transition duration-0  hover:text-rose-500 hover:transition hover:duration-1000 hover:ease-in-out hover:bg-white"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            : ''}
        </ul>
      </div>
    </div>
  )
}

export default AdminPanel

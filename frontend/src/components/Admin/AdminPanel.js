import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { deleteMovieById, fetchMovies } from '../../Api/api'
import MovieForm from '../Movie/MovieForm'
import BgImage from '../../images/bg.jpeg'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Loading from '../Loading/Loading'

const AdminPanel = ({ searchTerm, filterDate, filter, sortBy }) => {
  const [movies, setMovies] = useState([])
  const [editingMovie, setEditingMovie] = useState(null)
  const [error, setError] = useState(null)
  const [confirmed, setConfirmed] = useState(null)
  const [filteredMovies, setFilteredMovies] = useState([])
  const [onView,setOnView]=useState(false)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadMovies = async () => {
      const response = await fetchMovies()
      setMovies(response.data)
    }
    loadMovies()
  }, [])


  const handleView=()=>{
    setOnView(!onView)
  }

  useEffect(() => {
    if (searchTerm !== '') {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredMovies(filtered)
    } else if (filter !== '' && filter !== 'Tür' && filterDate !== '') {
      const filtered = movies.filter(
        (movie) =>
          movie.genre.some((e) =>
            e?.toLowerCase().includes(filter?.toLowerCase()),
          ) && movie.release_date === filterDate,
      )
      setFilteredMovies(filtered)
    } else if (filter !== '' && filter !== 'Tür') {
      const filtered = movies.filter((movie) =>
        movie.genre.some((e) =>
          e?.toLowerCase().includes(filter?.toLowerCase()),
        ),
      )
      setFilteredMovies(filtered)
    } else if (filterDate !== '') {
      const filtered = movies.filter(
        (movie) => movie.release_date.toString() === filterDate.toString(),
      )
      setFilteredMovies(filtered)
    } else if (sortBy !== '') {
      let sortedMovies = [...movies]
      switch (sortBy) {
        case 'popularityAsc':
          sortedMovies.sort((a, b) => a.rating - b.rating)
          break
        case 'popularityDesc':
          sortedMovies.sort((a, b) => b.rating - a.rating)
          break
        case 'nameAsc':
          sortedMovies.sort((a, b) => a.title.localeCompare(b.title))
          break

        case 'nameDesc':
          sortedMovies.sort((a, b) => b.title.localeCompare(a.title))
          break
        case 'dateAsc':
          sortedMovies.sort((a, b) => a.release_date - b.release_date)
          break
        case 'dateDesc':
          sortedMovies.sort((a, b) => b.release_date - a.release_date)
          break
        default:
          break
      }
      setFilteredMovies(sortedMovies)
    } else {
      setFilteredMovies(movies)
    }
    // if (localStorage.getItem('token')) {
    //   const userName = localStorage.getItem('user')
    //   if (userName) {
    //     const user = JSON.parse(userName.username)
    //     console.log(user)
    //     setUser(user)
    //   }
    // }
  }, [searchTerm, movies, filter, sortBy, filterDate])

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
  if (loading && filteredMovies && filteredMovies.length >0)
    return (
      <div
        style={{ backgroundImage: `url(${BgImage})` }}
        className="md:grid-cols-3 min-h-screen"
      >
        <div className="flex items-center justify-center pt-5">
        <button onClick={handleView}  className={`${onView?'btn btn-outline-light':'btn btn-outline-danger'}`}>
        {onView===true?'Film Ekle':'Kapat'}
        </button>
        </div>
        <MovieForm movie={editingMovie} onView={onView} onFormSubmit={handleFormSubmit} />

        <div className="w-auto lg:col-span-full md:col-span-2 mt-3">
          <h1 className="text-center text-white font-extrabold font-mono">
            Filmlerim
          </h1>
          <ul className="grid md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {filteredMovies.map((movie) => (
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
            ))}
          </ul>
        </div>
      </div>
    )
    else if(filteredMovies.length===0 && movies.length>0){
      return <div className="flex justify-center items-center h-screen">No Movies Found</div>
    }
  else return <Loading />
}

export default AdminPanel

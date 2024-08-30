import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchMovies } from '../../Api/api'

const MovieList = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const loadMovies = async () => {
      const response = await fetchMovies()
      setMovies(response.data)
    }
    loadMovies()
  }, [])

  return (
    <div className="movie-list grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-5">
      {movies.map((movie) => (
        <div key={movie._id} className="movie-item hover:drop-shadow-xl hover:shadow-black">
          <Link to={`/movie/${movie._id}`}>
            <img className='h-[500px] rounded-lg shadow-sm shadow-blue-800 w-full' src={movie.poster_url} alt={movie.title} />
            <h3 className='mt-1 rounded-2xl p-2 text-center bg-gradient-to-l to-blue-400 from-slate-900 text-white '>{movie.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  )
}
export default MovieList;
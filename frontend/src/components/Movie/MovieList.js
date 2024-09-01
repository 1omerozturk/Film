import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchMovies, getGenreByCode } from '../../Api/api'
import { CiCalendarDate, CiStar } from 'react-icons/ci'
const MovieList = ({ searchTerm }) => {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [genreNames, setGenreNames] = useState([])

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

  return (
    <div className="movie-list grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-5">
      {filteredMovies
        ? filteredMovies.map((movie) => (
            <div
              key={movie._id}
              className="movie-item hover:drop-shadow-xl hover:shadow-black relative"
            >
              <div
                title={movie.release_date}
                className="grid absolute bg-slate-400 bg-opacity-60 text-center items-end p-1 rounded-full right-0 w-fit"
              >
                <CiCalendarDate
                  className="text-white rounded-full items-center"
                  size={30}
                />
                <b className="text-white">{movie.release_date}</b>
              </div>
              {movie.rating ? '' : (movie.rating = 5)}
              {movie.rating ? (
                <div
                  title={movie.rating?.toFixed(1)}
                  className="grid absolute text-center items-end rounded-full bg-black  p-1 w-fit"
                >
                  <CiStar
                    className="bg-amber-500 rounded-full text-white"
                    size={30}
                  />
                  <b className="text-amber-500">{movie?.rating?.toFixed(1)}</b>
                </div>
              ) : (
                ''
              )}
              <Link to={`/movie/${movie._id}`}>
                <img
                  className="h-[500px] rounded-lg shadow-sm shadow-blue-800 w-full"
                  src={movie.poster_url}
                  alt={movie.title}
                />

                {/* 
        Türleri sıralama ve yazdırmak
*/}

                <div className="text-center">
                  <div
                    title={movie.genre}
                    className="text-center p-1 rounded-full  w-full mx-auto font-bold"
                  >
                    <input
                      type="text"
                      placeholder="Tür"
                      value={movie.genre.join(', ')}
                      readOnly
                      className="w-full text-center px-4 py-2 border font-semibold border-gray-300 rounded-md  bg-gradient-to-r from-slate-700 to-black "
                    />
                  </div>
                </div>

                <div className="mt-1 text-xl rounded-2xl p-2  text-center bg-gradient-to-l to-blue-400 from-slate-900 text-white ">
                  {movie.title}
                </div>
              </Link>
            </div>
          ))
        : movies.map((movie) => (
            <div
              key={movie._id}
              className="movie-item hover:drop-shadow-xl hover:shadow-black"
            >
              <Link to={`/movie/${movie._id}`}>
                <img
                  className="h-[500px] rounded-lg shadow-sm shadow-blue-800 w-full"
                  src={movie.poster_url}
                  alt={movie.title}
                />
                <h3 className="mt-1 rounded-2xl p-2 text-center bg-gradient-to-l to-blue-400 from-slate-900 text-white ">
                  {movie.title}
                </h3>
              </Link>
            </div>
          ))}
    </div>
  )
}
export default MovieList

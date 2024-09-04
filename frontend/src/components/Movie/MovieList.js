import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Bg from '../../images/bg.jpeg'
import { fetchMovies} from '../../Api/api'
import { CiCalendarDate, CiStar } from 'react-icons/ci'
const MovieList = ({ searchTerm, filter, filterDate, sortBy }) => {
  const [movies, setMovies] = useState([])
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
        (movie) => movie.release_date === filterDate,
      )
      setFilteredMovies(filtered)
    }
    else if (sortBy !== '') {
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
  }, [searchTerm, movies, filter, sortBy, filterDate])

  return (
    <div
      style={{ background: { Bg } }}
      className="mx-5 movie-list grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-16"
    >
      {filteredMovies
        ? filteredMovies.map((movie) => (
          
            <div
              title={movie.title.length}
              key={movie._id}
              className="movie-item hover:shadow-lg hover:transition-shadow delay-200 hover:shadow-black relative"
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
              <Link
                style={{ textDecoration: 'none' }}
                to={`/movie/${movie._id}`}
              >
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
              <Link
                style={{ textDecoration: 'none' }}
                to={`/movie/${movie._id}`}
              >
                <img
                  className="h-[500px] rounded-lg shadow-sm shadow-blue-800 w-full"
                  src={movie.poster_url}
                  alt={movie.title}
                />
                <h3 className="mt-1 rounded-2xl p-2 text-center bg-gradient-to-l to-blue-400 from-slate-900 text-white ">
                {(movie.title).length > 20 ? `${(movie.title).substring(0, 20)}...` : movie.title}
                  
                </h3>
              </Link>
            </div>
          ))}
    </div>
  )
}
export default MovieList

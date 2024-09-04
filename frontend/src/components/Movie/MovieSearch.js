import React, { useState } from 'react'
import axios from 'axios'

const MovieSearch = () => {
  const [title, setTitle] = useState('')
  const [movies, setMovies] = useState([])
  const api="http://localhost:5000/api";
  const searchMovies = async () => {
    try {
      const token=localStorage.getItem('token')
      const response = await axios.post(`${api}/search/search-movie`, { title },{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      })
      setMovies(response.data)
    } catch (error) {
      console.log(error, 'Film Arama hatası')
    }
  }

  const saveMovie = async (movie) => {
    try {
      const token=localStorage.getItem('token')
        await axios.post(`${api}/search/save-movie`, movie,{
          headers:{
            Authorization:`Bearer ${token}`,
          },
        });
        alert('Movie saved successfully!');
        window.location.href = '/'; // Ana sayfaya yönlendirme
    } catch (error) {
        console.error('Error saving movie:', error);
        alert('An error occurred while saving the movie');
    }
};

  return (
    <div className='text-center bg-gradient-to-b from-gray-400 to-lime-400'>
      <h1>Movie Search</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Search for a movie..."
      />
      <button className='btn btn-outline-dark mx-2 my-3' onClick={searchMovies}>Search</button>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <img
            className='mx-auto'
            height={300}
            width={300}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
            <button className='btn btn-info' onClick={() => saveMovie(movie)}>Download</button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default MovieSearch

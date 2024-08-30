import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReviewForm from '../Reviews/ReviewForm'
import ReviewList from '../Reviews/ReviewList'

import BgImage from '../../images/bg.jpeg'
import { fetchMovieById, getMovieReviews } from '../../Api/api'

const MovieDetail = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [reviewsUpdated, setReviewsUpdated] = useState(false);
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
          const response = await fetchMovieById(id)
          setMovie(response.data)
        const reviewsData = await getMovieReviews(id)
        setReviews(reviewsData);
        
      } catch (err) {
        console.error('Yorumları getirme hatası', err)
      }
    }
    fetchReviews()
  }, [id])
  
  useEffect(() => {
    const loadMovie = async () => {
      const response = await fetchMovieById(id)
      setMovie(response.data)
    
    }
    loadMovie()
  }, [id])
  
  const handleReviewAdded = () => {
    setReviewsUpdated(prev => !prev); // Değer ters çevrilir, böylece `useEffect` tetiklenir
  };

  
  if (!movie) return <div>Loading...</div>

  return (
    <div
      className="movie-detail text-center"
    >
      <h2 className="select-none rounded-full mx-auto px-4 py-1 w-fit bg-gradient-to-l from-orange-800 to-black font-extrabold underline text-slate-100">
        {movie.title}
      </h2>
      <img
        className=" select-none w-fit mx-auto my-5 rounded-xl hover:shadow-xl hover:shadow-black h-[600px]"
        src={movie.poster_url}
        alt={movie.title}
      />

      <div className="block bg-gradient-to-b px-3 rounded-xl shadow-lg shadow-white select-none from-slate-500 to-slate-800 w-2/3 mx-auto text-xl text-white">
        <p>{movie.plot}</p>
      </div>
      <p className="w-fit mx-auto text-xl text-white px-3 bg-slate-700 rounded-full p-1">
        <strong className=" text-lime-500">Director:</strong> {movie.director}
      </p>
      <p className="w-fit mx-auto text-xl text-white px-3 bg-slate-700 rounded-full p-1">
        <strong className=" text-orange-500">Genre:</strong>{' '}
        {movie.genre.join(', ')}
      </p>
      <p className="w-fit mx-auto text-xl text-white px-3 bg-slate-700 rounded-full p-1">
        <strong className=" text-teal-500">Release Date:</strong>{' '}
        {movie.release_date}
      </p>
      <ReviewForm movieId={movie._id} onReviewAdded={handleReviewAdded} />
      <ReviewList  movieId={movie._id} onReviewAdded={handleReviewAdded} />
    </div>
  )
}

export default MovieDetail

import React, { lazy, Suspense } from 'react'
import MovieList from '../components/Movie/MovieList'

const Home = ({ searchTerm }) => {
  return (
    <div className="mb-5">
      <MovieList searchTerm={searchTerm} />
    </div>
  )
}

export default Home

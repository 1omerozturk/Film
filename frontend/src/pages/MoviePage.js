import React, { lazy, Suspense } from 'react'
const MovieDetail=lazy(()=>import('../components/Movie/MovieDetail'))

const MoviePage = () => {
  return (
    <div className="movie-page">
      <Suspense fallback={<div>Loading component...</div>}>
      <MovieDetail />
      </Suspense>
    </div>
  )
}

export default MoviePage

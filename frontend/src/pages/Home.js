import React, { lazy, Suspense, useState } from 'react'
import FilterMovie from '../components/FilterMovie/FilterMovie'
const MovieList=lazy(()=>import('../components/Movie/MovieList'))


const Home = ({ searchTerm }) => {
const [filter,setFilter]=useState('');
const [filterDate,setFilterDate]=useState('');

  return (
    <div className="py-1">
       <Suspense fallback={<div>Loading component...</div>}>
       <FilterMovie setFilterDate={setFilterDate} setFilter={setFilter}  />
      <MovieList filter={filter} filterDate={filterDate} searchTerm={searchTerm} />
       </Suspense>
    </div>
  )
}

export default Home

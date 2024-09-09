import React, { useState } from 'react'
import FilterMovie from '../components/FilterMovie/FilterMovie'
import MovieList from '../components/Movie/MovieList';

const Home = ({ searchTerm }) => {
const [filter,setFilter]=useState('');
const [filterDate,setFilterDate]=useState('');
const [sortBy,setSortBy]=useState('')
const [isOpenSlider,setIsOpenSlider]=useState(true)

  return (
    <div className="py-1 h-full min-h-screen">
       
       <FilterMovie setFilterDate={setFilterDate} setIsOpenSlider={setIsOpenSlider} setSortBy={setSortBy} setFilter={setFilter}  />
      <MovieList filter={filter} isOpenSlider={isOpenSlider} sortBy={sortBy} filterDate={filterDate} searchTerm={searchTerm} />
    </div>
  )
}

export default Home

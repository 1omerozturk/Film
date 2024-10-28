import React, { useState } from 'react'
import allGenres from '../Genre'
const FilterMovie = ({ setFilter, setFilterDate, setSortBy,setIsOpenSlider }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenS, setIsOpenS] = useState(false)
  const [isEmpty, setIsEmpty] = useState(true)
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')

  const options = [
    {
      label: 'Ad Azalan',
      value: 'nameDesc',
    },
    {
      label: 'Ad Artan',
      value: 'nameAsc',
    },
    {
      label: 'Pop Azalan',
      value: 'popularityDesc',
    },
    {
      label: 'Pop Artan',
      value: 'popularityAsc',
    },
    {
      label: 'Tarih Azalan',
      value: 'dateDesc',
    },
    {
      label: 'Tarih Artan',
      value: 'dateAsc',
    },
  ]

  const clearInputs = () => {
    setSelectedYear('')
    setSelectedGenre('')
    setFilter('')
    setFilterDate('')
    setSortBy('');
    setIsEmpty(true)
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
    setIsOpenS(!isOpenS)
    setIsOpenSlider(isOpenS)
    if (isOpen) {
      clearInputs()
    }
  }

  const handleInputChange = (event) => {
    setFilter(event.target.value)
    setSelectedGenre(event.target.value)
    if (event.target.value !== '' || event.target.value !== 'Tür Seçiniz') {
      setIsEmpty(false)
    }
  }
  const handleInputDateChange = (event) => {
    setFilterDate(event.target.value)
    setSelectedYear(event.target.value)
    if (event.target.value !== ''|| event.target.value!=='Yıl') {
      setIsEmpty(false)
    }
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    console.log(e.target.value)
    if(e.target.value!==''){
      setIsEmpty(false)
    }
  }


  return (
       <div className={`pt-0 bg-transparent ${!isOpen ? 'animate-pulse' : 'mt-10 mb-80 md:mt-10 md:mb-0'} `}>
  <button
    title="Filtreleme"
    onClick={toggleSidebar}
    className="absolute right-0 top-0 m-1 p-2 mb-5 z-10 hover:bg-gray-500 hover:text-sky-500 bg-blue-500 text-white rounded"
  >
    <i className="pi pi-filter-fill text-white"></i>
  </button>
  <div
    className={`filter-movie w-full mx-auto transform ${
      isOpen ? 'translate-x-0 sm:h-[120px] md:h-[100px] lg:h-[90px]' : 'translate-x-0 collapse'
    } transition-transform duration-300`}
  >
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2 w-full h-fit bg-indigo-500 rounded-lg py-1 absolute top-8 right-2 sm:right-8 lg:right-12">
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #4f46e5;
          border-radius: 9999px;
        }
        @media (max-width: 640px min-height:800px) {
          .filter-movie {
            flex-direction: column;
          }
        }
      `}</style>
      <select
        value={selectedYear}
        onChange={handleInputDateChange}
        className="form-select block w-full text-center font-bold custom-scrollbar bg-indigo-500 border-black rounded-xl px-3 text-black"
      >
        <option className="font-semibold bg-indigo-500" value="">
          Yıl
        </option>
        {Array.from({ length: 2024 - 1950 + 1 }, (_, index) => 2024 - index).map(
          (year) => (
            <option
              className="font-semibold bg-indigo-500"
              key={year}
              value={year}
            >
              {year}
            </option>
          )
        )}
      </select>
      <div className="flex items-center rounded-lg px-2 border border-black w-full">
        <input
          type="range"
          min={1950}
          max={2024}
          value={selectedYear}
          onChange={handleInputDateChange}
          className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer"
        />
        <span className="ml-2 font-semibold">{selectedYear}</span>
      </div>
      <select
        value={selectedGenre}
        className="form-multiselect text-center block w-full mt-1 font-semibold custom-scrollbar border-black rounded-lg px-1 bg-indigo-500 text-black"
        onChange={handleInputChange}
      >
        <option value="">Tür</option>
        {allGenres.map((genreItem) => (
          <option className="bg-indigo-500 font-semibold" key={genreItem} value={genreItem}>
            {genreItem}
          </option>
        ))}
      </select>
      <select
        onChange={handleSortChange}
        name="Sırala"
        defaultValue=""
        className="bg-indigo-500 text-center font-semibold custom-scrollbar border rounded-lg border-black w-full"
      >
        <option className="font-semibold" value="">
          Sırala
        </option>
        {options.map((option, index) => (
          <option className="font-semibold" key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        className={`${
          isEmpty ? 'collapse' : ''
        } border border-white hover:bg-black hover:text-white rounded-full px-2 hover:ring-2`}
        onClick={clearInputs}
      >
        <i title="Temizle" className="pi pi-times p-0.5 text-white"></i>
      </button>
    </div>
  </div>
</div>

  )
}

export default FilterMovie

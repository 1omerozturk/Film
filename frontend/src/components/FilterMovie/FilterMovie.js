import React, { useEffect, useState } from 'react'

const FilterMovie = ({ setFilter, setFilterDate, setSortBy }) => {
  const [isOpen, setIsOpen] = useState(false)
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
    if (event.target.value !== '') {
      setIsEmpty(false)
    }
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
    if(e.target.value!==''){
      setIsEmpty(false)
    }
  }

  const allGenres = [
    'Aksiyon',
    'Drama',
    'Komedi',
    'Korku',
    'Bilim Kurgu',
    'Romantik',
    'Gerilim',
    'Macera',
    'Animasyon',
    'Biyografi',
    'Suç',
    'Belgesel',
    'Aile',
    'Fantastik',
    'Tarih',
    'Müzik',
    'Gizem',
    'Spor',
    'Savaş',
    'Western',
  ]

  return (
    <div className="pt-0">
      <button
        title="Filtreleme"
        onClick={toggleSidebar}
        className="absolute right-0 top-0 m-1 p-2 mb-5 z-10 hover:bg-gray-500 hover:text-sky-500 bg-blue-500 text-white rounded"
      >
        <i className="pi pi-filter-fill text-white"></i>
      </button>
      <div
        className={`filter-movie w-auto   mx-auto transform ${
          isOpen ? 'translate-x-0 h-[50px] ' : 'translate-x-0 collapse'
        } transition-transform duration-300`}
      >
        <div className="grid grid-flow-col rounded-lg p-2 w-fit h-fit bg-indigo-500 gap-3 py-1 absolute top-8 right-12">
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 12px;
            }

            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #4f46e5; /* Indigo-600 rengi */
              border-radius: 9999px;
            }
          `}</style>
          <select
            value={selectedYear}
            onChange={handleInputDateChange}
            className="form-select block text-center w-fit font-bold border custom-scrollbar  bg-indigo-500 border-black rounded-xl px-6 bg-transparent text-black"
          >
            <option value="" disabled hidden>
              Yıl
            </option>
            {Array.from(
              { length: 2024 - 1950 + 1 },
              (_, index) => 2024 - index,
            ).map((year) => (
              <option
                className="font-semibold bg-indigo-500"
                key={year}
                value={year}
              >
                {year}
              </option>
            ))}
          </select>

          <div className="flex items-center rounded-lg px-2 border border-black">
            <input
              type="range"
              min={1950}
              max={2024}
              value={selectedYear}
              onChange={handleInputDateChange}
              className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer"
            />
            <span className="ml-4 font-semibold">{selectedYear}</span>
          </div>

          <select
            value={selectedGenre}
            className="form-multiselect text-center block w-fit mt-1 font-semibold border custom-scrollbar border-black rounded-lg px-1 bg-indigo-500 text-black"
            size={1}
            placeholder="Tür"
            onChange={handleInputChange}
          >
            <option value="" disabled hidden>
              Tür
            </option>
            {allGenres.map((genreItem) => (
              <option
                slot=""
                className="bg-indigo-500 font-semibold"
                key={genreItem}
                value={genreItem}
              >
                {genreItem}
              </option>
            ))}
          </select>
          <select
            onChange={handleSortChange}
            name={'Sırala'}
            defaultValue=""
            className="bg-indigo-500 text-center font-semibold custom-scrollbar border rounded-lg border-black "
          >
            <option className='font-semibold' value="">
              Sırala
            </option>

            {options.map((option, index) => (
              <option className='font-semibold' key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            className={`${
              isEmpty ? 'collapse' : ''
            } border border-black rounded-full px-2 hover:ring-2`}
            onClick={clearInputs}
          >
            <i className="pi pi-delete-left text-white"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterMovie

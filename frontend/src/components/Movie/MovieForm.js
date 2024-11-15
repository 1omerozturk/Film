import React, { useState, useEffect } from 'react';
import { addMovie, updateMovie } from '../../Api/api'
import { CiCircleRemove } from 'react-icons/ci';

const MovieForm = ({ movie, onFormSubmit,onView }) => {

  const allGenres = [
    'Aksiyon', 'Drama', 'Komedi', 'Korku', 'Bilim Kurgu', 'Romantik', 'Gerilim',
    'Macera', 'Animasyon', 'Biyografi', 'Suç', 'Belgesel', 'Aile',
    'Fantastik', 'Tarih', 'Müzik', 'Gizem', 'Spor', 'Savaş', 'Western'
  ];
  
  const [value,setValue]=useState('')

  const [title, setTitle] = useState('');
  const [director, setDirector] = useState('');
  const [genre, setGenre] = useState('');
  const [category, setCategory] = useState('');
  const [plot, setPlot] = useState('');
  const [poster_url, setPosterUrl] = useState('');
  const [video_url,setVideoUrl]=useState('');
  const [release_date, setReleaseDate] = useState('');

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDirector(movie.director);
      setGenre(movie.genre);
      setPlot(movie.plot);
      setCategory(movie.category)
      setPosterUrl(movie.poster_url);
      setVideoUrl(movie.video_url);
      setReleaseDate(movie.release_date);
    }
  }, [movie]);

  const handleGenreClear=()=>{
    setGenre('')
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleGenreChange = (event) => {
    const selectedOption = event.target.value;
  
    // Eğer seçiliyse çıkar, değilse ekle

      if (genre.includes(selectedOption)) {
        // Eğer sadece bir öğe seçiliyse ve bu öğe tekrar seçilirse, bu öğeyi de çıkar
        setGenre(genre.filter((g) => g !== selectedOption));
      } else {
        setGenre([...genre, selectedOption]);
      }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = {
      title,
      director,
      category,
      genre,
      plot,
      poster_url,
      video_url,
      release_date,
    };

    if (movie) {
      await updateMovie(movie._id, movieData);
    } else {
      await addMovie(movieData);
    }
  

    onFormSubmit();
    setTitle('');
    setDirector('');
    setGenre('');
    setCategory('');
    setPlot('');
    setPosterUrl('');
    setVideoUrl('');
    setReleaseDate('');
  };

  return (
    <div className={`${onView?'collapse':''} mt-16 h-fit  bg-gradient-to-t to-sky-300 via-gray-400 from-transparent shadow-md rounded-lg p-6`}>
  <form onSubmit={handleSubmit}>
    <h3 className=" text-4xl  text-center font-semibold mb-4">{movie ? 'Film Güncelle' : 'Film Ekle'}</h3>
    <div className="mb-4">
      <input
        type="text"
        placeholder="İsim"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <input
        type="text"
        placeholder="Yönetmen"
        value={director}
        onChange={(e) => setDirector(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4 rounded-lg">
      <div className='items-center justify-between grid grid-cols-12 '>

    <input
      type="text"
      placeholder='Tür'
      value={genre.length>0?genre.join(', '):""}
      readOnly
      className="w-full px-4 py-2 col-span-11 border font-semibold border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
  <button>
    <CiCircleRemove
    onClick={handleGenreClear}
    size={25}/>
  </button>
      </div>
     <select
    value={genre}
    onChange={(e) => handleGenreChange(e)}
    className="form-multiselect block w-full mt-1 bg-slate-800 text-white"
    size={1}
    >
      <option  value="" disabled hidden>
    Tür
  </option>
    {allGenres.map((genreItem) => (
      <option key={genreItem} value={genreItem}>
        {genreItem}
      </option>
    ))}
  </select>
    </div>
    <h4 className="text-lg font-semibold mb-2">Kategori</h4>
    <div className="flex items-center mb-4">
      <label className="mr-4">
        <input
          type="radio"
          value="Yerli"
          checked={category === 'Yerli'}
          onChange={handleCategoryChange}
          className="form-radio text-blue-600"
        />
        <span className="ml-2">Yerli</span>
      </label>
      <label>
        <input
          type="radio"
          value="Yabancı"
          checked={category === 'Yabancı'}
          onChange={handleCategoryChange}
          className="form-radio text-blue-600"
        />
        <span className="ml-2">Yabancı</span>
      </label>
    </div>
    <div className="mb-4">
      <textarea
        placeholder="Plot"
        value={plot}
        onChange={(e) => setPlot(e.target.value)}
        required
        className="resize-none overflow-auto w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>
    </div>
    <div className="mb-4">
      <input
        type="text"
        placeholder="Poster URL"
        value={poster_url}
        onChange={(e) => setPosterUrl(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
      <input
        type="text"
        placeholder="Video URL"
        value={video_url}
        onChange={(e) => setVideoUrl(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="mb-4">
    <input
  type="number"
  value={release_date}
  onChange={(e) => setReleaseDate(e.target.value)}
  required
  min="1500"
  max="2024"
  placeholder="1500-2024"
  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
    </div>
    <button
      type="submit"
      className="w-full bg-sky-600 text-white py-2 px-4 rounded-none hover:bg-sky-700 transition duration-300"
    >
      {movie ? 'Güncelle' : 'Film Ekle'}
    </button>
  </form>
</div>

  );
};

export default MovieForm;

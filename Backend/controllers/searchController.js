const Movie = require('../models/movie')
const axios = require('axios');
require('dotenv').config();

const apiKey=process.env.API_KEY;
exports.search = async (req, res) => {
  const { title } = req.body
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}&language=tr-TR`,
    )
    const movies = response.data.results
    res.json(movies)
  } catch (error) {
    console.log('Arama hatası', error)
    res.status(500).send('Arama hatası')
  }
}

exports.save = async (req, res) => {
  const movieData = req.body
  try {

    const fetchGenres = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=tr-TR`);
            const genres = response.data.genres;
            return genres; // { id: 28, name: "Aksiyon" } gibi nesnelerden oluşan bir dizi
        } catch (error) {
            console.error('Error fetching genres:', error);
            return [];
        }
    };
    const genres = await fetchGenres();
    const genreMap = genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
    }, {});

    const movie = new Movie({
      title: movieData.title,
      original_title: movieData.original_title,
      category: 'Popular',
      genre: movieData.genre_ids.map(id => genreMap[id]),
      director: '', // Yönetmen API'den almak için ek istek yapılabilir
      release_date: parseInt(movieData.release_date.split('-')[0]),
      duration: movieData.runtime,
      language: movieData.original_language,
      country: movieData.production_countries?.[0]?.name || '',
      plot: movieData.overview,
      poster_url: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
      video_url: '', // Trailer URL'si almak için ek istek yapılabilir
      rating: movieData.vote_average,
      reviews: [],
      cast:[] // Hata veriyor farlı bir ip gerekebilir.
    })
    await movie.save()
    res.send('Movie saved successfully!')
  } catch (error) {
    console.log('Kayıt hatası ', error)

    res.status(500).send('Kayıt hatası')
  }
}

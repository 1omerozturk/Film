const Movie = require('../models/movie');

// Tüm filmleri getir
exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// Tek bir filmi getir
exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ error: 'Film bulunamadı' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// Yeni film ekle
exports.createMovie = async (req, res) => {
    try {
      const newMovie = new Movie(req.body);
      await newMovie.save();
      res.status(201).json(newMovie);
    } catch (err) {
      console.error('Error saving movie:', err); // Hatayı logla
      res.status(500).json({ error: 'Server Error' });
    }
  };

// Bir filmi güncelle
exports.updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!movie) return res.status(404).json({ error: 'Film bulunamadı' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

// Bir filmi sil
exports.deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if (!movie) return res.status(404).json({ error: 'Film bulunamadı' });
        res.json({ message: 'Film silindi' });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

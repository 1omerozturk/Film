const Genre = require('../models/genre');

exports.getGenre = async (req, res) => {
    try {
        const genre = await Genre.findOne({ id: req.params.id });
        if (!genre) {
            return res.status(404).send({ message: 'Tür bulunamadı!' });
        }
        res.json(genre.name);
    } catch (error) {
        res.status(500).json({ error: `Tür getirme hatası: ${error.message}` });
    }
};

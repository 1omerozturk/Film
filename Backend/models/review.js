const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comment: String,
  rating: { type: Number, min: 0, max: 10 },
  review_date: { type: Date, default: Date.now },
})

const Review = mongoose.model('Review', reviewSchema)
module.exports = Review;

const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const {
  createReview,
  getMovieReviews,
  getUser,
  deleteMovieReview,
  updateReview,
} = require('../controllers/reviewController')

router.post('/movies/:movieId/reviews', auth, createReview)
router.get('/movies/:movieId/reviews', getMovieReviews) //yorumlar herkes tarafından görülebilir olması için auth işlemine gerek yoktur.
router.get('/movies/:userId/reviews', getUser)
router.put('/reviews/:reviewId', auth, updateReview)
router.delete('/movies/:movieId/reviews/:reviewId', auth, deleteMovieReview)
module.exports = router

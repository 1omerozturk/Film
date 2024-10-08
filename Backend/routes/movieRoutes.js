const express = require('express')
const auth=require('../middleware/auth')
const isAdmin = require('../middleware/admin')
const {
  createMovie,
  updateMovie,
  getMovies,
  getMovieById,
  deleteMovie,
} = require('../controllers/movieController')

const router = express.Router()

router.get('/', getMovies)
router.get('/:id', getMovieById)
router.delete('/:id',auth,isAdmin,deleteMovie)
router.post('/',auth,isAdmin, createMovie)
router.put('/:id',auth,isAdmin, updateMovie)

module.exports = router

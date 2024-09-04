const express = require('express')
const auth=require('../middleware/auth')
const isAdmin = require('../middleware/admin')
const router = express.Router()
const searchController = require('../controllers/searchController')

router.post('/search-movie', auth, isAdmin, searchController.search)
router.post('/save-movie', auth, isAdmin, searchController.save)
module.exports = router

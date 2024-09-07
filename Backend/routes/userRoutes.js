const express = require('express');
const auth=require('../middleware/auth')
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.register);
router.post('/login', userController.loginUser);
router.post('/add-watch-list',auth,userController.addWatchList);
router.get('/getWatchList',auth,userController.getWatchList);
router.delete('/delete',auth,userController.deleteWatchListById)

module.exports = router;

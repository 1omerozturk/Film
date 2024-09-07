// controllers/userController.js

const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.addWatchList = async (req, res) => {
  const { userId, movieId } = req.body
  try {
    // user watchlist add movie
    const response = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { watchList: movieId } },
      { new: true },
    )
    res.json(response)
  } catch (err) {
    console.log('Listeye ekleme hatası: ', err)
  }
}
exports.getWatchList = async (req, res) => {
  const { userId } = req.query
  try {
    const response = await User.findById(userId).select('watchList')
    res.json(response)
  } catch (error) {
    console.log('getWatchlist hatası: ', error)
  }
}

exports.deleteWatchListById = async (req, res) => {
  const { userId, movieId } = req.query;

  try {
    const response = await User.findById(userId).select('watchList');
    const index = response.watchList.indexOf(movieId);
  
    if (index === -1) {
      // Eğer movieId watchList'te yoksa
      return res.json({ message: 'Bu film zaten yok.' });
    }
  
    // movieId watchList'te varsa sil
    response.watchList.splice(index, 1);
    await response.save();
  
    res.json({ message: 'Film başarıyla silindi.', watchList: response.watchList });
  } catch (error) {
    console.log('deleteWatchListById hatası: ', error);
    res.status(500).json({ error: 'Sunucu hatası.' });
  }
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).send({ error: 'Invalid login credentials' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid login credentials' })
    }

    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' })
  }
}
// Kayıt ol
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    var user = await User.findOne({ email })
    if (user) return res.status(400).json({ error: 'Email zaten kullanılıyor' })

    user = new User({ username, email, password })
    await user.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1m',
    })
    res.status(201).json({ token })
  } catch (err) {
    res.status(500).json({ error: 'Server Error' })
    console.log('kullanıcı kayıt hatası.', err)
  }
}

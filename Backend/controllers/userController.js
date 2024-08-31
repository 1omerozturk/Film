// controllers/userController.js

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid login credentials' });
    }

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(500).send({ error: 'Something went wrong' });
  }
};
// Kayıt ol
exports.register = async (req, res) => {
  try {
      const { username, email, password } = req.body;
      var user = await User.findOne({ email });
      if (user) return res.status(400).json({ error: 'Email zaten kullanılıyor' });

      user = new User({ username, email, password });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1m' });
      res.status(201).json({ token });
  } catch (err) {
      res.status(500).json({ error: 'Server Error' });
      console.log('kullanıcı kayıt hatası.',err)
  }
};
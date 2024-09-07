const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Kullanıcı rolü
  tokens: [{ token: { type: String, required: true } }],
  watchList: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
  },
})

// JWT oluşturma
userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign(
    { _id: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' },
  )
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

// Parola hashleme
userSchema.pre('save', async function (next) {
  const user = this
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

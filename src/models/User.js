const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { TEST_EMAIL } = require('../utils/regexp')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Please provide email field'],
    validate: {
      validator: (v) => TEST_EMAIL.test(v),
      message: () => 'Please provide valid email.',
    },
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Please provide password field'],
    minlength: [
      6,
      'Please provide password with the length as minimum as 6 characters',
    ],
  },
  firstName: {
    type: String,
    trim: true,
    required: [true, 'Please provide firstName field'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Please provide lastName field'],
  },
})

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.createJwt = function () {
  return jwt.sign({ id: this.id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
}

UserSchema.methods.comparePasswords = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

UserSchema.methods.clean = function () {
  const currentUser = this.toObject()
  const sensitive = ['password']
  sensitive.forEach((item) => {
    delete currentUser[item]
  })
  return currentUser
}

module.exports = mongoose.model('User', UserSchema)

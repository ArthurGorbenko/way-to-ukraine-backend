const mongoose = require('mongoose')
const { TEST_EMAIL } = require('../utils/regexp')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
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

module.exports = mongoose.model('User', UserSchema)

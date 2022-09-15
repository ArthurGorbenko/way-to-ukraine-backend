const mongoose = require('mongoose')

const AchivementsSchema = new mongoose.Schema({
  body: {
    type: String,
    required: [true, 'Please provide password field'],
  },
  images: {
    type: String,
  },
  videos: {
    type: String,
  },
  youtube: {
    type: String,
  },
})

module.exports = mongoose.model('User', AchivementsSchema)

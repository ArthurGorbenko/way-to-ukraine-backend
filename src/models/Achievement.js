const mongoose = require('mongoose')

const AchivementSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: [true, 'Please provide password field'],
    },
    images: {
      type: [{ type: String }],
    },
    videos: {
      type: [{ type: String }],
    },
    youtube: {
      type: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Achivement', AchivementSchema)

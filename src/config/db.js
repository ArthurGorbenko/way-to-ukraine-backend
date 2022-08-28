const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
    })

    console.log('MongoDB is Connected...')
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = connectDB

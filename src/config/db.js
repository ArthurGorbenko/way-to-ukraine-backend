const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
    })

    // eslint-disable-next-line no-console
    console.log('MongoDB is Connected...')
  } catch (err) {
    throw new Error(err.message)
  }
}

module.exports = connectDB

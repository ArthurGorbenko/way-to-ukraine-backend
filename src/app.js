const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

// routes
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const mediaRouter = require('./routes/media')

// middlewares
const authorizeMiddleware = require('./middlewares/auth')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()

if (process.env.NODE_ENV !== 'test') {
  connectDB()
  app.use(cors())
}

app.get('/', (req, res) =>
  res.json({
    message:
      'Hello, it is homepage of the backend server for our way-to-ukraine app.',
  })
)

// default middlewares
app.use([express.json(), authorizeMiddleware])

// routes use
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/medias', mediaRouter)

app.use(errorMiddleware)

module.exports = app

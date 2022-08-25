const express = require('express');
const connectDB = require('./config/db');

// routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

app.get('/', (req, res) => res.send('Hello world!'));

// default middlewares
app.use(express.json());

// routes use
app.use('/auth', authRouter);
app.use('/user', userRouter);

module.exports = app;

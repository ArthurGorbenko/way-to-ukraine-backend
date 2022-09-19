const User = require('../models/User')
const asyncWrapper = require('../middlewares/async-wrapper')

const registerUser = asyncWrapper(async (req, res) => {
  if (!req.body.password || req.body.password.length < 6) {
    return res.status(400).json({
      errorMessage: 'Password should be at least 6 characters long',
    })
  }
  const user = await User.create(req.body)
  return res.status(201).send(user)
})

const getMe = asyncWrapper(async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .send({ errorMessage: 'Unauthorized', user: req.user })
  }
  const user = await User.findById(req.user.id)
  if (user) {
    return res.status(200).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    })
  }
  return res.status(400).json({ errorMessage: 'There is no user with such id' })
})

module.exports = { registerUser, getMe }

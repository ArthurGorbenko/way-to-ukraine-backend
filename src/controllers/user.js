const User = require('../models/User')

const registerUser = async (req, res) => {
  try {
    if (!req.body.password || req.body.password.length < 6) {
      return res.status(400).json({
        errorMessage: 'Password should be at least 6 characters long',
      })
    }
    const user = await User.create(req.body)
    if (user) {
      return res.status(201).send(user)
    }
  } catch (error) {
    return res.status(400).send({ errorMessage: error.message })
  }

  return res.status(400).send({ errorMessage: 'Something went wrong' })
}

const getMe = async (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .send({ errorMessage: 'Unauthorized', user: req.user })
  }
  try {
    const user = await User.findById(req.user.id)
    if (user) {
      return res.status(200).json({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      })
    }
    return res
      .status(400)
      .json({ errorMessage: 'There is no user with such id' })
  } catch (error) {
    return res.status(400).json({ errorMessage: error.message })
  }
}

module.exports = { registerUser, getMe }

const User = require('../models/User')
const asyncWrapper = require('../middlewares/async-wrapper')

const login = asyncWrapper(async (req, res) => {
  if (!req.body.password || !req.body.email) {
    return res
      .status(400)
      .json({ errorMessage: 'Password and email are required' })
  }

  const user = await User.findOne({ email: req.body.email })

  if (!user) {
    return res.status(400).json({ errorMessage: 'User not found' })
  }

  if (!user.comparePasswords(req.body.password)) {
    return res.status(400).json({ errorMessage: 'Wrong password' })
  }

  const token = user.createJwt()
  return res.status(201).json({ token, user })
})

module.exports = { login }

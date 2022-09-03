const express = require('express')

const router = express.Router()
const { registerUser, getMe } = require('../controllers/user')

router.post('/register', registerUser)

router.get('/me', getMe)

module.exports = router

const express = require('express')

const router = express.Router()

const { login } = require('../controllers/auth')

router.post('/login', login)

router.get('/logout', (req, res) => {
  res.send('Me')
})

router.get('/forgot-password', (req, res) => {
  res.send('forgot-password')
})

module.exports = router

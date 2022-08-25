const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
  res.send('Login');
});

router.get('/logout', (req, res) => {
  res.send('Me');
});

router.get('/forgot-password', (req, res) => {
  res.send('forgot-password');
});

module.exports = router;

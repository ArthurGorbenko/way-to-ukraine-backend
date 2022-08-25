const express = require('express');

const router = express.Router();
const { registerUser } = require('../controllers/user');

router.post('/register', registerUser);

router.get('/me', (req, res) => {
  res.send('Me');
});

module.exports = router;

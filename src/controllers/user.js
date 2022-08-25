const User = require('../models/User');

const registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ errorMessage: error.message });
  }
};

module.exports = { registerUser };

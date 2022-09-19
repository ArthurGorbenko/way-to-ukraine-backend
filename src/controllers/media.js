const asyncWrapper = require('../middlewares/async-wrapper')

const postMedia = asyncWrapper(async (req, res) =>
  res.status(201).json({ data: req.files })
)

module.exports = { postMedia }

const postMedia = async (req, res) => res.status(201).json({ data: req.files })

module.exports = { postMedia }

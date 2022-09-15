const express = require('express')
const multer = require('multer')
const storage = require('../config/storage')

const router = express.Router()

const upload = multer({ storage })

const { postMedia } = require('../controllers/media')

router.post('/', upload.array('medias'), postMedia)

module.exports = router

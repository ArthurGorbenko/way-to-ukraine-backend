const multer = require('multer')
const { getExtension } = require('../utils/files')

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.mimetype.includes('image')) {
      return cb(null, './public/medias/images')
    }
    if (file.mimetype.includes('video')) {
      return cb(null, './public/medias/videos')
    }
    cb(null, './public/medias/')
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    cb(
      null,
      `${file.mimetype.split('/')[0]}-${uniqueSuffix}.${getExtension(
        file.originalname
      )}`
    )
  },
})

module.exports = storage

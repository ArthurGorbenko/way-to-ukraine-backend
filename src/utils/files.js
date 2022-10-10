// you can send full url here
function getExtension(filename) {
  return filename.split('.').pop()
}

const fs = require('fs')
const { promisify } = require('util')

const unlinkAsync = promisify(fs.unlink)

function deleteFiles(files) {
  const unlinkPromises = files.map((file) => {
    try {
      return unlinkAsync(file)
    } catch (error) {
      return error
    }
  })
  return Promise.allSettled(unlinkPromises)
}

module.exports = { getExtension, deleteFiles }

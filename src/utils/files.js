// you can send full url here
function getExtension(filename) {
  return filename.split('.').pop()
}

module.exports = getExtension

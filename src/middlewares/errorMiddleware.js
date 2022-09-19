const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }

  let statusCode = 500
  if (err.name === 'ValidationError') {
    statusCode = 400
  }
  return res.status(statusCode).json({ errorMessage: err.message })
}

module.exports = errorMiddleware

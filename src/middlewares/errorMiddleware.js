const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  return res.json({ errorMessage: err.message }).status(500)
}

module.exports = errorMiddleware

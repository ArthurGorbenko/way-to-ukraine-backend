const jwt = require('jsonwebtoken')

const publicRoutes = ['/user/register', '/auth/login', '/auth/forgot-password']

const authorizeMiddleware = async (req, res, next) => {
  if (publicRoutes.includes(req.path)) {
    return next()
  }
  const token = req.headers.authorization

  if (!token || !token.startsWith('Bearer ')) {
    return next()
  }
  try {
    const tokenBody = token.split(' ')[1]
    const decoded = jwt.verify(tokenBody, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = authorizeMiddleware

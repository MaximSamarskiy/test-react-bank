const jwt = require('jsonwebtoken')
require('dotenv').config()

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res
      .status(401)
      .json({ error: 'Authorization header is required' })
  }

  const token = authHeader.split(' ')[1]
  if (!token) {
    return res
      .status(401)
      .json({ error: 'Token is required' })
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        console.error('JWT verification failed:', err)
        return res
          .status(401)
          .json({ error: 'Invalid token' })
      } else {
        console.log('JWT verified successfully:', decoded)
        req.user = decoded
        next()
      }
    },
  )
}

module.exports = requireAuth

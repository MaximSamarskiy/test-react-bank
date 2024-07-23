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

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
    )
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}

module.exports = requireAuth

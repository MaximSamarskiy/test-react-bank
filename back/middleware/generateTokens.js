const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateTokens = (userId) => {
  const accessToken = jwt.sign(
    { _id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '15m' },
  )
  const refreshToken = jwt.sign(
    { _id: userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' },
  )
  return { accessToken, refreshToken }
}

module.exports = generateTokens

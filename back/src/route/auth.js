const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const {
  signinUser,
  signupUser,
  confirmAccount,
  recoveryPage,
  confirmRecovery,
  UpdatePassword,
  getUserBalance,
  getNotifications,
  Setting,
  Send,
  getTransaction,
  receiveFunds,
} = require('../class/user')
const requireAuth = require('../../middleware/requireAuth')

router.get('/balance', requireAuth, getUserBalance)
router.post('/signin', signinUser)
router.post('/signup', signupUser)
router.post('/confirm-account', confirmAccount)
router.post('/recovery', recoveryPage)
router.post('/confirm-recovery', confirmRecovery)
router.post('/update-password', UpdatePassword)
router.get('/notifications', requireAuth, getNotifications)

router.post('/setting', requireAuth, Setting)
router.post('/receive', requireAuth, receiveFunds)
router.post('/send', requireAuth, Send)
router.get(
  '/transaction/:transactionId',
  requireAuth,
  getTransaction,
)

router.post('/refresh-token', (req, res) => {
  const { refreshToken } = req.body
  if (!refreshToken)
    return res
      .status(401)
      .json({ error: 'Token оновлення не надано' })

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
    )
    const newToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' },
    )

    res.json({ accessToken: newToken })
  } catch (error) {
    res
      .status(401)
      .json({ error: 'Недійсний маркер оновлення' })
  }
})

module.exports = router

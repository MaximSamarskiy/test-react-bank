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

  if (!refreshToken) {
    return res
      .status(400)
      .json({ error: 'Refresh token is required' })
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    (err, user) => {
      if (err) {
        return res
          .status(403)
          .json({ error: 'Invalid refresh token' })
      }

      const accessToken = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '15m' },
      )
      res.json({ accessToken })
    },
  )
})

module.exports = router

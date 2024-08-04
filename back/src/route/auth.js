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
  updateEmail1,
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
),
  router.post('/updateEmail', requireAuth, updateEmail1)

module.exports = router

const express = require('express')
const router = express.Router()
const { signinUser, signupUser } = require('../class/user')

router.post('/signin', signinUser)

router.post('/signup', signupUser)

module.exports = router

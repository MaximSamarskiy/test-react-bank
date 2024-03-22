const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../class/user')
const {
  check,
  validationResult,
} = require('express-validator')

router.post(
  '/signup',
  [
    check('email', 'Uncorrect email').isEmail(),
    check(
      'password',
      'Password must be longer than 3 and shorter than 12',
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Uncorrect request',
          errors: errors.array(),
        })
      }

      const { email, password } = req.body

      const candidate = await User.findOne({ email })

      if (!candidate) {
        const hashPassword = await bcrypt.hash(password, 15)

        const user = new User({
          email,
          password: hashPassword,
        })
        await user.save()
        return res.json({ message: 'User was created' })
      } else {
        return res.status(400).json({
          message: `User with email ${email} already exists`,
        })
      }
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ message: 'Server error' })
    }
  },
)

module.exports = router

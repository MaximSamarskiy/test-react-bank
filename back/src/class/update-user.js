const User = require('../models/userModel')
const bcrypt = require('bcrypt')
require('dotenv').config()

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  const { userId } = req.user

  try {
    const user = await User.findById(userId)
    if (
      !user ||
      !bcrypt.compareSync(oldPassword, user.password)
    ) {
      return res
        .status(400)
        .json({ error: 'Incorrect old password' })
    }

    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      return res.status(400).json({ error: passwordError })
    }

    user.password = bcrypt.hashSync(newPassword, 10)
    await user.save()

    res
      .status(200)
      .json({ message: 'Password updated successfully' })
  } catch (error) {
    console.error('Error updating password:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

const updateEmail = async (req, res) => {
  const { email, oldPassword } = req.body
  const { userId } = req.user

  try {
    const user = await User.findById(userId)
    if (
      !user ||
      !bcrypt.compareSync(oldPassword, user.password)
    ) {
      return res
        .status(400)
        .json({ error: 'Incorrect old password' })
    }

    user.email = email
    await user.save()

    res
      .status(200)
      .json({ message: 'Email updated successfully' })
  } catch (error) {
    console.error('Error updating email:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

const logoutUser = async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Error logging out:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = {
  updatePassword,
  updateEmail,
  logoutUser,
}

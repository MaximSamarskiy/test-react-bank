const express = require('express')
const router = express.Router()
const { User } = require('../class/user')

User.create({
  email: 'test@mail.com',
  password: 123,
})

router.get('/signup', function (req, res) {
  return res.render('signup', {
    name: 'signup',
    component: ['field', 'field-password'],
    title: 'Signup page',
  })
})

router.post('/signup', function (req, res) {
  const { email, password } = req.body

  console.log('Received Request Body:', req.body)

  if (!email || !password) {
    return res.status(400).json({
      message: 'Ошибка, такой пользователь уже существует',
    })
  }

  if (!email || !password) {
    return res.status(400).json({
      message: 'Ошибка, некорректные данные пользователя',
    })
  }

  try {
    User.create({ email, password })

    return res.status(200).json({
      message: 'Зарегистрировался',
    })
  } catch (err) {
    console.error('Error during user creation:', err)
    return res.status(400).json({
      message: 'Ошибка создания пользователя',
    })
  }
})

module.exports = router

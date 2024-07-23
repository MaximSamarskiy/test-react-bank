const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      validator.isEmail,
      'невірна адреса електронної пошти',
    ],
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
})

userSchema.statics.signup = async function (
  email,
  password,
) {
  if (!email || !password) {
    throw new Error('Усі поля мають бути заповнені')
  }

  if (!validator.isEmail(email)) {
    throw new Error('Електронна адреса недійсна')
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error('Пароль недостатньо надійний')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw new Error('E-mail вже використовується')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
}

userSchema.statics.signin = async function (
  email,
  password,
) {
  if (!email || !password) {
    throw new Error('Усі поля мають бути заповнені')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw new Error('Невірна електронна адреса')
  }

  const match = await bcrypt.compare(
    password,
    user.password,
  )
  if (!match) {
    throw new Error('Невірний пароль')
  }

  return user
}

userSchema.statics.getByEmail = async function (email) {
  return this.findOne({ email })
}

const User =
  mongoose.models.User || mongoose.model('User', userSchema)

module.exports = User

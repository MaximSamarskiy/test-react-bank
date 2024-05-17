const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.statics.signup = async function (
  email,
  password,
) {
  if (!email || !password) {
    throw Error('Усі поля повинні бути заповненні')
  }
  if (!validator.isEmail(email)) {
    throw Error('такий email вже зареестрований')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('слабкий пароль')
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Користувач с таким email вже існує')
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
    throw Error('Усі поля повинні бути заповненні')
  }

  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Невірний email')
  }

  const match = await bcrypt.compare(
    password,
    user.password,
  )
  if (!match) {
    throw Error('Невірний пароль')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)

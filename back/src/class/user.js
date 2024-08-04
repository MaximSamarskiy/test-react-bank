const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Confirm = require('./confirm')
const bcrypt = require('bcrypt')
const Transaction = require('../models/transaction')
const Notification = require('../models/notification')
const requireAuth = require('../../middleware/requireAuth')

const {
  updatePassword,
  updateEmail,
  logoutUser,
} = require('../class/update-user')

const createToken = (userId, expiresIn = '1h') => {
  return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn,
  })
}

const signinUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.signin(email, password)
    const token = createToken(user._id)
    // const refreshToken = createRefreshToken(user._id)
    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const updateEmail1 = async (req, res) => {
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

const signupUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)
    Confirm.create(email)
    const token = createToken(user._id)
    // const refreshToken = createRefreshToken(user._id)

    res.status(200).json({ email: user.email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const confirmAccount = async (req, res) => {
  const { confirmationCode } = req.body

  try {
    const email = Confirm.getData(confirmationCode)

    if (!email) {
      return res
        .status(404)
        .json({ error: 'Код підтвердження недійсний' })
    }

    const user = await User.findOneAndUpdate(
      { email },
      { $set: { confirm: true } },
      { new: true },
    )

    if (!user) {
      return res
        .status(404)
        .json({ error: 'Користувач не знайдений' })
    }

    res.status(200).json({
      message: 'Обліковий запис успішно підтверджено',
      user,
    })
  } catch (error) {
    console.error(
      'Помилка підтвердження облікового запису:',
      error,
    )
    res
      .status(500)
      .json({ error: 'Внутрішня помилка сервера' })
  }
}

const recoveryPage = async (req, res) => {
  const { email } = req.body

  console.log(
    'Отримано запит на відновлення електронної пошти:',
    email,
  )

  if (!email) {
    console.log('У запиті відсутня електронна адреса')
    return res.status(400).json({
      message: 'Помилка. Обовязкові поля відсутні',
    })
  }

  try {
    const user = await User.findOne({ email })

    if (!user) {
      console.log(
        'Користувача з цією електронною поштою не існує:',
        email,
      )
      return res.status(404).json({
        message:
          'Користувача з цією електронною адресою не існує',
      })
    }

    Confirm.create(email)

    console.log(
      'Код відновлення надіслано на електронну пошту:',
      email,
    )
    return res.status(200).json({
      message: 'Код для відновлення пароля надіслано',
    })
  } catch (err) {
    console.error(
      'Помилка на сторінці відновлення:',
      err.message,
      err.stack,
    )
    return res.status(500).json({
      message: 'Внутрішня помилка сервера',
    })
  }
}

const confirmRecovery = async (req, res) => {
  const { email, code } = req.body

  if (!email || !code) {
    return res.status(400).json({
      message: 'Помилка. Обовязкові поля відсутні',
    })
  }

  try {
    const data = Confirm.getData(code)

    if (data !== email) {
      return res.status(400).json({
        message:
          'Невірний код підтвердження або електронна адреса',
      })
    }

    return res.status(200).json({
      message: 'Код підтвердження успішно підтверджено',
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Внутрішня помилка сервера',
    })
  }
}

const UpdatePassword = async (req, res) => {
  const { code, newPassword } = req.body

  if (!code || !newPassword) {
    return res.status(400).json({
      message:
        'Невірний код підтвердження або новий пароль',
    })
  }

  try {
    const email = Confirm.getData(code)
    console.log('Електронна пошта з коду:', email)

    if (!email) {
      console.log('Невірний код підтвердження')
      return res
        .status(400)
        .json({ message: 'Невірний код підтвердження' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      console.log(
        'Користувача не знайдено для електронної пошти:',
        email,
      )
      return res
        .status(404)
        .json({ message: 'Користувач не знайдений' })
    }

    user.password = bcrypt.hashSync(newPassword, 10)
    await user.save()

    const token = createToken(user._id)
    console.log(
      'Пароль успішно оновлено для користувача:',
      email,
    )

    return res.status(200).json({
      message: 'Пароль успішно оновлено',
      email: user.email,
      token,
    })
  } catch (err) {
    console.error('Помилка серверу:', err)
    return res
      .status(500)
      .json({ message: 'Внутрішня помилка сервера' })
  }
}

const getUserBalance = async (req, res) => {
  try {
    const userBalance = 100
    res.status(200).json({ balance: userBalance })
  } catch (error) {
    console.error(
      'Помилка отримання балансу:',
      error.message,
    )
    res.status(500).json({ error: 'Помилка сервера' })
  }
}

const getNotifications = async (req, res) => {
  try {
    const { userId } = req.user
    const user = await User.findById(userId).select(
      'notifications',
    )

    if (!user) {
      return res
        .status(404)
        .json({ error: 'Користувача не знайдено' })
    }

    res
      .status(200)
      .json({ notifications: user.notifications })
  } catch (error) {
    console.error(
      'Помилка отримання сповіщень:',
      error.message,
    )
    res.status(500).json({ error: 'Помилка сервера' })
  }
}

const Setting = async (req, res) => {
  const { action } = req.body

  try {
    if (action === 'updatePassword') {
      await updatePassword(req, res)
    } else if (action === 'updateEmail') {
      await updateEmail(req, res)
    } else if (action === 'logoutUser') {
      await logoutUser(req, res)
    } else {
      res.status(400).json({ error: 'Invalid action' })
    }
  } catch (error) {
    console.error('Error in Setting endpoint:', error)
    res.status(500).json({ error: 'Server error' })
  }
}

const Send = async (req, res) => {
  const { email, amount } = req.body
  const sender = req.user

  if (!email || !amount) {
    return res.status(400).json({
      error:
        'Необхідно вказати адресу електронної пошти та суму',
    })
  }

  try {
    const recipient = await User.findOne({ email })

    if (!recipient) {
      return res
        .status(404)
        .json({ error: 'Одержувач не знайдено' })
    }

    if (sender.balance < amount) {
      return res
        .status(400)
        .json({ error: 'Недостатній баланс' })
    }

    const senderTransaction = new Transaction({
      user: sender._id,
      type: 'debit',
      amount: -amount,
      description: `Sent to ${recipient.email}`,
    })

    const recipientTransaction = new Transaction({
      user: recipient._id,
      type: 'credit',
      amount: amount,
      description: `Received from ${sender.email}`,
    })

    await senderTransaction.save()
    await recipientTransaction.save()

    sender.balance -= amount
    recipient.balance += amount

    await sender.save()
    await recipient.save()

    const senderNotification = new Notification({
      user: sender._id,
      message: `You sent ${amount} to ${recipient.email}`,
    })

    const recipientNotification = new Notification({
      user: recipient._id,
      message: `You received ${amount} from ${sender.email}`,
    })

    await senderNotification.save()
    await recipientNotification.save()

    res
      .status(200)
      .json({ message: 'Транзакція успішно виконана' })
  } catch (error) {
    console.error('Error processing transaction:', error)
    res.status(500).json({ error: 'Помилка сервера' })
  }
}

const getTransaction = async (req, res) => {
  const { transactionId } = req.params

  try {
    const transaction = await Transaction.findById(
      transactionId,
    )
    if (!transaction) {
      return res
        .status(404)
        .json({ error: 'Транзакція не знайдена' })
    }
    res.status(200).json(transaction)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Внутрішня помилка сервера' })
  }
}
const receiveFunds = async (req, res) => {
  const { amount, paymentMethod } = req.body

  if (!amount || !paymentMethod) {
    return res.status(400).json({
      error: 'Необхідно вказати суму та спосіб оплати',
    })
  }

  try {
    const transaction = new Transaction({
      userId: req.user._id,
      amount,
      paymentMethod,
      type: 'receive',
      date: new Date(),
    })

    await transaction.save()

    const notification = new Notification({
      message: `Ти отримав ${amount} через ${paymentMethod}`,
      date: new Date(),
      userId: req.user._id,
    })

    await notification.save()

    res.status(201).json({
      message: 'Трансакцію та сповіщення створено успішно',
    })
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Внутрішня помилка сервера' })
  }
}

module.exports = {
  requireAuth,
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
}

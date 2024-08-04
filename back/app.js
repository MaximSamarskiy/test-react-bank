const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const http = require('http')
const jwt = require('jsonwebtoken')
const livereload = require('livereload')
const connectLiveReload = require('connect-livereload')

dotenv.config()

const app = express()
const PORT = normalizePort(process.env.PORT || '5000')

app.use(cors())
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE',
  )
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  )
  next()
})

if (process.env.NODE_ENV === 'development') {
  const liveReloadServer = livereload.createServer()
  liveReloadServer.watch(path.join(__dirname, 'public'))
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/')
    }, 100)
  })
  app.use(connectLiveReload())
}

const authRoutes = require('./src/route/auth')
const mainRoutes = require('./src/route/index.js')
app.use('/auth', authRoutes)
app.use('/', mainRoutes)

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) =>
    console.error(
      'Error connecting to MongoDB Atlas:',
      err,
    ),
  )

app.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body
  // Example user verification
  if (
    email === 'user@example.com' &&
    password === 'password123'
  ) {
    // const user = { id: 1, email }
    // const token = jwt.sign(user, process.env.JWT_SECRET, {
    //   expiresIn: '15m',
    // })
    // const refreshToken = jwt.sign(
    //   user,
    //   process.env.JWT_REFRESH_SECRET,
    //   { expiresIn: '7d' },
    // )
    // res.json({ token, refreshToken, user })
  } else {
    res
      .status(401)
      .json({ error: 'Invalid email or password' })
  }
})

app.post('/auth/updateEmail', async (req, res) => {
  const { email, oldPassword } = req.body
  const { userId } = req.user
  const token = req.headers.authorization
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
})

// app.post('/auth/refresh-token', (req, res) => {
//   const { refreshToken } = req.body
//   if (!refreshToken) {
//     return res
//       .status(401)
//       .json({ error: 'No refresh token provided' })
//   }

//   try {
//     const decoded = jwt.verify(
//       refreshToken,
//       process.env.JWT_REFRESH_SECRET,
//     )
//     const newToken = jwt.sign(
//       { id: decoded.id, email: decoded.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '15m' },
//     )

//     res.json({ accessToken: newToken })
//   } catch (error) {
//     res.status(401).json({ error: 'Invalid refresh token' })
//   }
// })

app.use((req, res, next) => {
  next(createError(404))
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error =
    req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500).json(err)
})

const server = http.createServer(app)
server.listen(PORT)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
  const port = parseInt(val, 10)
  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind =
    typeof PORT === 'string'
      ? 'Pipe ' + PORT
      : 'Port ' + PORT
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind =
    typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port
  debug('Listening on ' + bind)
  console.log('Listening on http://localhost:' + addr.port)
}

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const debug = require('debug')(
  'template-express-live-reload:server',
)
const authRoutes = require('./src/route/auth')
const requireAuth = require('./middleware/requireAuth')

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/auth', authRoutes)

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) =>
    console.error('Error connecting to MongoDB:', err),
  )

// Create HTTP server
const server = http.createServer(app)

// Listen on provided port
server.listen(PORT)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  const port = parseInt(val, 10)
  if (isNaN(port)) return val // named pipe
  if (port >= 0) return port // port number
  return false
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') throw error

  const bind =
    typeof PORT === 'string'
      ? 'Pipe ' + PORT
      : 'Port ' + PORT

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.log(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.log(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address()
  const bind =
    typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port
  debug('Listening on ' + bind)
  console.log('Listening on http://localhost:' + addr.port)
}

const { MongoClient } = require('mongodb')
const { connect } = require('mongoose')

let dbConnection

module.exports = {
  connectToDb: (cb) => {
    MongoClient.connect(process.env.MONGO_URI)
      .then((client) => {
        console.log('Connected to MongoDB')
        dbConnection = client.db()
        return cb()
      })
      .catch((err) => {
        console.log('disconect to MongoDB')
        return cb(err)
      })
  },
  getDb: () => dbConnection,
}

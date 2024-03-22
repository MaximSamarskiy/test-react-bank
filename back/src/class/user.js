const { Schema, ObjectId } = require('mongoose')

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  files: [{ type: ObjectId, ref: 'File' }],
})

module.exports = {
  User,
}

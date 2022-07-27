const { Schema, model } = require('mongoose')

const userSchema = Schema({
  email: String,
  password: String
})

module.exports = model('user', userSchema)
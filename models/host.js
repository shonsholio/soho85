const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
  _id: String,
  name: String,
  email: String,
  pass: String,
  celular: Number,
  aptos: String

})

const host = mongoose.model('host', UserScheme)

module.exports = host
const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
  _id: String,
  huesped: String,
  documento: String,
  checkIn: String,
  checkOut: String,
  nacion: String,
  apto: String,
  idHost: String

})

const guest = mongoose.model('guest', UserScheme)

module.exports = guest
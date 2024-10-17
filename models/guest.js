const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
  _id: String,
  huesped: String,
  documento: String,
  pax: Number,
  menor: Number,
  checkIn: String,
  checkOut: String,
  nacion: String,
  vehiculo: String,
  apto: String,
  idHost: String

})

const guest = mongoose.model('guest', UserScheme)

module.exports = guest
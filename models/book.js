import mongoose from "mongoose"

const UserScheme = new mongoose.Schema({
  anfitrion: String,
  apartamento: String,
  checkIn: String,
  checkOut: String,
  huesped: String,
  tipoDoc: String,
  numDoc: String,
  pax: Number,
  pais: String
})

const book = mongoose.model('book', UserScheme)

export default book
const host = require('./models/host')
const mongoose = require('mongoose')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

class UserRepository {
  static create ({ name, email, pass, celular, aptos }) {

    const id = crypto.randomUUID()
    const hashedPass = bcrypt.hashSync(pass, 4)

    host.create({
      _id: id,
      name,
      email,
      pass: hashedPass,
      celular,
      aptos
    })
  }

  static find () {

    host.find({}).sort({ name: -1 })
  }

}



module.exports = UserRepository
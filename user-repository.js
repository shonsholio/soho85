const host = require('./models/host')
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

}

module.exports = UserRepository


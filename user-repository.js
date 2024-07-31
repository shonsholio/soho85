import mongoose from 'mongoose'
// import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { domainToUnicode } from 'url'

const UserScheme = new mongoose.Schema({
  _id:{ type: String, required: true }, 
  nombre:{ type: String, required: true }, 
  celular:{ type: String, required: true },
  apartamento:{ type: String, required: true },
  email:{ type: String, required: true },
  password:{ type: String, required: true }
})

const anfitrion = mongoose.model('anfitrion', UserScheme)
export default anfitrion


export class UserRepository {
  static create ({ nombre, celular, apartamento, email, password }) {
    Validate.email(email)
    Validate.password(password)

    const id = crypto.randomUUID() //CREANDO EL ID

    anfitrion.create({
      _id: id,
      nombre,
      celular,
      apartamento,
      email,
      password
    })

    // console.log(user)

    // if (user) throw new Error('Usuario ya existe')

    // const hashedPassword = password
    // // const hashedPassword = bcrypt.hashSync(password, 4) 

  }

  
  static login ({ email, password }) {
    Validate.email(email)
    // Validate.password(password)

    let user = [];

    anfitrion.find({ email: email })
    .then(resp => {
      var user = resp
    })

    console.log(user)

    const { password: _, ...PublicUser } = user
    return PublicUser

    // if (password !== resp[0].password) throw new Error('Contraseña es inválida');

    // const isValid = bcrypt.compareSync( password, user.password )
    
    // if (!isValid) throw new Error('Contraseña es inválida')
    

  }
}

class Validate  {
  static email (email) {
    if (typeof email !== 'string') throw new Error('Introduzca un email válido')
    if (email.length < 3) throw new Error('Introduzca un email válido')
    if (!email.includes('@')) throw new Error('El email debe contener una @')
    if (!email.includes('.')) throw new Error('El email ingresado no es válido')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('Introduzca una contraseña válida')
    if (password.length < 3) throw new Error('la contraseña debe ser mayor a 6 caracteres')    
  }

}
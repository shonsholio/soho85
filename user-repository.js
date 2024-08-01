import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
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
    const hashedPassword = bcrypt.hashSync(password, 4) 
    console.log(hashedPassword)

    anfitrion.create({
      _id: id,
      nombre,
      celular,
      apartamento,
      email,
      password: hashedPassword
    })


    // if (user) throw new Error('Usuario ya existe')

    // const hashedPassword = password

  }

  static login ({ email, password }) {
    Validate.email(email)

    async function infoUser(email) {
      try{
        const dato = await anfitrion.find({ email: email }).exec()
        const resp = dato[0]
        
        if (resp === undefined) throw new Error('usuario no existe')
          
        const isValid = bcrypt.compareSync( password, resp.password )
        if (!isValid) throw new Error('Contraseña es inválida')

        // if (resp.password !== password) throw new Error('no es la clave rey') // Comprobando que las claves sean iguales

        return resp
      } catch (error) {
        console.error(error)
      }
    } 

    const user = infoUser(email)

    return user

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
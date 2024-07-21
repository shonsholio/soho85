import DBLocal from 'db-local'
// import bcrypt from 'bcrypt'
import crypto from 'crypto'

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id:{ type: String, required: true }, 
  nombre:{ type: String, required: true }, 
  celular:{ type: String, required: true },
  apartamento:{ type: String, required: true },
  email:{ type: String, required: true },
  password:{ type: String, required: true }

})

export class UserRepository {
  static create ({ nombre, celular, apartamento, email, password }) {
    Validate.email(email)
    Validate.password(password)


    const user = User.findOne({ email }) //VERIFICAR SI EL EMAIL YA ESTA EN LA BASE DE DATOS
    if (user) throw new Error('Usuario ya existe')

    const id = crypto.randomUUID() //CREANDO EL ID
    const hashedPassword = password
    // const hashedPassword = bcrypt.hashSync(password, 4) 


    User.create({
      _id: id,
      nombre,
      celular,
      apartamento,
      email,
      password: hashedPassword
    }).save()

    return id
  }

  static login ({ email, password }) {
    Validate.email(email)
    // Validate.password(password)
    
    const user = User.findOne({ email })
    if (!user) throw new Error('No existe el usuario')

    // const isValid = bcrypt.compareSync( password, user.password )

    if (password !== user.password) {
      throw new Error('Contraseña es inválida')
    }

    // if (!isValid) throw new Error('Contraseña es inválida')

    const { password: _, ...PublicUser } = user

    return PublicUser
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
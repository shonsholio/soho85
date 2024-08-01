const controller = {}
import { NewBook, UserRepository } from '../user-repository.js';
import jwt from 'jsonwebtoken'
import { SECRET_JWT_KEY } from '../config.js'

controller.inicio = (req, res) => {
  const { user } = req.session
  res.render('main', user)
}

controller.books = (req, res) => {
  const { user } = req.session
  res.render('books', user)
}

controller.logout = (req, res) => {
 res
    .clearCookie('access_token', 'user')
    .redirect('/')
}

controller.login = async (req, res) => {
  const { email, password } = req.body
  
  try {
    const user = await UserRepository.login({ email, password })

    if (user === undefined) {
      res.send('Algo ha salido mal, vuelva a intentarlo !!!')
    }

    const token = jwt.sign({ id: user._id, email: user.email}, SECRET_JWT_KEY, { expiresIn: '1h' })
    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60})
      .cookie('user', user,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60})
      .redirect('/protected')
  } catch (error) {
    res.status(401).send(error.message)
  }
}

controller.register = (req, res) => {
  res.render('registro')
}

controller.oneRegister = (req, res) => {
  const { nombre, celular, apartamento, email, password } = req.body

  try {
    const id = UserRepository.create({ nombre, celular, apartamento, email, password })
    res.redirect('/')
  } catch (error) {
    res.status(401).send(error.message)
  }
}

controller.protected = (req, res) => {
  const token = req.cookies.access_token
  const usuario = req.cookies.user

  if (!token) return res.status(403).send('Accesibirijilo no autorizado')
  
  try{
    const data = jwt.verify(token, SECRET_JWT_KEY)

    res.render('protected', {
      user: usuario
    })
  } catch (error) {
    res.status(401).send('Accesibirijilo no autorizado')
  }
}

controller.newBook = async (req, res) => {
  const { anfitrion, apartamento, checkIn, checkOut, huesped, tipoDoc, numDoc, pax } = req.body

  try {
    const newBooking = NewBook.create({ anfitrion, apartamento, checkIn, checkOut, huesped, tipoDoc, numDoc, pax })
    res.redirect('/books')
  } catch {}

  console.log()
}

export { controller }
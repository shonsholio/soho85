const UserRepository = require("../user-repository.js")
const GuestRepository = require("../guest-repository.js")

const host = require("../models/host.js")
const guest = require("../models/guest.js")

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const crypto = require('crypto')
const SECRET_JWT_KEY = require('../config.js')

const nodemailer = require('nodemailer')


const controller = {}

controller.inicio = (req, res) => {
  res.render('main')
}

controller.getLogIn = (req, res) => {
  const n = req.query.n

  console.log(n)

  const errHost = {
    "001": "El usuario NO existe en la base de Datos",
    "002": "La Contraseña es incorrecta"
  } 

  const errorMessage = errHost[n]
  console.log(errorMessage)

  res.render('logIn', { errorMessage })
}

// /register-get
controller.getRegister = (req, res) => {

  const respParam = req.query.resp

  const errHost = {
                    "001": "El usuario ya existe en la base de Datos",
                    "002": "Las Contraseñas no coinciden"
                  } 

  const mensajeError = errHost[respParam]
  res.render('register', { mensajeError })

}

// /verRegister-post
controller.postRegister = async(req, res) => {
  const form = req.body

  try {
    const verHost = await host.find({ email: form.email})

    if(verHost.length !== 0){
      res.redirect('/register?resp=001')
    } else if (form.pass !== form.confirmPass){
      res.redirect('/register?resp=002')
    } else {
      res.render('confirmRegisterHost', {
        form
      })
    }
  } catch {
    console.log(error)
  }

}

controller.postRegisterHost = async (req, res) => {
  const { name, email, pass, celular, aptos } = req.body

  try {
    const id = UserRepository.create({ name, email, pass, celular, aptos })
    res.redirect(`/hostEx?n=${name}`)
  } catch (error) {
    res.status(401).send(error.message)
  }

}

// /hostEx-get
controller.getHostEx = async (req, res) => {
  const nombre = req.query.n 
  res.render('hostEx.ejs', { nombre })

}

controller.getAdminHost = async (req, res) => {


  try {
    const data = await host.find()
    res.render('admin', { 
      data })
    } catch {}
    
}

// /logIn-post
controller.postLogIn = async(req, res) => {

  const { email, pass } = req.body
  
  try {
    const hostSaved = await host.find({ email: email })
    let contUser = hostSaved.length
    const user = hostSaved[0]

    if (contUser > 0) {

      bcrypt.compare(pass, user.pass, (err, resp) => {
        if (resp) {
          // AQUI ES DONDE DEBERIA HACERSE EL REGISTRO DE INICIO DE SESION
          const token = jwt.sign({ id: user._id, email: user.email }, SECRET_JWT_KEY, { expiresIn: '1h' })
          res
            .cookie('access_token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              samesite: 'strict',
              maxAge: 1000 * 60 * 60
            })
            .cookie('user', user, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              samesite: 'strict',
              maxAge: 1000 * 60 * 60
            })
            .redirect('/hostSession')
        } else {
          res.redirect('/logIn?n=002')
        }
      })
    } else {
      res.redirect('/logIn?n=001')

    }
  } catch (error) {
    res.status(401).send(error.message)
  }
}

controller.getHostSession = async(req, res) => {
  const token = req.cookies.access_token
  const user = req.cookies.user

  if (!token) return res.status(403).send('Debes iniciar sesión ANTES DEL TRY')

  try {
    GuestRepository.printer()

    const data = jwt.verify(token, SECRET_JWT_KEY)
    const reservas = await guest.find({ idHost: user._id }).sort({ checkIn: -1 })
    res.render('hostSession', {
      reservas,
      user
    })
  } catch (error) {
    res.status(401).send('Debes iniciar sesión previameente')
  }

}

// /newBook-get
controller.getNewBook = (req, res) => {
  const token = req.cookies.access_token
  const user = req.cookies.user

  if (!token) return res.status(403).send('Debes iniciar sesión previameente')

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    if (user.aptos.includes(',') == true){
      console.log('mas de un apto')
    }
  

    res.render('newBook', {
      user
    })
  } catch (error) {
    res.status(401).send('Debes iniciar sesión previameente')
  }

}

controller.postNewBook = async (req, res) => {
  const token = req.cookies.access_token
  const user = req.cookies.user

  if (!token) return res.status(403).send('Debes iniciar sesión previameente')

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)

    const id = crypto.randomUUID()
    const { huesped, documento, checkIn, checkOut, nacion, apto, idHost } = req.body

    const newGuest = await guest.create({ _id: id, huesped, documento, checkIn, checkOut, nacion, apto, idHost })

    async function sendEmail() {
      try {
        let transporter = await nodemailer.createTransport({
          service: 'Gmail',
          auth: {
            user: "luisferarevalou@gmail.com",
            pass: "bcrg giyc vfap rzdg"
          }
        });
    
        let mailOptions = {
          from: '"Luisfere" <luisferarevalou@gmail.com',
          to: 'luisferarevalou@gmail.com',
          subject: 'Test email from Node.js',
          html: `Visitante: ${huesped}<br>Documento: ${documento}<br> Apto: ${apto}<br>Día de llegada: ${checkIn}<br>Día de salida ${checkOut}<br><br>Responsable: ${user.name}<br>Contacto: ${user.celular}`
        };
    
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
      } catch (error) {
        console.error('Error sending email:', error);
        throw error;
      }
    }
    sendEmail();

    res.redirect('/hostSession')
  } catch (error) {
    res.status(401).send(error.message)
  }


}

controller.getLogOut = (req, res) => {

  res
    .clearCookie('access_token', 'user')
    .redirect('/')

}

module.exports = controller

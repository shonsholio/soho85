const UserRepository = require("../user-repository.js")
const host = require("../models/host.js")

const controller = {}

controller.inicio = (req, res) => {
  res.render('main')
}

controller.getLogIn = (req, res) => {
  res.render('logIn')
}

controller.getRegister = (req, res) => {

  if (req.query.id !== undefined) {
    const mensajeError = "Las Contraseñas no coinciden"
    res.render('register', { mensajeError })
  } else {
    const mensajeError = ""
    res.render('register', { mensajeError })
  }

}

controller.postRegister = (req, res) => {
  const form = req.body

  if(form.pass !== form.confirmPass){
    res.redirect('/register?id=contrasenas_no_coinciden', form)
  } else {
    res.render('confirmRegisterHost', {
      form
    })
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

controller.getHostEx = async (req, res) => {
  const nombre = req.query.n 
  console.log('nombre')

  res.render('hostEx.ejs', { nombre })

}

controller.getAdminHost = async (req, res) => {

  try {
    const data = await host.find()
    res.render('admin', { 
      data })
  } catch {}

}

module.exports = controller

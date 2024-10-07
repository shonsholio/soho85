const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
const router = require('./routes/main.js')

const app = express()
const _dirname = process.cwd()
dotenv.config({ path: './config.env'})

mongoose.connect(process.env.MONGODB_URI)
  .then(connection => {
    console.log('TAMOS EN MONGO PAPA')
  })
  .catch('Error conectando a mongo')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(cookieParser())

// MIDDLEWARE TOKEN
// app.use((req, res, next) => {
//   const token = req.cookies.access_token
//   req.session = { user: null}

//   try {
//     const data = jwt.verify(token, SECRET_JWT_KEY)
//     req.session.user = data
//   } catch {}

//   next()
// })

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(_dirname, './views'))

// Routes
app.use('/', router)


app.listen(app.get('port'), () => {
  console.log(`CONECTADOS AL ToPuer`)
})
import express from 'express'
import bodyParser from 'body-parser'; 
import cookieParser from 'cookie-parser';
import { router } from './routes/main.js'
// import { SECRET_JWT_KEY } from './config.js';

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
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

// Routes
app.use('/', router)


app.listen(app.get('port'), () => {
  console.log(`CONECTADOS AL ToPuer ${PORT}`)
})
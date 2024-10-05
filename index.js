import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'; 
import cookieParser from 'cookie-parser';
import path from 'path'
import { router } from './routes/main.js'

const app = express()
const _dirname = process.cwd()
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

// MIDDLEWARE TOKEN
app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null}

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY)
    req.session.user = data
  } catch {}

  next()
})

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(_dirname, './views'))

// Routes
app.use('/', router)


app.listen(app.get('port'), () => {
  console.log(`CONECTADOS AL ToPuer`)
})
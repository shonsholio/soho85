const express = require('express')
const router = express.Router()
const controller = require('../controllers/mainController.js')

const app = express()

router.get('/', controller.inicio)
router.get('/logIn', controller.logIn)
router.get('/register', controller.getRegister)

router.post('/verRegister', controller.postRegister)
router.post('/registerHost', controller.postRegisterHost)


module.exports = router

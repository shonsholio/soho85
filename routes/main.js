const express = require('express')
const router = express.Router()
const controller = require('../controllers/mainController.js')

const app = express()

router.get('/', controller.inicio)
router.get('/logIn', controller.getLogIn)
router.get('/register', controller.getRegister)
router.get('/hostEx', controller.getHostEx)

router.get('/admin/adminHost', controller.getAdminHost)



router.post('/verRegister', controller.postRegister)
router.post('/registerHost', controller.postRegisterHost)


module.exports = router

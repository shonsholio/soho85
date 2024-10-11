const express = require('express')
const router = express.Router()
const controller = require('../controllers/mainController.js')

const app = express()

router.get('/', controller.inicio)
router.get('/logIn', controller.getLogIn)
router.get('/register', controller.getRegister)
router.get('/hostEx', controller.getHostEx)

router.get('/hostSession', controller.getHostSession)
router.get('/newBook', controller.getNewBook)
router.post('/newBook', controller.postNewBook)



router.get('/logOut', controller.getLogOut)

router.get('/admin/adminHost', controller.getAdminHost)
router.get('/admin/adminHost/filter', controller.getAdminHostFilter)

router.get('/lobby', controller.getLobby)

router.post('/logIn', controller.postLogIn)
router.post('/verRegister', controller.postRegister)
router.post('/registerHost', controller.postRegisterHost)


module.exports = router

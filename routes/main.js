import express from "express";
const router = express.Router()
import { controller } from "../controllers/mainController.js";

const app = express()


router.get('/', controller.inicio)

router.post('/login', controller.login)

router.get('/register', controller.register)

router.post('/newUser', controller.oneRegister)

router.get('/protected',controller.protected )

router.get('/logout', controller.logout)


export { router } 
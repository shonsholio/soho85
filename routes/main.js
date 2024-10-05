import express from "express";
const router = express.Router()
import { controller } from "../controllers/mainController.js";

const app = express()


router.get('/', controller.inicio)


export { router } 
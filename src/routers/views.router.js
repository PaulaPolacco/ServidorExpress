import { Router } from "express";
import { viewController } from "../controllers/views.controllers.js";
import ProductManager from '../DAL/dao/ProductManagerFS.js'
import { __dirname } from "../utils.js";

const router = Router()
const productManager = new ProductManager('Json/products.json')

router.get('/', viewController.viewProducts)

router.get('/register', viewController.viewRegister)

router.get('/realtimeproducts', viewController.viewRealtime)
export default router
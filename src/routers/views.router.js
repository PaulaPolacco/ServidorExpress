import { Router } from "express";
import ProductManager from '../ProductManager.js'
import { __dirname } from "../utils.js";

const router = Router()
const productManager = new ProductManager('Json/products.json')

router.get('/', async(req,res)=>{
    const products = await productManager.getProducts()
    console.log(products)
    res.render('home', {products})
})

router.get('/realtimeproducts', (req,res)=>{
    res.render()
})
export default router
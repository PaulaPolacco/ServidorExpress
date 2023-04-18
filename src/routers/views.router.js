import { Router } from "express";
import ProductManager from '../dao/ProductManagerFS.js'
import { __dirname } from "../utils.js";

const router = Router()
const productManager = new ProductManager('Json/products.json')

router.get('/', async(req,res)=>{
    const products = await productManager.getProducts()
    res.render('home', {products})
})

router.get('/realtimeproducts', async (req,res)=>{
    const products = await productManager.getProducts()
    res.render('realTimeProducts', {products})
})
export default router
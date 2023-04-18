import { Router } from "express";
//import CartManager from "../dao/CartManagerFS.js";
import CartManager from "../dao/CartManagerMongo.js"
import { __dirname } from "../utils.js";

const router = Router();
//const cartManager = new CartManager(__dirname+'Json/carts.json')
const cartManager = new CartManager()

router.get('/:cid', async (req,res)=>{
    const {cid} = req.params
    try{
        const productsCart = await cartManager.getProductsCart(cid)
        res.json({productsCart})
    }
    catch (error) {
        console.error(error);
        res.status(404).send(error.message);
      } 
    
})

router.post('/', async (req,res)=>{
    try{
        const newCart = await cartManager.addCart()
        res.json({message: 'Carrito creado correctamente', newCart})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }   
})

router.post('/:cid/product/:pid', async (req,res)=>{
    const {cid, pid} = req.params
    try{
        const cart =  await cartManager.addProductCart(cid, pid)
        res.json({message: 'Producto agregado/actualizado al carrito', cart: cart})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      } 
})

router.put('/', (req,res)=>{

})

router.delete('/', (req,res)=>{

})
export default router;
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

router.delete('/:cid', async (req,res)=>{
    const {cid} = req.params
    try{
        const cart =  await cartManager.deleteAllProductsCart(cid)
        res.json({message: 'Carrito vaciado correctamente', cart: cart})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      } 
})

router.delete('/:cid/product/:pid', async (req,res)=>{
    const {cid, pid} = req.params
    try{
        const cart =  await cartManager.deleteProductCart(cid, pid)
        res.json({message: 'Producto eliminado del carrito', cart: cart})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      } 
})

router.put('/:cid', async (req,res)=>{
    const {cid} = req.params
    const products = req.body // products = {"products":[{"idProd": "643dc10afb61e68f9ce30a7b", "quantity": 1}]}
    try{
        const cart =  await cartManager.updateProductsCart(cid, products)
        res.json({message: 'Productos agregados al carrito', cart: cart})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      } 
})

router.put('/:cid/product/:pid', async (req,res)=>{
    const {cid, pid} = req.params
    const quantity = req.body // {"quantity":2}
    try{
        const cart =  await cartManager.updateProductQuantityCart(cid, pid, quantity)
        res.json({message: 'Producto con su cantidad actualizada en el carrito', cart: cart})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      } 
})


export default router;
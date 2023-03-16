import { Router } from "express";
import CartManager from "../CartManager.js";

const router = Router();
const cartManager = new CartManager('../Json/carts.json')

// router.get('/:cid', async (req,res)=>{
//     const {cid} = req.params
//     const cart = await cartManager.getCart(+cid)
//     return (cart == undefined) ? res.status(404).send("Carrito no existe") : res.json({cart})
// })

router.get('/:cid', async (req,res)=>{
    const {cid} = req.params
    try{
        const productsCart = await cartManager.getProductsCart(+cid)
        res.json({productsCart})
    }
    catch (error) {
        console.error(error);
        res.status(404).send(error.message);
      } 
    
})

router.post('/', async (req,res)=>{
    const obj = req.body
    try{
        const newCart = await cartManager.addCart(obj)
        res.json({message: 'Carrito creado correctamente', cart: newCart})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }   
})

router.post('/:cid/product/:pid', async (req,res)=>{
    const {cid, pid} = req.params
    try{
        const cart =  await cartManager.addProductCart(+cid, +pid)
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
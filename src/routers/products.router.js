import { Router } from "express";
//import ProductManager from '../dao/ProductManagerFS.js'
import ProductManager from "../dao/ProductManagerMongo.js";

const router = Router();                    
//const productManager = new ProductManager('Json/products.json')
const productManager = new ProductManager()

// router.get('/', async (req,res)=>{
// const{limit} = req.query
//     const productos = await productManager.getProducts(+limit)
//     res.json({productos})
//     res.redirect('/views/')
// })

router.get('/', async (req, res) => {
    const{limit=10, page=1, sort='1'} = req.query
    console.log(limit, page, sort)
    const response = await productManager.paginateFun(+limit, +page, sort)
    res.json({response})
})

router.get('/aggregation', async (req, res) => {
    const response = await productManager.aggregationFun()
    res.json({response})
})

router.get('/:pid', async (req,res)=>{
    const {pid} = req.params
    try{
        const producto = await productManager.getProductById(pid) 
        res.json({producto})
    }
    catch (error) {
        console.error(error);
        res.status(404).send(error.message);
      }  
})
    

router.put('/:pid', async (req,res)=>{
    const {pid} = req.params
    const obj = req.body
    try{
        const updateProd = await productManager.updateProduct(pid, obj)
        res.json({message: 'Producto actualizado correctamente', product: {updateProd}})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }
})

router.post('/', async (req,res)=>{
    const obj = req.body
    try{
        const newProduct = await productManager.addProduct(obj)
        res.json({message: 'Producto creado correctamente', product: {newProduct}})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }   
})

router.delete('/:pid', async (req,res)=>{
    const {pid} = req.params
    try{
        const producto = await productManager.deleteProduct(pid) 
        res.json({producto})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }
})


export default router;
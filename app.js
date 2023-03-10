import express from 'express';
import ProductManager from './ProductManager.js'

const app = express()
const productManager = new ProductManager('./products.json')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.listen(8080, ()=>{console.log('Escuchando al puerto 8080')})

app.get('/',(req, res) =>{res.send('Bienvenidos')})

app.get('/products/:pid', async (req,res)=>{
    const {pid} = req.params
    try{
        const producto = await productManager.getProductById(+pid) 
        res.json({producto})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }  
})
    

app.put('/products', async (req,res)=>{
    const obj = req.body
    try{
        const updateProd = await productManager.updateProduct(obj)
        res.json({message: 'Producto actualizado correctamente', product: {updateProd}})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }
})

app.post('/products', async (req,res)=>{
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

app.delete('/products/:pid', async (req,res)=>{
    const {pid} = req.params
    try{
        const producto = await productManager.deleteProduct(+pid) 
        res.json({producto})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }
})

app.get('/products', async (req,res)=>{
    const{limit} = req.query
    const productos = await productManager.getProducts(+limit)
    res.json({productos})
})


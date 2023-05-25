import { productsPaginate, productsAggregate, productById, updateProduct, addProduct, deleteProduct } from "../services/products.service.js"

export const getproductsPaginate = async (req, res) => {
    console.log(req)
    if (req.user?.email){
        const saludo = `Bienvenido ${req.user.email} Rol: ${req.session.isAdmin ? 'Admin' : 'User'}`
        const{limit=10, page=1, sort='1', query={}} = req.query
        const queryObj = Object.keys(query).length === 0 ? query : JSON.parse(query) // toma objetos tipo { "category": "Tv" }
        const response = await productsPaginate(+limit, +page, sort, queryObj)
        res.render('products', {response, saludo})
        return
    }else{
        console.log('Debe iniciar sesion para visualizar productos')
        res.redirect('/api/views')
    }
}

export const getproductsAggregate = async (req, res) => {
    const response = await productsAggregate()
    res.json({response})
} 

export const getproductById = async (req,res)=>{
    const {pid} = req.params
    try{
        const producto = await productById(pid) 
        res.json({producto})
    }
    catch (error) {
        console.error(error);
        res.status(404).send(error.message);
      }  
}

export const updateProductCntrl = async (req,res)=>{
    const {pid} = req.params
    const obj = req.body
    try{
        const updateProd = await updateProduct(pid, obj)
        res.json({message: 'Producto actualizado correctamente', product: {updateProd}})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }
}

export const postProductCtrl = async (req,res)=>{
    const obj = req.body
    try{
        const newProduct = await addProduct(obj)
        res.json({message: 'Producto creado correctamente', product: {newProduct}})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }   
}

export const removeProduct = async (req,res)=>{
    const {pid} = req.params
    try{
        const producto = await deleteProduct(pid) 
        res.json({producto})
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error.message);
      }
}

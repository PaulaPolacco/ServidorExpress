import { productsModel } from "../db/models/products.model.js";

export default class ProductManager {
    getProducts = async (limit=null) =>{
        try {
            const allproducts = await productsModel.find()
            return (limit != null && limit > 0 )? allproducts.slice(0,limit): allproducts
        } catch (error) {
            console.log(error)
        }
      }
    
    addProduct = async (product) =>{
        try {
            const productExists = await productsModel.exists({code: product.code})
            if (!productExists){
                const newProduct = await productsModel.create(product)
                return newProduct
            }else{
                throw new Error("Producto code already exists")
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
      updateProduct = async (idProduct, updatedItems) =>{
        try {
            const updatedProduct = await productsModel.findOneAndUpdate({_id:idProduct}, updatedItems, {new: true})
            return updatedProduct
            
        } catch (error) {
            console.log(error)
        }
      }
    
      deleteProduct = async (idProduct) =>{
        try {
            const deletedProduct = await productsModel.deleteOne({_id: idProduct})
            return deletedProduct
        } catch (error) {
            console.log(error)
        }
      }
    
      getProductById = async (idProduct) =>{
        try {
            const product = await productsModel.find({_id : idProduct})
            return product
        } catch (error) {
            console.log(error)
        }
      }
}
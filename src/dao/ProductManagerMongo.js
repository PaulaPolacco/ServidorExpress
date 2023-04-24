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

      aggregationFun = async () => {
        try {
            const response = await productsModel.aggregate([
                { $match: { stock: { $gt: 9 } } },
                { $group: { _id: '$category', cant_categ: {$count:{}}}},
                { $sort: {sotck:-1}}
               // { $count: 'cantidad'}
            ])
            return response
            
        } catch (error) {
            console.log(error)
        }
      }

      paginateFun = async (limit, page, sort) => {
        try {
            const result = await productsModel.paginate({}, {limit, page, sort})
            console.log(result)
            const info ={
                status:'success',
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `http://localhost:8080/api/products/paginate?limit=${result.limit}&page=${result.prevPage}`: null,
                nextLink: result.hasNextPage ? `http://localhost:8080/api/products/paginate?limit=${result.limit}&page=${result.nextPage}`: null

            }
            return info
            
        } catch (error) {
            const info ={
                status:'error',
                payload: null,
                totalPages: null,
                prevPage: null,
                nextPage: null,
                page: null,
                hasPrevPage: null,
                hasNextPage: null,
                prevLink: null,
                nextLink: null

            }
            console.log(error)
            return info
        }
      }
}
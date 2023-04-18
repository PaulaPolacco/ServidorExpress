import { cartsModel } from "../db/models/carts.model.js";

export default class ProductManager {
    getCarts = async (limit=null) =>{
        try {
            const allcarts = await cartsModel.find()
            return (limit != null && limit > 0 )? allcarts.slice(0,limit): allcarts
        } catch (error) {
            console.log(error)
        }
      }
    
      getCart = async (id)=>{
        try {
            const cart = await cartsModel.findOne({_id : id})
            return cart
        } catch (error) {
            console.log(error)
        }
      }
      addCart = async () =>{
        try {
            const newCart = await cartsModel.create({products:[]})
            return newCart
        } catch (error) {
            console.log(error)
        }
      }
      getProductsCart = async (id)=>{
        const cart = await cartsModel.findOne({_id: id})
        if(cart == undefined)
          throw new Error("Carrito no existe");
        return cart.products
      }
      addProductCart = async (cid, pid) =>{
        let cart = await this.getCart(cid)
        if(cart == undefined)
          throw new Error("Carrito no existe")
        const products = cart.products
        let prod = products.find(p => p.idProd === pid)
        if(prod !== undefined)
        prod.quantity += 1
        else{
        prod = {"idProd": pid, "quantity": 1}
        products.push(prod)
        }
        cart = await cartsModel.findByIdAndUpdate(
            { _id: cid },
            { products: products },
            { new: true }
          ).exec();
        return cart
      }
}
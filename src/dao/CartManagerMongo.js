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
        const cart = await cartsModel.findById({_id: id}).populate('products.idProd')
        if(cart == undefined)
          throw new Error("Carrito no existe");
        return cart.products
      }
      addProductCart = async (cid, pid) =>{
        let cart = await this.getCart(cid)
        if(cart == undefined)
          throw new Error("Carrito no existe")
        const products = cart.products
        let prod = products.find((p) => p.idProd.toString() === pid);
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

      deleteProductCart = async (cid, pid) =>{
        let cart = await this.getCart(cid)
        if(cart == undefined)
          throw new Error("Carrito no existe")
        const products = cart.products
        let prod = products.find((p) => p.idProd.toString() === pid);
        if(prod !== undefined)
          products.remove(prod)
        else{
          throw new Error("producto no existe")
        }
        cart = await cartsModel.findByIdAndUpdate(
            { _id: cid },
            { products: products },
            { new: true }
          ).exec();
        return cart
      }

      deleteAllProductsCart = async (cid) =>{
        let cart = await this.getCart(cid)
        if(cart == undefined)
          throw new Error("Carrito no existe")
        cart = await cartsModel.findByIdAndUpdate(
            { _id: cid },
            { products: [] },
            { new: true }
          ).exec();
        return cart
      }

      updateProductsCart = async (cid, productsToAdd) =>{
        let cart = await this.getCart(cid)
        if(cart == undefined)
          throw new Error("Carrito no existe")
        console.log(cart.products)
        console.log(productsToAdd)
        const products = cart.products.concat(productsToAdd.products)
        cart = await cartsModel.findByIdAndUpdate(
            { _id: cid },
            { products: products },
            { new: true }
          ).exec();
        return cart
      }

      updateProductQuantityCart = async (cid, pid, quantity) =>{
        let cart = await this.getCart(cid)
        if(cart == undefined)
          throw new Error("Carrito no existe")
        const products = cart.products
        let prod = products.find((p) => p.idProd.toString() === pid);
        if(prod !== undefined)
        prod.quantity = quantity.quantity
        else{
          throw new Error("producto no existe")
        }
        cart = await cartsModel.findByIdAndUpdate(
            { _id: cid },
            { products: products },
            { new: true }
          ).exec();
        return cart
      }
}
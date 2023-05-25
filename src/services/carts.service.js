import CartManager from "../DAL/dao/CartManagerMongo.js"
import { __dirname } from "../utils.js";

const cartManager = new CartManager()

class CartsService {

    async getProductsCart (cid) {
        return await cartManager.getProductsCart(cid)
    }
    async addCart () {
        return await cartManager.addCart()
    }
    async addProductCart(id, productId){
        return await cartManager.addProductCart(id, productId);
    }
    async deleteAllProductsCart(cid){
        return await cartManager.deleteAllProductsCart(cid)
    }
    async deleteProductCart(cid, pid){
        return await cartManager.deleteProductCart(cid, pid)
    }
    async updateProductCart(cid, products){
        return await cartManager.updateProductsCart(cid, products)
    }
    async updateProductQuantityCart(cid, pid, quantity){
        return await cartManager.updateProductQuantityCart(cid, pid, quantity)
    }
}

export const cartsService = new CartsService
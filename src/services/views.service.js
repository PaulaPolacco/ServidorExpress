import ProductManager from '../DAL/dao/ProductManagerFS.js'
import { __dirname } from "../utils.js";

const productManager = new ProductManager('Json/products.json')

class ViewsService {
 async GetProducts(){
    const products = await productManager.getProducts()
    return products
 }
}

export const viewService = new ViewsService()
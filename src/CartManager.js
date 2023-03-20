import fs from 'fs'
import { get } from 'https';


export default class CartManager {
  constructor(path) {
    this.path = path;
  }

  getCarts = async (limit=null) =>{
    if(fs.existsSync(this.path)){
      const infoArchivo = await fs.promises.readFile(this.path, 'utf-8')
      return JSON.parse(infoArchivo)
    } else {
      return []
    }
  }

  getCart = async (id)=>{
    const carts = await this.getCarts()
    const cart = carts.find((cart)  => id === cart.id)
    return cart
  }
  addCart = async () =>{
    const carts = await this.getCarts()
    let id = (carts.length !==0) ? carts[carts.length -1].id + 1 : 1
    const newCart = {id, products:[]}
    carts.push(newCart)
    await fs.promises.writeFile(this.path, JSON.stringify(carts))
    return newCart
  }
  getProductsCart = async (id)=>{
    const cart = await this.getCart(id)
    if(cart == undefined)
      throw new Error("Carrito no existe");
    return cart.products
  }
  addProductCart = async (cid, pid) =>{
    const carts = await this.getCarts()
    const products = await this.getProductsCart(cid)
    let prod = products.find(p => p.id === pid)
    if(prod !== undefined)
      prod.quantity += 1
    else{
      prod = {"id": pid, "quantity": 1}
      products.push(prod)
    }
    const cart = carts.find(c => c.id === cid);
    if (cart !== undefined) {
      cart.products = products;
    }
    await fs.promises.writeFile(this.path, JSON.stringify(carts))
    return cart
  }
}


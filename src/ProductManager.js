import fs from 'fs'


export default class ProductManager {
  constructor(path) {
    this.path = path;
  }
  

  getProducts = async (limit=null) =>{
    if(fs.existsSync(this.path)){
      const infoArchivo = await fs.promises.readFile(this.path, 'utf-8')
      const productos = JSON.parse(infoArchivo)
      return (limit != null && limit > 0 )? productos.slice(0,limit): productos
    } else {
      return []
    }
  }

  addProduct = async (product) =>{
    const products = await this.getProducts()
    let id
    if(products.length === 0){
      id = 1
    }else{
      let exist = products.find(({code})  => code === product.code)
      if(exist != undefined)
        throw new Error("Producto ya existe");
      id = products[products.length -1].id + 1
    }
    const newProduct = {id, ...product}
    products.push(newProduct)
    await fs.promises.writeFile(this.path, JSON.stringify(products))
    return {newProduct}
  }

  updateProduct = async (idProduct, updatedItems) =>{
    const products = await this.getProducts()
    let product = products.find(({id})  => id === idProduct)
    if(product == undefined)
      throw new Error("Producto Not Found")
    else{
      const updatedProducts = products.map(product => product.id === idProduct ? {...product, ...updatedItems} : product)
      await fs.promises.writeFile(this.path, JSON.stringify(updatedProducts))
      return {updatedProducts}
    }
  }

  deleteProduct = async (idProduct) =>{
    const products = await this.getProducts()
    let product = products.find(({id})  => id === idProduct)
    if(product == undefined)
      throw new Error("Not Found")
    else{
      let productsUpdated = products.filter(({id}) => id !== idProduct)
      await fs.promises.writeFile(this.path, JSON.stringify(productsUpdated))
      return {productsUpdated}
    }
  }

  getProductById= async (idProduct) =>{
    const products = await this.getProducts()
    let product = products.find(({id})  => id === idProduct)
    if(product == undefined)
      throw new Error("Not Found");
    return product
  }
}

class Product {
  constructor(title , description, price, thumbnail, code , stock) {
    this.title  = title ;
    this.description  = description ;
    this.price   = price  ;
    this.thumbnail   = thumbnail  ;
    this.code   = code  ;
    this.stock   = stock  ;
  }
}

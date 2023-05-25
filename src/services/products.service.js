import ProductManager from "../DAL/dao/ProductManagerMongo.js";

const productManager = new ProductManager()

  export const findAll = async () => {
    try {
      const users = await usersManager.findAll()
      return users
    } catch (error) {
      return error
    }
  }

export const productsPaginate = async (limit, page, sort, queryObj) => {
    const products = await productManager.paginateFun(+limit, +page, sort, queryObj)
    return products
}

export const productsAggregate = async () => {
    const products = await productManager.aggregationFun()
    return products
}

export const productById = async (pid) => {
    const producto = await productManager.getProductById(pid) 
    return producto
}

export const updateProduct = async (pid, obj) => {
    return await productManager.updateProduct(pid, obj)
}

export const addProduct = async (obj) => {
    return await productManager.addProduct(obj)
}

export const deleteProduct = async (pid) => {
    return await productManager.deleteProduct(pid) 
}
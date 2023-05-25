import { cartsService } from "../services/carts.service.js"
class CartsController {

    async ProductsCart(req,res){
        const {cid} = req.params
        try{
            const productsCart = await cartsService.getProductsCart(cid)
            //res.json({productsCart})
    
            res.render('cart', {productsCart});
        }
        catch (error) {
            console.error(error);
            res.status(404).send(error.message);
          }     
    }
    async PostCart(req,res){
        try{
            const newCart = await cartsService.addCart()
            req.session.cartId = newCart.id; // Almacenar el ID del carrito en la sesión
            res.json({message: 'Carrito creado correctamente', newCart})
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error.message);
          }   
    }
    async PostProductCart(req, res) {
        const productId = req.params.pid;
        const cartId = req.session.cartId;
      
        if (!cartId) {
          // Si no hay un carrito asociado a la sesión, crear uno
          try {
            const newCart = await cartsService.addCart();
            req.session.cartId = newCart.id; // Almacenar el ID del carrito en la sesión
            await cartsService.addProductCart(newCart.id, productId); // Agregar el producto al carrito
            res.json({ message: 'Producto agregado al carrito', cart: newCart });
          } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
          }
        } else {
          // Si ya hay un carrito asociado a la sesión, agregar el producto al carrito existente
          try {
            const cart = await cartsService.addProductCart(cartId, productId);
            res.json({ message: 'Producto agregado al carrito', cart });
          } catch (error) {
            console.error(error);
            res.status(500).send(error.message);
          }
        }
      }
    async updateProductCart(req,res){
        const {cid, pid} = req.params
        try{
            const cart =  await cartsService.addProductCart(cid, pid)
            res.json({message: 'Producto agregado/actualizado al carrito', cart: cart})
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        } 
    }
    async deleteProductsCart(req,res){
        const {cid} = req.params
        try{
            const cart =  await cartsService.deleteAllProductsCart(cid)
            res.json({message: 'Carrito vaciado correctamente', cart: cart})
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error.message);
          } 
    }
    async deleteProductCart(req,res){
        const {cid, pid} = req.params
        try{
            const cart =  await cartsService.deleteProductCart(cid, pid)
            res.json({message: 'Producto eliminado del carrito', cart: cart})
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error.message);
        } 
    }
    async PutProducts(req,res){
        const {cid} = req.params
        const products = req.body // products = {"products":[{"idProd": "643dc10afb61e68f9ce30a7b", "quantity": 1}]}
        try{
            const cart =  await cartsService.updateProductsCart(cid, products)
            res.json({message: 'Productos agregados al carrito', cart: cart})
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error.message);
          } 
    }
    async IncrementProductQuantity(req,res){
        const {cid, pid} = req.params
        const quantity = req.body // {"quantity":2}
        try{
            const cart =  await cartsService.updateProductQuantityCart(cid, pid, quantity)
            res.json({message: 'Producto con su cantidad actualizada en el carrito', cart: cart})
        }
        catch (error) {
            console.error(error);
            res.status(500).send(error.message);
          } 
    }
}

export const cartsController = new CartsController
import { Router } from "express";
import { cartsController } from "../controllers/carts.controller.js";

const router = Router();


router.get('/:cid', cartsController.ProductsCart)

router.post('/', cartsController.PostCart)

router.post('/add/:pid', cartsController.PostProductCart);

router.post('/:cid/product/:pid', cartsController.updateProductCart)

router.delete('/:cid', cartsController.deleteProductsCart)

router.delete('/:cid/product/:pid', cartsController.deleteProductCart )

router.put('/:cid', cartsController.PutProducts)

router.put('/:cid/product/:pid', cartsController.IncrementProductQuantity)


export default router;
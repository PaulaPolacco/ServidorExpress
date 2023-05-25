import { Router } from "express";
import { getproductsPaginate, getproductsAggregate, getproductById, updateProductCntrl, postProductCtrl, removeProduct} from "../controllers/products.controller.js"

const router = Router();                    

router.get('/', getproductsPaginate)

router.get('/aggregation', getproductsAggregate)

router.get('/:pid', getproductById)    

router.put('/:pid', updateProductCntrl)

router.post('/', postProductCtrl)

router.delete('/:pid', removeProduct)


export default router;
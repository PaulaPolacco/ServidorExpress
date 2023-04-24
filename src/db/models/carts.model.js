import mongoose from "mongoose";

const cartproductSchema = new mongoose.Schema({
    idProd: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Products',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  });

const cartsSchema = new mongoose.Schema({
    products:{
        type:[cartproductSchema],
        required:true
    }
})
export const cartsModel = mongoose.model('Carts', cartsSchema)

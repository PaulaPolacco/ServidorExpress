import mongoose from "mongoose";

const cartproductSchema = new mongoose.Schema({
    idProd: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  });

const cartsSchema = new mongoose.Schema({
    products:{
        type:[cartproductSchema],
        required:true
    }
})
export const cartsModel = mongoose.model('Carts', cartsSchema)

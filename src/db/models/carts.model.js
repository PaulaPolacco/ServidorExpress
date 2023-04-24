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
    products:[{
      idProd: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
      },
      quantity: {
        type: Number,
        min: 1
      },
      _id: false // desactivar la creación automática del _id
    }]
})
export const cartsModel = mongoose.model('Carts', cartsSchema)

import mongoose from "mongoose";

const ticketsSchema = new mongoose.Schema({
    code:{
        type:String,
        unique:true,
        autogenerate:true,
    },
    purcharse_datetime:{
        type:Date,
    },
    amount:{
        type:Number,
    },
    purcharser:{
        type: mongoose.SchemaType.ObjectId, ref: 'Users'
    }
})

export const ticketsModel = mongoose.Model('Tickets', ticketsSchema)
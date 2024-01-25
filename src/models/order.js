
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        user_id: { 
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        address: {
            type: String,
            require: true,
        },
        phonenumber: {
            type: String,
            require: true,
        },
        note: {
            type: String,
            require: true,
        },
        status: {
            type: Number,
            require: true,
        },
        total:{
            type:String,
            require: true,
        },
        products: [
            {
                product_id:{
                    type: String,
                },
                images:[],
                name:{
                    type: String,
                },
                colorName:{
                    type: String,
                },
                price:{
                    type: Number,
                },
                quantity:{
                    type: Number,
                },
                version:{
                    type: String,
                },
                versionIndex:{
                    type: Number,
                },
                colorIndex:{
                    type: Number,
                },

            }
        ]
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Order", orderSchema);
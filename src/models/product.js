import { string } from "joi";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minLength: 3,
    },
    price: {
      type: Number,
    },
    original_price: {
      type: Number,
    },
    description: {
      type: String,
    },
    images: [ ],
    brand:{
        type: String
    },
    specifications:[
        
    ],
    quantity:{
      type:Number
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    comments: [
      {
          type: mongoose.Types.ObjectId,
          ref: "Comment",
      },
  ],

  },
  { timestamps: true, versionKey: false }
);


productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);

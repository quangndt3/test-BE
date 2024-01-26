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
    desc: {
      type: String,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
        _id: false
      },
    ],
  },
  { timestamps: true, versionKey: false }
);

productSchema.plugin(mongoosePaginate);
export default mongoose.model("Product", productSchema);

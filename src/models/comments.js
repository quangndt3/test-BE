import { string } from "joi";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    userId:{
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true, versionKey: false }
);


commentSchema.plugin(mongoosePaginate);

export default mongoose.model("Comment", commentSchema);
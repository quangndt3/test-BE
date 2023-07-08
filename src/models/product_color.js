
import mongoose from "mongoose";

const productColorSchema = new mongoose.Schema(
    {
        color: {
            type: String,
            require: true,
            minLength: 2,
        },
        colorCode: {
            type: String,
            require: true,
            minLength: 3,
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Product_color", productColorSchema);
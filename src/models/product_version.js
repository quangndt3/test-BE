
import mongoose from "mongoose";

const productVersionSchema = new mongoose.Schema(
    {
        version: {
            type: String,
            require: true,
            minLength: 3,
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("Product_version", productVersionSchema);
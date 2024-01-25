import mongoose from "mongoose";
const couponSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: true,
        },
        couponCode: {
            type: String,
            require: true,
        },
        couponStatus: {
            type: Number,
            require: true,
        },
        couponStart: {
            type: String,
            require: true,
        },
        couponEnd: {
            type: String,
            require: true,
        },
        quantity: {
            type: Number,
            require: true,
        },
        couponValue:{
            type: Number,
            require: true,
        }
    },
    { timestamps: true, versionKey: false }
);
export default mongoose.model("Coupon", couponSchema);
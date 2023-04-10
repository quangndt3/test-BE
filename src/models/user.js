import mongoose from "mongoose";
const user = new mongoose.Schema({
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    images: {
        type:String,
        require: true,
    },
    password:{
        type: String,
    },
    rePassword:{
        type: String,
    },
    role: {
        type: String,
        default: "member",
    },
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Comment",
        },
    ],
})
export default mongoose.model("User", user)
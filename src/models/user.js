import mongoose from "mongoose";
const user = new mongoose.Schema({
    email:{
        type: String,
    },
    password:{
        type: String,
    },
    role: {
        type: String,
        default: "member",
    },
})
export default mongoose.model("User", user)
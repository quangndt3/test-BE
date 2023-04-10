import axios from "axios";
import joi from "joi"
import dotenv from "dotenv"
import Product from "../models/product";
import Comments from "../models/comments";
import User from "../models/user";
const { API_URL } = process.env
const commentSchema = joi.object({
    content: joi.string().required(),
    productId: joi.string(),
    userId: joi.string()
})

export const getAll = async (req, res) => {


    try {
        const comment = await Comments.find().populate("userId").sort({productId:-1})
        if (!comment) {
            return res.status(404).json({
                tinnhan: "K có bình luận nào"
            })
        }
        return res.json({
             comment
        })
    } catch (error) {
        return res.status(404).json({
            tinnhan: error
        })
    }
}
export const getOne = async(req,res) =>{
    try {
        const comment = await Comments.find({_id: req.params.id}).populate("productId") 
        if (!comment) {
            return res.status(404).json({
                tinnhan: "Không có bình luận nào"
            })
        }
        return res.json({
            comment: comment
        })
    } catch (error) {
        return res.status(404).json({
            tinnhan: error
        })
    }
}
export const add = async (req,res)=>{
    try {
        const { error } = commentSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const comment = await Comments.create(req.body);
        if (!comment) {
            return res.json({
                message: "Không thêm bình luận",
            });
        }
        await Product.findByIdAndUpdate(comment.productId, {
            $addToSet: {
                comments: comment._id,
            },
        });
        await Product.findByIdAndUpdate(comment.productId, {
            $addToSet: {
                comments: comment._id,
            },
        });
        await User.findByIdAndUpdate(comment.userId, {
            $addToSet: {
                comments: comment._id,
            },
        });
        return res.json({
            message: "Thêm Bình luận thành công",
            data: comment,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }

}
// export const update = async(req,res)=>{
//     try {
//         console.log("lỗi r");
//         const product = await Product.findByIdAndUpdate(req.params.id,req.body)
//         if(!product){
//             console.log("lỗi r");
//             return res.json({
//                 message: "Không tìm thấy sản phẩm"
//             })
//         }
//         console.log(req.body)
//         return res.json({
//             message: "Sửa sản phẩm thành công",
//         })
//     } catch (error) {
//         return res.status(404).json({
//             message: error
//         })
//     }
// }
export const xoa = async(req,res)=>{
    try {

        const comment = await Comments.findByIdAndDelete(req.params.id,req.body)
        if(!comment){
            return res.json({
                message: "Không tìm thấy bình luận"
            })
        }
        return res.json({
            message: "Xoá bình luận thành công",
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
import axios from "axios";
import joi from "joi"
import dotenv from "dotenv"
import Product from "../models/product";
import category from "../models/category";
import Comment from "../models/comments";
const { API_URL } = process.env
const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.string().required(),
    original_price: joi.string().required(),
    images: joi.array().required(),
    brand: joi.string(),
    specifications: joi.array().required(),
    categoryId: joi.string(),
    description: joi.string(),
    quantity: joi.string().required()
})
export const getAll = async (req, res) => {

    try {
        const product = await Product.find().populate("categoryId").populate("comments").populate("comments.userId")
        if (!product) {
            return res.status(404).json({
                tinnhan: "K có sản phẩm nào"
            })
        }
        return res.json({
             product
        })
    } catch (error) {
        return res.status(404).json({
            tinnhan: error
        })
    }
}
export const getOne = async(req,res) =>{
    try {
        const product = await Product.findById(req.params.id).populate("categoryId")
        if (!product) {
            return res.status(404).json({
                tinnhan: "K có sản phẩm nào"
            })
        }
        const comments = await Comment.find({ productId: req.params.id });
        return res.status(200).json({
            ...product.toObject(),
            comments,
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            tinnhan: error
        })
    }
}
export const add = async (req,res)=>{
  
    try {
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const product = await Product.create(req.body);
        if (!product) {
            console.log("Không thêm sản phẩm");
            return res.json({
           
                message: "Không thêm sản phẩm",
            });
        }
    
        await category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id,
            },
        });
        console.log("đang thên r");
        return res.json({
            message: "Thêm sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }

}
export const update = async(req,res)=>{
    try {
        console.log("lỗi r");
        const product = await Product.findByIdAndUpdate(req.params.id,req.body)
        if(!product){
            console.log("lỗi r");
            return res.json({
                message: "Không tìm thấy sản phẩm"
            })
        }
        console.log(req.body)
        return res.json({
            message: "Sửa sản phẩm thành công",
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
export const xoa = async(req,res)=>{
    try {
        const id = req.params.id;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        // Nếu client gửi lên isHardDelete = true thì xóa sản phẩm vĩnh viễn
        // Ngoài ra xóa luôn id sản phẩm khỏi danh sách products ở category
     
            await Product.findByIdAndDelete(id);
            // Xóa sản phẩm cũ khỏi danh sách products của category cũ
            await category.findByIdAndUpdate(
                product.categoryId,
                { $pull: { products: product._id } }
            );
        

        return res.status(200).json({
            message: "Xóa sản phẩm thành công",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            message: "Xóa sản phẩm thất bại",
            error: error.message,
        });
    }
}
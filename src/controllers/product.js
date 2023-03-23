import axios from "axios";
import joi from "joi"
import dotenv from "dotenv"
import Product from "../models/product";
const { API_URL } = process.env
const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.string().required(),
    description: joi.string()
})
export const getAll = async (req, res) => {
    try {
        const product = await Product.find()
        if (!product) {
            return res.status(404).json({
                tinnhan: "K có sản phẩm nào"
            })
        }
        return res.json({
            product: product
        })
    } catch (error) {
        return res.status(404).json({
            tinnhan: error
        })
    }
}
export const getOne = async(req,res) =>{
    try {
        const product = await Product.find({_id: req.params.id})
        if (!product) {
            return res.status(404).json({
                tinnhan: "K có sản phẩm nào"
            })
        }
        return res.json({
            product: product
        })
    } catch (error) {
        return res.status(404).json({
            tinnhan: error
        })
    }
}
export const add = async (req,res)=>{
    try {
        const  {error} = productSchema.validate(req.body)
        if(error){
         return res.status(404).json({
             tinnhan: error.details[0].message
         })
        }
        const product = await Product.create(req.body)
        if(!product){
            return res.json({
                message: "Không thêm sản phẩm"
            })
        }
        return res.json({
            message: "Thêm sản phẩm thành công",
            data: product
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }

}
export const update = async(req,res)=>{
    try {
       
        const product = await Product.findByIdAndUpdate(req.params.id,req.body)
        if(!product){
            return res.json({
                message: "Không tìm thấy sản phẩm"
            })
        }
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
        const  {error} = productSchema.validate(req.body)
        if(error){
         return res.status(404).json({
             tinnhan: error.details[0].message
         })
        }
        const product = await Product.findByIdAndDelete(req.params.id,req.body)
        if(!product){
            return res.json({
                message: "Không tìm thấy sản phẩm"
            })
        }
        return res.json({
            message: "Xoá sản phẩm thành công",
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
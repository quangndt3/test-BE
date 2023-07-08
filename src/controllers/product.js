import axios from "axios";
import joi from "joi"
import dotenv from "dotenv"
import Product from "../models/product";
import category from "../models/category";
import Comment from "../models/comments";
import comments from "../models/comments";
const { API_URL } = process.env
const productSchema = joi.object({
    name: joi.string().required(),
    original_price: joi.number().required(),
    images: joi.array().required(),
    discount: joi.number(),
    specifications: joi.array().required(),
    attributes: joi.array().required(),
    categoryId: joi.string(),
    description: joi.string(),
})

export const getOne = async(req,res) =>{
    try {
        const product = await Product.findById(req.params.id).populate("categoryId")
        if (!product) {
            return res.status(404).json({
                tinnhan: "K có sản phẩm nào"
            })
        }
        const comments = await Comment.find({ productId: req.params.id }).populate("userId");
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
            const errors = error.details.map((message) => ({ message }));
            return res.status(400).json({ errors });
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
        const product = await Product.findByIdAndUpdate(req.params.id,req.body)
        if(!product){
        
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
            await Product.findByIdAndDelete(id);
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
export const getAll = async (req,res)=>{
try {
    const {skip=0,limit =10} = req.query
    const products = await Product.find().limit(limit).skip(skip)
    const TotalProducts = await Product.find()
    console.log(req.query);
    return res.status(200).json({
        results: products,
        TotalProducts: TotalProducts.length,
    })
} catch (error) {
    return res.status(400).json({
        message: error
    })
}

}
export const getAll_no_per_page = async (req, res) => {
    try {
        const products = await Product.find().populate("comments");
        console.log(products);
        if (products.length === 0) {
            return res.json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json(products);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }   
};
export const getProductByName = async (req,res)=>{
    try {
        const {skip=0,limit =10,name=undefined,order=""} = req.query
        let products
        console.log(name);
       if(order!="") {
         products = await Product.find({name: {$regex: name, $options: 'i'}}).limit(limit).skip(skip).sort({price: order})
       }
       else{
         products = await Product.find({name: {$regex: name, $options: 'i'}}).limit(limit).skip(skip)
       }
        const totalResults = await Product.find({name: {$regex: name, $options: 'i'}})
        console.log(req.query);
        return res.status(200).json({
            results: products,
            TotalProducts: totalResults.length,
        })
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
    
    }
    export const test = async(req,res)=>{
        try {
            console.log(req.query);
            const product = await Product.find({attributes:{$elemMatch:{version: req.query.version}}});
            if(!product){
            
                return res.json({
                    message: "Không tìm thấy sản phẩm"
                })
            }
            console.log(req.body)
            return res.json({
                message: product,
            })
        } catch (error) {
            return res.status(404).json({
                message: error
            })
        }
    }
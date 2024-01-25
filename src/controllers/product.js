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
        const product = (await Product.findById(req.params.id).populate("categoryId").populate("attributes.version_id").populate("attributes.colors.color_id"))
        if (!product) {
            return res.status(404).json({
                tinnhan: "Không có sản phẩm nào"
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
export const subtractionQuantity = async(req,res) =>{
    try {
        const {_id,v_index,c_index,quantity} = req.query
        let product = (await Product.findById(_id))
        let temp = product
        temp.attributes[v_index].colors[c_index].quantity =  temp.attributes[v_index].colors[c_index].quantity - quantity
        console.log(c_index);
        let productUpdate = await Product.findByIdAndUpdate(_id,temp)
        let test = await Product.findById(_id)
        console.log("updated"+test.attributes[v_index].colors[c_index].quantity);
        return res.status(200).json({
            data: ""
        })
    } catch (error) {
        return res.status(404).json({
            tinnhan: error
        })
    }
}
export const restoreQuantity = async(req,res) =>{
    try {
        const {_id,v_index,c_index,quantity} = req.query
        let product = (await Product.findById(_id))
        let temp = product
        temp.attributes[v_index].colors[c_index].quantity += Number(quantity)
        let productUpdate = await Product.findByIdAndUpdate(_id,temp)
        return res.status().json({
            data:productUpdate
        })
    } catch (error) {
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
    const products = await Product.find().populate("categoryId").populate("attributes.version_id").populate("attributes.colors.color_id").limit(limit).skip(skip)
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
         products = await Product.find({name: {$regex: name, $options: 'i'}}).populate("attributes.version_id").populate("attributes.colors.color_id").limit(limit).skip(skip).sort({original_price: order})
       }
       else{
         products = await Product.find({name: {$regex: name, $options: 'i'}}).populate("attributes.version_id").populate("attributes.colors.color_id").limit(limit).skip(skip)
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
    export const ListProduct = async (req,res)=>{
        try {
            const {skip=0,limit =8,categoryId="",order="",min=0} = req.query
            let products
            console.log(req.query);
           if(order!="" && categoryId!= "") {
            console.log("1");
             products = await Product.find({categoryId:categoryId,original_price: {$gte: min}}).populate("attributes.version_id").populate("attributes.colors.color_id").limit(limit).skip(skip).sort({original_price: order})
           }
           else if(order=="" && categoryId == ""){
            console.log("2");
             products = await Product.find({original_price: {$gte: min}}).populate("attributes.version_id").populate("attributes.colors.color_id").limit(limit).skip(skip)
           }
           else if(order==""&& categoryId != ""){
            console.log("3");
            products = await Product.find({categoryId:categoryId,original_price: {$gte: min}}).populate("attributes.version_id").populate("attributes.colors.color_id").limit(limit).skip(skip)
          }
          else if(order!=""&& categoryId == ""){
            console.log("4");
            products = await Product.find({original_price: {$gte: min}}).populate("attributes.version_id").populate("attributes.colors.color_id").limit(limit).skip(skip).sort({original_price: order})
          }
          let totalResults
            if(categoryId!==""){
                 totalResults = await Product.find({categoryId:categoryId,original_price: {$gte: min}})
            }
            else{
                 totalResults = await Product.find({original_price: {$gte: min}})
            }
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
        
        export const getRelatedProduct = async (req,res)=>{
            try {
                const limitrecords=5;

                    function getRandomArbitrary(min, max) {
                    return Math.ceil(Math.random() * (max - min) + min);
                    }
                const countProduct = await  Product.countDocuments({categoryId:req.params.id}).exec()
                
       var skipRecords = getRandomArbitrary(1, countProduct-limitrecords);
                const products = await Product.find({categoryId:req.params.id}).skip(skipRecords).limit(5)
                return res.json({
                    data: products
                })
            } catch (error) {
                return res.status(400).json({
                    messages: error
                })
            }
            
            }

            


import joi from "joi"
import product_color from "../models/product_color"
import Product from "../models/product"

const product_ColorSchema = joi.object({
    color: joi.string().required(),
    colorCode: joi.string().required(),
})
export const getAll = async(req,res)=>{
    try {
        const colors = await product_color.find()
        if (!colors) {
            return res.status(404).json({
                message: "Không có màu  nào"
            })
        }
        
        return res.status(200).json({
            data: colors
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            tinnhan: error
        })
    }
}
export const getOne = async(req,res)=>{
    try {
        const color = await product_color.findById(req.params.id)
        if (!color) {
            return res.status(404).json({
                message: "Không có màu  nào"
            })
        }
        
        return res.status(200).json({
            data: color
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            tinnhan: error
        })
    }
}
export const add = async(req,res)=>{
    try {
        const { error } = product_ColorSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((message) => ({ message }));
            return res.status(400).json({ errors });
        }
        const colors = await product_color.create(req.body)
        if (!colors) {
            return res.status(404).json({
                message: "Không thể thêm màu "
            })
        }
        
        return res.status(200).json({
            message: "Thêm màu thành công",
            data: colors
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error
        })
    }
}
export const updateColor = async(req,res)=>{
    try {
        const { error } = product_ColorSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((message) => ({ message }));
            return res.status(400).json({ errors });
        }
        const colors = await product_color.findByIdAndUpdate(req.params.id,req.body)
        if (!colors) {
            return res.status(404).json({
                message: "Không thể cập nhật thêm màu "
            })
        }
        
        return res.status(200).json({
            message: "Cập nhật màu thành công",
            data: colors
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error
        })
    }
}
export const deleteColor = async (req,res)=>{
    try {
        const array = []
        const products = await  Product.find()

        for(let i = 0;i < products.length;i++){
            for(let j = 0;j < products[i].attributes.length;j++){
                for(let k = 0;k < products[i].attributes[j].colors.length;k++){
                    if(products[i].attributes[j].colors[k].color_id == req.params.id){
                        const deleteProduct = await Product.findByIdAndDelete(products[i]._id)
                        array.push(deleteProduct)
                    }
                }
            }
        }
        const color = await product_color.findByIdAndDelete(req.params.id)
        return res.json({
            messages: array
        })
    } catch (error) {
        return res.status(400).json({
            messages: error
        })
    }
    
    }

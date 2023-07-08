import joi from "joi"
import product_color from "../models/product_color"

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
export const update = async(req,res)=>{
    try {
        const { error } = product_ColorSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((message) => ({ message }));
            return res.status(400).json({ errors });
        }
        const colors = await product_color.create(req.body)
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
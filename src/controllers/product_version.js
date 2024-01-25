import joi from "joi"
import product_version from "../models/product_version"
import product from "../models/product"

const product_VersionSchema = joi.object({
    version: joi.string().required(),
})
export const getAllVerion = async(req,res)=>{
    try {
        const versions = await product_version.find()
        if (!versions) {
            return res.status(404).json({
                message: "Không có phiên bản  nào"
            })
        }
        
        return res.status(200).json({
            data: versions
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            tinnhan: error
        })
    }
}
export const getOneVerion = async(req,res)=>{
    try {
        const versions = await product_version.findById(req.params.id)
        if (!versions) {
            return res.status(404).json({
                message: "Không có phiên bản  nào"
            })
        }
        
        return res.status(200).json({
            data: versions
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error
        })
    }
}
export const addVersion = async(req,res)=>{
    try {
        const { error } = product_VersionSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((message) => ({ message }));
            return res.status(400).json({ errors });
        }
        const versions = await product_version.create(req.body)
        if (!versions) {
            return res.status(404).json({
                message: "Không thể thêm phiên bản "
            })
        }
        
        return res.status(200).json({
            data: versions
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            tinnhan: error
        })
    }
}
export const updateVersion = async(req,res)=>{
    try {
        const { error } = product_VersionSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((message) => ({ message }));
            return res.status(400).json({ errors });
        }
        const colors = await product_version.findByIdAndUpdate(req.params.id,req.body)
        if (!colors) {
            return res.status(404).json({
                message: "Không thể cập nhật phiên bản "
            })
        }
        
        return res.status(200).json({
            message: "Cập nhật phiên bản thành công",
            data: colors
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error
        })
    }
}
export const deleteVersion = async (req,res)=>{
    try {
        const products = await  product.find()

        for(let i = 0;i < products.length;i++){
            for(let j = 0;j < products[i].attributes.length;j++){
                if(products[i].attributes[j].version_id == req.params.id){
                    const deleteProduct = await product.findByIdAndDelete(products[i]._id)
                }
            }
        }
        const version = await product_version.findByIdAndDelete(req.params.id)
        return res.json({
            messages: version
        })
    } catch (error) {
        return res.status(400).json({
            messages: error
        })
    }
    
    }
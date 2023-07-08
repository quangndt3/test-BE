import joi from "joi"
import product_version from "../models/product_version"

const product_VersionSchema = joi.object({
    version: joi.string().required(),
})
export const getAll = async(req,res)=>{
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
export const add = async(req,res)=>{
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
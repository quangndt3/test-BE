import joi from "joi"
export const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    images: joi.array().required(),
    categoryId: joi.string(),
    desc: joi.string(),
})
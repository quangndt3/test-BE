import Joi from "joi";
import Category from "../models/category";
import Product from "../models/product";
const categorySchema = Joi.object({
    name: Joi.string().required()
})
export const getAll = async (req, res) => {
    try {
        const categories = await Category.find().populate("products");
        if (categories.length === 0) {
            return res.json({
                message: "Không có danh mục nào",
            });
        }
        return res.json(categories);
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }   
};
export const get = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        console.log("category", category);
        if (!category) {
            return res.status(404).json({
                message: "Không tìm thấy danh mục",
            });
        }
        const products = await Product.find({ categoryId: req.params.id });
        return res.status(200).json({
            ...category.toObject(),
            products,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server",
        });
    }
};
export const create = async (req, res) => {
    try {
        const { error } = categorySchema.validate(req.body);
        if (error) {
            const errors = error.details.map((message) => ({ message }));
            return res.status(400).json({ errors });
        }
        const category = await Category.create(req.body);
        if (!category) {
            return res.status(400).json({
                message: "Không thể tạo danh mục",
            });
        }
        return res.status(201).json({
            message: "Category created",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
export const remove = async (req, res) => {
    try {
        await Product.deleteMany({categoryId:req.params.id })
        const category = await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Danh mục đã được xóa thành công",
            category,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};

export const update = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!category) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.status(200).json({
            message: "Sản phẩm đã được cập nhật thành công",
            data: category,
        });
    } catch (error) {
        return res.status(500).json({
            message: error,
        });
    }
};
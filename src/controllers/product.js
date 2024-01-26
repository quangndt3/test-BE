

import Product from "../models/product";
import { productSchema } from "../validate/product";

export const getOne = async(req,res) =>{
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                message: "Không có sản phẩm nào"
            })
        }

        return res.status(200).json({
            ...product.toObject(),

        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error
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
                return res.json({
                    message: "Không thêm sản phẩm",
                });
            }
            return res.status(201).json({
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
        return res.json({
            message: "Sửa sản phẩm thành công",
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

export const remove = async(req,res)=>{
    try {
        const id = req.params.id;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm",
            });
        }
            await Product.findByIdAndDelete(id);
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
    const {
        _page = 1,
        _limit = 3,
        _sort = "createdAt",
      } = req.query;
      const options = {
        page: _page,
        limit: _limit,
        
      };
      const query = {};
try {

    const products = await Product.paginate(query, options)
    return res.status(200).json({
        results: products,
    })
} catch (error) {
    return res.status(400).json({
        message: error
    })
}

}


            


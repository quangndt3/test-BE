import coupon from "../models/coupon";
import Coupon from "../models/coupon";

export const getAllCoupon = async(req,res)=>{
    try {
        const coupons = await Coupon.find()
        if (!coupons) {
            return res.status(404).json({
                message: "Không có phiếu giảm giá nào"
            })
        }
        
        return res.status(200).json({
            data: coupons
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            tinnhan: error
        })
    }
}
export const getOneCoupon = async(req,res)=>{
    try {
        const coupons = await coupon.findById(req.params.id)
        if (!coupons) {
            return res.status(404).json({
                message: "Không có phiếu giảm giá nào"
            })
        }
        
        return res.status(200).json({
            data: coupons
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error
        })
    }
}
export const getOneCouponByCode = async(req,res)=>{
    try {
        const coupons = await coupon.find({couponCode:req.params.code})
        if (!coupons) {
            return res.status(404).json({
                message: "Không có phiếu giảm giá nào"
            })
        }
        
        return res.status(200).json({
            data: coupons
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error
        })
    }
}
export const addCoupon = async(req,res)=>{
    try {

       
        const coupons = await Coupon.create(req.body)
        if (!coupons) {
            return res.status(404).json({
                message: "Không thể thêm phiếu giảm giá "
            })
        }
        
        return res.status(200).json({
            data: coupons
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            tinnhan: error
        })
    }
}
export const updateCoupon = async(req,res)=>{
    try {
       
        const coupons = await Coupon.findByIdAndUpdate(req.params.id,req.body)
        if (!colors) {
            return res.status(404).json({
                message: "Không thể cập nhật phiên bản "
            })
        }
        
        return res.status(200).json({
            message: "Cập nhật phiếu giảm giá thành công",
            data: colors
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error
        })
    }
}
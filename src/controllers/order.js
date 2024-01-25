import Order from "../models/order";

export const addOrder = async (req,res)=>{
  
    try {
        const order = await Order.create(req.body);
        if (!order) {
            return res.json({
           
                message: "Không thêm đơn hàng",
            });
        }
    
        return res.json({
            message: "Thêm đơn hàng thành công",
            data: order,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }

}
export const updateOrder = async (req,res)=>{
  
    try {
        const order = await Order.findByIdAndUpdate(req.params.id,req.body);
        if (!order) {
            return res.json({
           
                message: "Không cập nhật đơn hàng",
            });
        }
    
        return res.json({
            message: "Cập nhật đơn hàng thành công",
            data: order,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }

}
export const getAllOrder = async (req,res)=>{
  
    try {
        const orders = await Order.find().sort({createdAt: -1});
        if (!orders) {
            return res.json({
           
                message: "Không có đơn hàng nào",
            });
        }
    
        return res.json({
            data: orders,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }

}
export const getOneOrder = async (req,res)=>{
  
    try {
        const order = await Order.find({user_id:req.params.id}).sort({createdAt: -1});
        if (!order) {
            return res.json({
           
                message: "Không có đơn hàng nào",
            });
        }
    
        return res.json({
            data: order,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }

}
export const getDetailOrder = async (req,res)=>{
  
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.json({
           
                message: "Không có đơn hàng nào",
            });
        }
    
        return res.json({
            data: order,
        });
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }

}
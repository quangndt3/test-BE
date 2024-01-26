import jwt from "jsonwebtoken";
import User from "../models/user";
export const checkPermission = async (req, res, next) => {
    try {
        
        if (!req.headers.authorization) {
            throw new Error("Bạn phải đăng nhập để thực hiện hành động này");
        }
       

        const token = req.headers.authorization.split(" ")[1];      
        jwt.verify(token, "quang", async (err, payload) => {
            if (err) {
                if (err.name === "JsonWebTokenError") {
                    return res.status(401).json({
                        message: "Token không hợp lệ",
                    });
                }
                if (err.name === "TokenExpiredError") {
                    return res.status(401).json({
                        message: "Token hết hạn",
                    });
                }
            }

            const user = await User.findById(payload._id);

            if (user.role != "admin") {
                return res.json({
                    message: "Bạn không có quyền để thực hiện hành động này",
                });
            } 
            req.user = user;

            next();
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};
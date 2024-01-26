
import user from "../models/user";
import bcryptjs from "bcryptjs"
import Jwt  from "jsonwebtoken";
import { userSchema } from "../validate/user";



export const signup = async (req, res) => {
  try {
   
    const { name, email, password,images } = req.body;
    const {error} = userSchema.validate({
        name,
        images,
        email,  
        password,
    },
    {abortEarly:false})
    
    if(error){
        const errors = error.details.map((error) => error.message);
    
            return res.status(400).json({
                message: errors,
            });
    }
    const checkEmail = await user.findOne({ email });
    if (checkEmail) {
      return res.status(404).json({
        message: "Email đã tồn tại",
      });
    }
    const hashedPassword = await bcryptjs.hash(password,10)
    const acc = await user.create({
        name,
        email,
        images,
        password: hashedPassword
    });
    const token = Jwt.sign({_id: user._id},"quang", {expiresIn:"1h"})
    acc.password = undefined
    return res.json({
      message: "Đăng ký tài khoản thành công",
      accessToken: token,
      data: acc,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: error,
    });
  }
};

export const signin = async (req, res) => {
  try {
    const {email, password } = req.body;
    const {error} = userSchema.validate({
        email,
        password,
    },
    {abortEarly:false})
    if(error){
        const errors = error.details.map((error) => error.message);
            return res.status(400).json({
                message: errors,
            });
    }
    const checkEmail = await user.findOne({ email });
    if (!checkEmail) {
      return res.status(404).json({
        message: "Email không tồn tại",
      });
    }
    const checkPassword = await bcryptjs.compare(password,checkEmail.password)
    if(!checkPassword){
      return res.status(404).json({
        message: "Mật khẩu không đúng",
      });
    }
    const token = Jwt.sign({ _id: checkEmail._id },"quang", { expiresIn: "1h" });
 
    checkEmail.password = undefined
    return res.status(200).json({
      message: "Đăng nhập thành công",
      data: checkEmail,
      accessToken: token,
    });
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};
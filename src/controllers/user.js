import Joi from "joi";
import user from "../models/user";
import bcryptjs from "bcryptjs"
import Jwt  from "jsonwebtoken";
const userSchema = Joi.object({
  name: Joi.string(),
  images: Joi.string(),
  email: Joi.string().email().required().messages({
    "string.base": `"email" phải là kiểu "text"`,
    "string.empty": `"email" không được bỏ trống`,
    "string.email": `"email" phải có định dạng là email`,
    "any.required": `"email" là trường bắt buộc`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.base": `"password" phải là kiểu "text"`,
    "any.empty": `"password" không được bỏ trống`,
    "any.min": `"password" phải chứa ít nhất {#limit} ký tự`,
    "any.required": `"password" là trường bắt buộc`,
}),
rePassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.base": `"rePassword" phải là kiểu "text"`,
    "any.empty": `"rePassword" không được bỏ trống`,
    "any.only": `"rePassword" phải giống "password"`,
    "any.required": `"rePassword" là trường bắt buộc`,
}),
  
});

const userSignUpSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": `"email" phải là kiểu "text"`,
    "string.empty": `"email" không được bỏ trống`,
    "string.email": `"email" phải có định dạng là email`,
    "any.required": `"email" là trường bắt buộc`,
  }),
  password: Joi.string().min(6).required().messages({
    "any.base": `"password" phải là kiểu "text"`,
    "any.empty": `"password" không được bỏ trống`,
    "any.min": `"password" phải chứa ít nhất {#limit} ký tự`,
    "any.required": `"password" là trường bắt buộc`,
}),
  
});
export const signin = async (req, res) => {
  try {
   
    const { name, email, password, rePassword,images } = req.body;
    const {error} = userSchema.validate({
        name,
        images,
        email,  
        password,
        rePassword
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

export const signup = async (req, res) => {
  try {
    const {email, password } = req.body;
    const {error} = userSignUpSchema.validate({
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
    const token = Jwt.sign({ _id: checkEmail._id },"banThayDat", { expiresIn: "1h" });
    checkEmail.password = undefined
    return res.json({
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
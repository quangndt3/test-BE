import Joi from "joi";
export const userSchema = Joi.object({
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
  });
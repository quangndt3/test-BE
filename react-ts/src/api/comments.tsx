import { useActionData } from "react-router-dom";
import instance from "./instance";
import { IComment } from "../models";


const  user:object = JSON.parse(localStorage.getItem("user")!)

export const getAllComment = () => {
    return instance.get("/comments");
}

export const getOne = (id:string) => {
    return instance.get("/comments/" + id);
}

export const removeComments = (id:string) => {

    
    return instance.delete("/comments/"+ id,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}

export const addComment = (comment:IComment) => {
    console.log(comment);
    
    return instance.post("/comments",  comment);
}

// export const updateProduct = (newProduct:IProduct) => {

    
//     return instance.patch("/products/"+ newProduct._id,  newProduct,{
//         headers:{
//             authorization: `Bearer ${user.accessToken}`
//         }
//     });
// }

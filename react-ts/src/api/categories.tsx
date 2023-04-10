import { useActionData } from "react-router-dom";
import instance from "./instance";
import { ICategory } from "../models";



const  user:string = JSON.parse(localStorage.getItem("user")!)
export const getAllCategories = () => {
    return instance.get("/categories");
}

// export const getOne = (id:string) => {
//     return instance.get("/products/" + id);
// }

export const RemoveCategories = (id:string) => {
    console.log(id);
    
    return instance.delete("/categories/"+ id,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}

export const addCategory = (newCategory:ICategory) => {
    
    return instance.post("/categories",newCategory,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}


export const updateCategory = (newCategory:ICategory) => {

    console.log(newCategory);
    
    
    return instance.patch("/categories/"+ newCategory._id,  newCategory,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}
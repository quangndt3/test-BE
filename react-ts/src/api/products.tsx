import { useActionData } from "react-router-dom";
import instance from "./instance";
import { IProduct } from "../models";


    const  user:string = JSON.parse(localStorage.getItem("user")!)


export const getAll = () => {
    return instance.get("/products");
}

export const getOne = (id:string) => {
    return instance.get("/products/" + id);
}

export const remove = (id:string) => {

    
    return instance.delete("/products/"+ id,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}

export const addProduct = (newProduct:IProduct) => {

    console.log(newProduct);
    
    return instance.post("/products",  newProduct,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}

export const updateProduct = (newProduct:IProduct) => {

    
    return instance.patch("/products/"+ newProduct._id,  newProduct,{
        headers:{
            authorization: `Bearer ${user.accessToken}`
        }
    });
}






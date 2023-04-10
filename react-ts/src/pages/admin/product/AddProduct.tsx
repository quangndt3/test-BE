import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICategory, IProduct } from '../../../models';
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client';
import axios from 'axios';
interface IProps {
    categories: ICategory[],
    onAdd: (newProduct: IProduct) => void
}
const validate = ()=>{
 const name = document.getElementsByName("name")  
 const price = document.getElementsByName("price")
 const original_price = document.getElementsByName("original_price")
 const description = document.getElementsByName("description")
 if(name.value==undefined){
    alert("Tên sản phẩm k được bỏ trống")
 }   
 if(price.value== undefined||Number(price)<=0){
    alert("Giá sản phẩm không hợp lệ")
 }
 if(original_price.value== undefined || Number(original_price)<=0){
    alert("Giá gốc sản phẩm không hợp lệ")
 }
 if(description.value== undefined){
    alert("Miêu tả sản phẩm k được bỏ trống")
 }
}
const AddProduct = ( props:IProps) => {
    const [valueInput, setValueInput] = useState({});
    const [data, setData] = useState<ICategory[]>([])
    useEffect(() => {
        setData(props.categories)
        
      }, [props])

    const upload = async (files:any)=>{
        const CLOUD_NAME = "djf42qmp6"
        const PRESET_NAME="spring2023"
        const FOLDER_NAME="react"
        const linkanh: object[] =[];

        const api = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
        const formData = new FormData()
        formData.append("upload_preset",PRESET_NAME)
        formData.append("folder",FOLDER_NAME)

        for(const file of files){
            formData.append("file",file)
            const response = await axios.post(api,formData,{
                headers:{
                    "Content-Type":"multipart/from-data",
                },
            }).then(res=>{
                linkanh.push(res.data.secure_url)
            });
       
           
        }
       
        return linkanh
    }
 
    
    const navigate = useNavigate();
    const onHandleChange = (e:any) => {
        // e.preventDefault();
        const name = e.target.name;
        const value = e.target.value ;
        const specifications=[]

        const att = document.querySelectorAll(".attri") 
        for(var i=0;i<att.length;i++){
            specifications.push({value:att[i].value})
        }
        const anh = document.querySelectorAll(".img")

        
        setValueInput({ ...valueInput, [name]: value ,specifications})
       
        
    }
    const onHandleSubmit = async (e:any) => {
   
        e.preventDefault();
        validate()
        // const images = []
        // const testanh = document.querySelectorAll(".img")
        // for(var i=0;i<testanh.length;i++){
            
        //         images.push(await upload(testanh[i].files)) 

            
            
        // }   
 
        
 
        //     const cate_id = document.querySelector("#categoryId")
            
        //         props.onAdd({ ...valueInput,images:images,categoryId:cate_id.value})
            
        // navigate('/admin/products')
    }
    
 
    const addinput=()=>{
        const input = document.createElement("input")
        input.className="img w-full rounded py-3 my-2 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary"
        input.type="file"
        const imgs=document.querySelector("#anh")
        imgs?.appendChild(input)
    }
    const addAttibute=()=>{
        const input = document.createElement("input")
        input.className="attri w-full rounded py-3 my-2 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary"
        const imgs=document.querySelector("#atributes")
        imgs?.appendChild(input)
    }
    
    

    return (      
        <section className="bg-white py-20 lg:py-[120px] overflow-hidden relative z-10 w-[1200px]">
        <div className="container w-[1000px]">
            <div className="flex flex-wrap lg:justify-between -mx-4 w-[1000px]">

                <div className="  xl:w-5/12 px-4 w-[1000px]">
                    <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg w-[1000px] ml-[80px]">
                    <form onSubmit={onHandleSubmit} >
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Tên sản phẩm"
                                name="name"
                                onChange={onHandleChange} 
                                className="
                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                                />
                        </div>
            
                        <div className="mb-6">
                            <input
                                type="text"
                                name="price"
                                placeholder="Giá bán"
                                onChange={onHandleChange} 
                                className="
                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                                />
                        </div>
                        <div className="mb-6">
                            <input
                                type="text"
                                name="original_price"
                                placeholder="Giá gốc"
                                onChange={onHandleChange} 
                                className="
                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                                />
                        </div>
                        <div className="mb-6">
                            <input
                                type="text"
                                name="quantity"
                                placeholder="Số lượng"
                                onChange={onHandleChange} 
                                className="
                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                                />
                        </div>
                        <div className="mb-6">
                            <input
                                type="text"
                                name="brand"
                                placeholder="Thương hiệu"
                                onChange={onHandleChange} 
                                className="
                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                                />
                        </div>
                        <button type='button' onClick={addinput}>Ảnh</button>
                        <div id="anh"></div>
                        <button type='button' onClick={addAttibute}>Đặc điểm</button>
                        <div id="atributes"></div>
                       
                        <div className="mb-6">
                            <select name="categoryId"    id="categoryId">
                              
                            {data.map(item=>{
                                return(
                                    <option value={item._id}>{item.name}</option>
                                )
                            })}
                            </select>
                        </div>
                        <div className="mb-6">
                            <textarea
                                name="description"
                                onChange={onHandleChange} 
                                placeholder="Miêu tả"
                                className="
                                w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                resize-none
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary
                                "
                                ></textarea>
                        </div> 
                        <div>
                            <button
                                type="submit"
                                className="
                                w-full

                                bg-primary
                                rounded
                                border border-primary
                                p-3
                                transition
                                hover:bg-opacity-90
                                "
                                >
                            Thêm sản phẩm
                            </button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>
        </section>

    )
}

export default AddProduct
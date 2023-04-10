import React, { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { ICategory, IProduct } from '../../../models'
// import { updateProduct} from '../../api/product'


interface IProps {
    categories: ICategory[]
    products: IProduct[],
    onUpdate: (id: IProduct) => void
}

const UpdateProduct = (props : IProps) => {
    console.log(props.products);
    
    const { id } = useParams()
    const [sanpham, setProduct] = useState<IProduct>()
    const [category,setCategory] = useState<ICategory[]>()
    useEffect(() => {
         const product = props.products.find(item => item._id == id)
            setProduct(product)
            setCategory(props.categories)
    },[])
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({})
    const onHandleChange = (e:any) => {
        // const name = e.target.name
        // const value = e.target.value
        const { name, value } = e.target
        setInputValue({ ...inputValue, [name]: value })

        
    }
    const onHandleSubmit = (e:any) => {
        e.preventDefault()
        const img = document.querySelectorAll(".img")
        const images = []
        const specifications = []
        for(var i=0;i<img.length;i++){
            images.push(img[i].value)
        }
        const attributes = document.querySelectorAll(".attri")
        for(var i=0;i<attributes.length;i++){
            specifications.push({value:attributes[i].value})
        }
        const updateData:IProduct= {...sanpham!,...inputValue!,images,specifications}
        console.log(updateData);
        
        props.onUpdate(updateData)  
         navigate('/admin/products');
    }   

    

    

    return (      
        <section className="bg-white py-20 lg:py-[120px] overflow-hidden relative z-10 w-[1300px]">
        <div className="container ">
            <div className="flex flex-wrap justify-between mx-4 ">
                <div className="w-full  xl:w-[60%] px-4 mx-auto">
                    <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg ">
                    <form onSubmit={onHandleSubmit} >
                        <div className="mb-6">
                            <h2 className='mb-4'>Tên sản phẩm</h2>
                            <input
                                type="text"
                                placeholder="Your Name"
                                name="name"
                                defaultValue={sanpham?.name}
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
                        <h2 className='mb-4'>Giá sản phẩm</h2>
                        <div className="mb-6">
                            <input
                                type="text"
                                name="price"
                                placeholder="Giá"
                                defaultValue={sanpham?.price}
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
                        <h2 className='mb-4'>Giá gốc </h2>
                        <div className="mb-6">
                            <input
                                type="text"
                                name="original_price"
                                defaultValue={sanpham?.original_price}
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
                        <h2 className='mb-4'>Số lượng</h2>
                        <div className="mb-6">
                            <input
                                type="text"
                                defaultValue={sanpham?.quantity}
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
                        <h2 className='mb-4'>Thương hiệu</h2>
                        <div className="mb-6">
                            <input
                                type="text"
                                defaultValue={sanpham?.brand}
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
                        <h2 className='mb-4'>Ảnh sản phẩm</h2>
                        {sanpham?.images.map(img =>{
                            return(
                                <>
                              
                                <img className='w-[200px] mb-5' src={img} alt="" />
                                <input type="text" className='img w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary  mb-5'  defaultValue={img}/>
                                </>
                            )
                        })}
                        {sanpham?.specifications.map(item=>{
    
                            
                            return(
                                <input type="text" className='attri w-full rounded py-3 my-2 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary' defaultValue={item.value} />
                            )
                        })}
                        <div className="mb-6">
                        <h2 className='mb-4'>Danh mục sản phẩm</h2>
                            <select name="categoryId"    id="" className=' w-full
                                rounded
                                py-3
                                px-[14px]
                                text-body-color text-base
                                border border-[f0f0f0]
                                outline-none
                                focus-visible:shadow-none
                                focus:border-primary'>
                            <option value={sanpham?.categoryId}>{sanpham?.categoryId.name}</option>
                            {category!?.map(item=>{
                                if(item._id!=sanpham?.categoryId._id){        
                                    return(
                                        <option  value={item._id}>{item.name}</option>
                                    )
                                }
                            })}
                            </select>
                        </div>
                        <h2 className='mb-4'>Miêu tả</h2>
                        <div className="mb-6">
                            <textarea
                                name="descripton"  
                                defaultValue={sanpham?.description}
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
                            Sửa sản phẩm
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

export default UpdateProduct
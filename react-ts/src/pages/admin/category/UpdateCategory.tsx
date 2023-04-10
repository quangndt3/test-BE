import React, { useEffect, useState } from 'react'
import { useParams, useNavigate} from 'react-router-dom'
// import { updateProduct} from '../../api/product'
interface category {
    _id:string,
    name: string,
    createdAt: string,
    updatedAt: string
}
interface IProps {
    categories: category[],
    onUpdate: (id: category) => void
}

const UpdateCategory= ({categories , onUpdate} : IProps) => {   
    
    const { id } = useParams()
    const [cate, setCate] = useState<category>()
    useEffect(() => {
         const cateTemp = categories?.find(item => item._id == id)
            setCate(cateTemp)
    },[])
    const navigate = useNavigate();

    const [inputValue, setInputValue] = useState({})
    const onHandleChange = (e:any) => {
        const name = e.target.name
        const value = e.target.value
      
        setInputValue({ ...inputValue, [name]: value })
     
        
        
    }
    const onHandleSubmit = (e:any) => {
            e.preventDefault()
            const updateData:category= {...cate!, ...inputValue!}

            onUpdate(updateData)  
            navigate('/admin/categories');
    }   

    // console.log(product);

    return (      
        <section className="bg-white py-20 lg:py-[120px] overflow-hidden relative z-10">
        <div className="container">
            <div className="flex flex-wrap lg:justify-between -mx-4">

                <div className="w-[500px] ml-[300px] px-4">
                    <div className="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
                    <form onSubmit={onHandleSubmit}>
                        <div className="mb-6">
                            <input
                                type="text"
                                placeholder="Tên danh mục"
                                name="name"
                                onChange={onHandleChange} 
                                defaultValue={cate?.name}
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
                            Sửa danh mục
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

export default UpdateCategory
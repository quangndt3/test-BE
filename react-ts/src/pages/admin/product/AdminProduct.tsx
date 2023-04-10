import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IProduct } from '../../../models'
import formatprice from '../../../sub'

interface IProps {
    products: IProduct[],
    onRemove: (id: string) => void
}

const AdminProduct = (props:IProps) => {

  

    const [data, setData] = useState<IProduct[]>([])
    useEffect(() => {
      setData(props.products)
      
    }, [props])
    
    const navigate = useNavigate();
    const onNavigate = (id:string) => {
      navigate(`/admin/product/${id}/update`)
    }

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-[1200px]">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>

                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Tên sản phẩm</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Ảnh</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Giá</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Thương hiệu</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  <a href="/admin/product/add">Thêm sản phẩm</a>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
    
              {data.map(item => {
                
                return (
                  <tr key={item._id} className="hover:bg-gray-50">
                
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-10 ">
                        <div className="font-medium text-gray-700">{item.name}</div>  
                      </div>
    
                    </th>
                    <td className="px-6 py-4">
                      
                    <span>
                          <img className='w-[150px]' src={item.images[0]  } alt="" />
                        </span></td>
                    <td className="px-6 py-4">
                      
                    <span>
                          {formatprice(item.price)}
                        </span></td>
                        <td className="px-6 py-4">
                      
                      <span>
                            {item.brand}
                          </span></td>
                    
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <span
                          className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600"
                        >
                          <button onClick={() => props.onRemove(item._id)}>Delete</button>
                        </span>
                        <span
                          className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600"
                        >
                          <button onClick={() => onNavigate(item._id)}>Update</button>
                        </span>
                      </div>
                    </td>
    
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )
}

export default AdminProduct
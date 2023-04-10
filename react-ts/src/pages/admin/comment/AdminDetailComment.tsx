import { useEffect, useState } from "react";
import { IComment, IProduct } from "../../../models"
import { useParams } from "react-router-dom";

interface IProps{
    comments: IComment[],
    onRemove: (id: string) => void;
}
export const AdminDetailComment = (props:IProps)=>{

    const { id } = useParams();
    const [comment,setComment] = useState<IComment[]>()
    
    useEffect(()=>{
        const temp2 = props.comments.filter((item) => item.productId == id);
        setComment(temp2);
    }, [props.comments])
    const handleRemoveComment = (id:string) => {

        props.onRemove(id);
      };

    
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5 w-[1200px]">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
            <thead className="bg-gray-50">
              <tr>

                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Người bình luận</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Ảnh</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Nội dung</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">Ngày bình luận</th>
                <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                  Chức năng
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 border-t border-gray-100">
    
              {comment?.map(item => {
                
                return (
                  <tr key={item._id} className="hover:bg-gray-50">
                
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-10 ">
                        <div className="font-medium text-gray-700">{item.userId.name}</div>  
                      </div>
    
                    </th>
                    <td className="px-6 py-4">
                      
                    <span>
                          <img className='w-[150px]' src={item.userId.images} alt="" />
                        </span></td>
                    <td className="px-6 py-4 ">
                      
                    <span>
                          {item.content}
                        </span></td>
                        <td className="px-6 py-4 ">
                      
                      <span>
                            {item.createdAt}
                          </span></td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <span
                          className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600"
                        >
                          <button className="btn_remove" onClick={()=>{handleRemoveComment(item._id!)}}>Xoá</button>
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
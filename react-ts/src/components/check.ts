import { useNavigate } from "react-router-dom";

export const check=()=>{
    const user  = JSON.parse(localStorage.getItem("acc")!);
    if(user.role!="admin"){
       const navigate =  useNavigate()
       alert("Bạn không đủ quyền để vào trang này")
       navigate(`/`)
    }
}
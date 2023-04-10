import { useState, useEffect } from 'react'
import './App.css'
import { Routes, Route  } from 'react-router-dom'
import WebsiteLayout from './layouts/WebsiteLayout'
import HomePages from './pages/HomePages'
import CartPage from './pages/CartPage'
import DetailProduct from './pages/DetailProduct'
import { getAll, getOne, remove, addProduct, updateProduct } from './api/products'
import AdminLayout from './layouts/AdminLayout'
import Dashboar from './pages/admin/Dashboar'
import AddProduct from './pages/admin/product/AddProduct'
import UpdateProduct from './pages/admin/product/UpdateProduct'
import AdminProduct from './pages/admin/product/AdminProduct'
import LogIn from './pages/user/signup'
import UserLayout from './layouts/UserLayout'
import { signin, signup } from './api/users'
import Signin from './pages/user/Signin'
import { RemoveCategories, addCategory, getAllCategories, updateCategory } from './api/categories'
import AdminCategory from './pages/admin/category/AdminCategory'
import AddCategory from './pages/admin/category/AddCategory'
import UpdateCategory from './pages/admin/category/UpdateCategory'
import { ICategory, IProduct, IComment } from './models'
import { addComment, getAllComment, removeComments } from './api/comments'
import { AdminComment } from './pages/admin/comment/AdminComment'
import { AdminDetailComment } from './pages/admin/comment/AdminDetailComment'

function App() {



  const [products, setProducts] = useState<IProduct[]>([])
  const [categories, setCategories] = useState<ICategory[]>([])
  const [comments, setComments] = useState<IComment[]>([])
  const [cart,setCart] = useState<IProduct[]>([])
  useEffect(() => {
    getAll().then(({ data }) => {
      console.log(data);
      setProducts(data.product)
    })

    getAllCategories().then(({ data }) => {
      setCategories(data)
      console.log(data);

    })
    getAllComment().then(({ data }) => {
      setComments(data.comment)

    })
    const user_id = JSON.parse(localStorage.getItem("user")!);
    let cart_length = []
    if(user_id){
      cart_length=JSON.parse(localStorage.getItem(user_id.data._id)!)
    }
    setCart(cart_length)
  }, [])
  const onHandleRemove = (_id: string) => {
    const confrim = window.confirm('You want to remove ?');
    if (confrim) {

      const result = products.filter(item => {
        if (item._id !== _id) {

          return item
        }
      })
      remove(_id).then(() => { setProducts(result) })

    }
  }



  const onHandleAdd = (product: IProduct) => {
    console.log('app.js', product)

    addProduct(product).then((res) => {
      if(res.data.message=="Token hết hạn"){
          alert("Token hết hạn, bạn hãy đăng nhập lại")
      }
      else{
        getAll().then(({ data }) => {
   
          setProducts(data.product)
          console.log(data.products);
          
        })
        alert("Thành công")
      }

      
    }).catch(error => {
      alert(error)
      console.log(error);
      
    })

  }

  const onHandleUpdate = (newproduct: IProduct) => {
    console.log('app.js update', newproduct)

    updateProduct(newproduct).then(() => {
      const index = products.findIndex(item => item._id == newproduct._id)
      const temp = products.slice()
      temp[index] = newproduct

      setProducts(temp)
      console.log("Thành công");

    })
      .catch(error => {
        console.log(error);

      })


  }
  const onHandleRemoveCategory = (_id: string) => {
    const confrim = window.confirm('You want to remove ?');
    if (confrim) {

      const result = categories.filter(item => {
        if (item._id !== _id) {

          return item
        }
      })
      RemoveCategories(_id).then(() => { setCategories(result) })

    }

  }


  const onHandleAddCategory = (category: ICategory) => {
    console.log('app.js', category)
    const temp: ICategory[] = categories
    temp.push(category)
    addCategory(category).then(() => setCategories(temp))

    console.log(temp);

    alert("Them moi thanh cong")
  }


  const onHandleUpdateCategory = (newCategory: ICategory) => {
    console.log('app.js update', newCategory)
    const index = categories.findIndex(item => item._id == newCategory._id)
    const temp = categories
    temp[index] = newCategory
    updateCategory(newCategory).then(() => {
      setCategories(temp)
      console.log(temp);

      console.log("Thành công");

    })
      .catch(error => {
        console.log(error);

      })


  }
  // handle comments

  const onHandleAddComment = (newComment:IComment)=>{

    let temp: IComment[] 
    
    addComment(newComment).then(() => {
      getAllComment().then(({ data }) => {
        temp=data.comment
  
        setComments(temp)
      })    
    })
    alert("Them moi thanh cong")
  }
  
  const onHandleRemoveComment = (_id: string) => {
    const confrim = window.confirm('Bạn có muỗn xoá bình luận này không ?');
    if (confrim) {

      const result = comments.filter(item => {
        if (item._id !== _id) {

          return item
        }
      })
      removeComments(_id).then(() => {setComments(result) })

    }

  }
  // gio hang
  const handleRemoveCart = (temp:IProduct[])=>{

    setCart(temp)
 
  }
  const handleAddCart = (temp:IProduct[])=>{

    setCart(temp)
 
  }
  console.log(products);
  
  return (
    <div className="App">
      <Routes>

        {/* Website */}
        <Route path='/' element={<WebsiteLayout cart={cart}  />}>
          <Route index element={<HomePages products={products} />} />
          <Route path='products'>
            <Route path=':id' element={<DetailProduct products={products} comments={comments} onAddComment={onHandleAddComment} onRemove={onHandleRemoveComment} onAddCart={handleAddCart}/>} />
          </Route>
          <Route path='cart'>
              <Route index element={<CartPage products={products} onRemove={handleRemoveCart}/>}></Route>
          </Route>
        </Route>

        {/* Admin */}

        <Route path='/admin'    element={<AdminLayout/>}>
          <Route index element={<Dashboar />} />

          <Route path='products' element={<AdminProduct products={products} onRemove={onHandleRemove} />} />
          <Route path='product'  >
            <Route path='add' element={<AddProduct categories={categories} onAdd={onHandleAdd} />} />
            <Route path=':id/update' element={<UpdateProduct categories={categories} products={products} onUpdate={onHandleUpdate} />} />
          </Route>
          
          <Route path='categories' element={<AdminCategory categories={categories} onRemove={onHandleRemoveCategory} />} />
          <Route path='category'>
            <Route path='add' element={<AddCategory onAdd={onHandleAddCategory} />} />
            <Route path=':id/update' element={<UpdateCategory categories={categories} onUpdate={onHandleUpdateCategory} />} />
          </Route>

          <Route path='comments' element={<AdminComment products={products}/>} />

            <Route path='detail_comment/:id' element={<AdminDetailComment comments={comments} onRemove={onHandleRemoveComment} />} />

        </Route>  

       


        {/* user */}
        <Route path='/user' element={<UserLayout />}>
          <Route path="login" element={<LogIn onSignup={signup} />} />
          <Route path="signin" element={<Signin onSignin={signin} />} />

        </Route>
      </Routes>
    </div>
  )
}

export default App

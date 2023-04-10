import React, { useEffect, useState } from 'react'
import Product from '../components/product'
import { IProduct } from '../models'
import { useParams } from 'react-router-dom'

interface IProps {
  products: IProduct[],
}

const HomePages = (props:IProps) => {
  const [products, setProducts] = useState<IProduct[]>([]) 

  useEffect(() => {
    setProducts(props.products)
  }, [props.products])
  return <div>  

      <div className="grid xl:grid-cols-4 gap-5 px-[130px] md:grid-cols-2 ">
          {products.map(product =>
          
              <Product
                  data={product}
                  key={product._id} />)
          }

      </div>
      
  </div>
}

export default HomePages
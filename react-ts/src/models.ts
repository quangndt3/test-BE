

export interface IProduct {
    _id: string;
    name: string;
    price: number;
    original_price: number;
    description: string;
    images: string[];
    brand: string;
    specifications: ISpecification[];
    categoryId: ICategory;
    comments: IComment[];
    quantity: number;
  }
  export interface ISpecification {
     
      value: string,
    
  }
export interface ICategory {
    _id:string,
    name: string,
    createdAt: string,
    updatedAt: string
  }
export  interface IUser {
    id: object,
    name: string,
    email: string,
    password: string,
    images: string;
}

export interface IAcc{
    name: string,
    email: string,
    password: string,
    rePassword:string
}
export interface IComment{
  _id: string|undefined,
  content: string,
  userId: IUser,
  productId: string,
  createdAt:string|undefined
}


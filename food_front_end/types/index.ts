import { StaticImageData } from "next/image";

export type IUsers = {
  cart: ICart[];
  user: IUser;
};

export interface ICart extends IMetaResponse {
  carts: {
    product: IProduct;
  }[];
}

export type ICategory = {
  id: string;
  category: string;
};

export type IUser = {
  id: string;
  name: string;
  email?: string;
  cartCounts: number;
  role: string;
  createdAt?: string;
};

export interface IMetaResponse {
  meta: {
    totalPages: number;
    limit: number;
    page: number;
  };
}

export interface IAdminDashboard extends IMetaResponse {
  category?: ICategory[];
  products?: IProduct[];
  users?: IUsers[];
  orders?: IOrderObj[];
}

export interface IAdminDashboardCounts {
  productCounts: number;
  orderCounts: number;
  userCounts: number;
}

export interface IProduct {
  id: string;
  title: string;
  price: string;
  isLiked: boolean;
  imageCover: File | string;
  category: ICategory;
  desc: string;
  createdAt: string;
}

export interface IProductAndMeta extends IMetaResponse {
  search: ISearchParams;
  products: IProduct[];
}

export interface IUsersAndMeta extends IMetaResponse {
  users: IUser[];
}

export type IPartialProduct = Partial<IProduct>;

export type IOrderObj = {
  paymentId: string;
  Img: StaticImageData;
  Title: string;
  Price: string;
  Category: string;
  Name: string;
  Address: string;
  Pincode: string;
  PhoneNumber: string;
  Email: string;
  Date: string;
};

export type IOrder = {
  id: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  totalPrice: number;
  paymentMethod: string;
  status: string;
  items: IOrderItem[];
};

export type IOrderItem = {
  id: string;
  product: IProduct;
};

export interface IOrderAndMeta extends IMetaResponse {
  orders: IOrder[];
}

export type IForm = {
  name?: string;
  email: string;
  password: string;
};

export interface ISearchParams {
  page: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  categoryId?: string;
}

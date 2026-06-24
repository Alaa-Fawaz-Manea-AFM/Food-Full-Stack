"use client";
import {
  IAdminDashboard,
  IAdminDashboardCounts,
  ICategory,
  IOrderAndMeta,
  IProduct,
  IUsers,
  IUsersAndMeta,
} from "@/types";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type IValue = {
  category: ICategory[];
  setCategory: Dispatch<SetStateAction<ICategory[]>>;
  users: IUsersAndMeta;
  setUsers: Dispatch<SetStateAction<IUsersAndMeta>>;
  products: IAdminDashboard;
  setProducts: Dispatch<SetStateAction<IAdminDashboard>>;
  AdminCounts: IAdminDashboardCounts | null;
  setAdminCounts: Dispatch<SetStateAction<IAdminDashboardCounts | null>>;
  orders: IOrderAndMeta;
  setOrders: Dispatch<SetStateAction<IOrderAndMeta>>;
};

const MyContext = createContext<IValue | null>(null);

export const useUserContextAdmin = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error("useUserContext must be used within MyState");
  }

  return context;
};

const AdminMyState = ({ children }: { children: React.ReactNode }) => {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [AdminCounts, setAdminCounts] = useState<IAdminDashboardCounts | null>(
    null,
  );
  const [users, setUsers] = useState<IUsersAndMeta>({
    users: [],
    meta: {
      totalPages: 0,
      limit: 0,
      page: 0,
    },
  });
  const [orders, setOrders] = useState<IOrderAndMeta>({
    orders: [],
    meta: {
      totalPages: 0,
      limit: 0,
      page: 0,
    },
  });

  const [products, setProducts] = useState<IAdminDashboard>({
    products: [],
    meta: {
      totalPages: 0,
      limit: 0,
      page: 0,
    },
  });

  const value: IValue = {
    category,
    setCategory,
    users,
    setUsers,
    products,
    setProducts,
    AdminCounts,
    setAdminCounts,
    orders,
    setOrders,
  };
  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default AdminMyState;

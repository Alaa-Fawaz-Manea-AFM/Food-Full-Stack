import { Comp_cart } from "@/components";
import { AxiosServer } from "@/lib/axios-server";
import { ICart, ISearchParams } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Ecommerce Cert Page",
};

const CartPage = async ({ searchParams }: { searchParams: ISearchParams }) => {
  const { page = 1 } = await searchParams;

  let carts: ICart;
  try {
    const { data } = await AxiosServer("get", `carts?page=${page}`);
    carts = data?.data || {
      cart: [],
      meta: { totalPages: 0, limit: 9, page: 1 },
    };
  } catch {
    carts = { carts: [], meta: { totalPages: 0, limit: 9, page: 1 } };
  }

  return <Comp_cart carts={carts} page={+page} />;
};
export default CartPage;

import { Filter, ProductDiv } from "@/components";
import BtnPaginations from "@/components/BtnPaginations";
import { AxiosServer } from "@/lib/axios-server";
import { IProduct, IProductAndMeta, ISearchParams } from "@/types";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Products",
  description: "Ecommerce Products Page",
};

type IProps = {
  searchParams: Promise<ISearchParams>;
};

const AllProducts = async ({ searchParams }: IProps) => {
  const {
    page = 1,
    minPrice = 0,
    maxPrice = 0,
    search,
    categoryId,
  } = await searchParams;
  const t = await getTranslations("cartPage");

  const apiurl = `products?page=${page}${search ? `&search=${search}` : ""}${categoryId ? `&categoryId=${categoryId}` : ""}${minPrice || maxPrice ? `&minPrice=${minPrice}&maxPrice=${maxPrice}` : ""}`;

  let menu: IProductAndMeta;
  try {
    const { data } = await AxiosServer("get", apiurl);
    menu = data?.data;
  } catch {
    throw Error;
  }

  return (
    <div className="mt-28">
      <div className="w-[600px] max-ss:w-[85%] mx-auto">
        <Filter />
      </div>

      <div className="my-10 mx-auto overflow-hidden w-full">
        <div className="flex flex-wrap gap-5 justify-center">
          {menu?.products?.length === 0 ? (
            <p className="dark:text-white">
              {t("notFound")}

              <b className="text-custom-green">{search}</b>
            </p>
          ) : (
            ""
          )}
          {menu?.products?.map((prod) => (
            <div key={prod.id}>
              <ProductDiv prod={prod} />
            </div>
          ))}
        </div>
        <BtnPaginations
          totalPage={menu?.meta?.totalPages || 0}
          page={page}
          search={search}
          categoryId={categoryId}
          minPrice={minPrice}
          maxPrice={maxPrice}
        />
      </div>
    </div>
  );
};

export default AllProducts;

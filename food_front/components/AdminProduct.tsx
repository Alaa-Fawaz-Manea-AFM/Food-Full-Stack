"use client";
import { adminTabPanelProduct } from "@/constant/Constant";
import {
  IAdminDashboard,
  IAdminDashboardCounts,
  IProduct,
  ISearchParams,
} from "@/types";
import Image from "next/image";
// import Link from "next/link";
import ComSearchAdmin from "./ComSearchAdmin";
import { useUserContextAdmin } from "@/context/AdminMyState";
import { useEffect } from "react";
import AxiosClient from "@/lib/axios-client";
import { formatDate } from "@/constant/api";
import BtnEditAndDeleteProduct from "./BtnEditAndDeleteProduct";
import { toast } from "react-toastify";
import BtnPaginations from "./BtnPaginations";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const AdminProduct = ({ page, search }: ISearchParams) => {
  const t = useTranslations("AdminProductPage");
  const { products, setProducts, setAdminCounts } = useUserContextAdmin();

  useEffect(() => {
    const fetchProduct = async () => {
      if (products.meta?.page === page && !search) return;
      try {
        const apiUrl = search
          ? `admin-dashboard/products?search=${search}&page=${page}`
          : `admin-dashboard/products?page=${page}`;

        const { data } = await AxiosClient.get(apiUrl);
        setProducts(data?.data);
      } catch {
        throw Error;
      }
    };

    fetchProduct();
  }, [page, search]);

  const handleDeleteProduct = async (id: string) => {
    try {
      await AxiosClient.delete(`products/${id}`);
      setProducts((pre: IAdminDashboard) => {
        if (!pre) return pre;
        return {
          ...pre,
          products: pre.products?.filter((prod) => prod.id !== id),
        };
      });
      setAdminCounts((pre: IAdminDashboardCounts | null) => {
        if (!pre) return pre;
        return {
          ...pre,
          productCounts: pre.productCounts - 1,
        };
      });
      toast.success(t("productDeletedSuccess"));
    } catch {
      toast.error(t("productDeletedFailed"));
    }
  };

  return (
    <div className="py-10 w-[90%] mx-auto">
      <div className="grid grid-cols-3 gap-5">
        <div className="flex items-center gap-2 col-span-2 max-ss:col-span-3">
          <ComSearchAdmin />
        </div>
        <Link
          href="/admin/menu/create"
          className="w-fit ml-auto border-custom-green text-custom-green hover:shadow-custom-green hover:shadow-[inset_0_0_8px_rgb(250,245,255)] transition-all duration-300 ease-in-out font-medium border-b-4 rounded-lg text-xl px-5 py-1.5 text-center mb-2"
        >
          {t("addProduct")}
        </Link>
      </div>
      <div className="overflow-scroll w-full dark:bg-custom-gray bg-primary">
        <table className="text-sm w-full border border-secondary">
          <thead className="text-xs uppercase shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]">
            <tr>
              {adminTabPanelProduct?.map((tab, i) => (
                <th key={i} scope="" className="px-6 py-3">
                  {t(`table.${tab}`)}
                </th>
              ))}
            </tr>
          </thead>
          {products.products?.map((prod: IProduct, index) => {
            const { title, price, imageCover, category, createdAt, id } = prod;
            return (
              <tbody key={index}>
                <tr className="border-b dark:border-gray-tx text-center">
                  <td className="px-6 py-4">{++index}.</td>

                  <td
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    <Image
                      width={56}
                      height={56}
                      className="object-contain rounded-sm w-14 max-h-14 h-14"
                      src={imageCover as string}
                      alt={title}
                      unoptimized
                    />
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div
                      className="line-clamp-1 max-w-52 mx-auto"
                      title={title}
                    >
                      {title}
                    </div>
                  </td>
                  <td className="h-20">
                    <sup>$</sup>
                    {price}
                  </td>
                  <td className="px-6 py-4 align-middle">
                    <div
                      className="line-clamp-1 max-w-36 mx-auto"
                      title={category.category}
                    >
                      {category.category}
                    </div>
                  </td>
                  <td className="px-6 py-4">{formatDate(createdAt!)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <div className="flex gap-2 cursor-pointer">
                        <BtnEditAndDeleteProduct
                          menuId={id!}
                          onDeleteSuccess={handleDeleteProduct}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <BtnPaginations
          totalPage={products?.meta?.totalPages || 0}
          page={page}
          search={search}
        />
      </div>
    </div>
  );
};

export default AdminProduct;

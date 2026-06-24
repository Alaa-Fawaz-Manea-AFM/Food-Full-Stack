"use client";
import { adminTabPanelOrder } from "@/constant/Constant";
import BtnPaginations from "./BtnPaginations";
import { useTranslations } from "next-intl";
import { useUserContextAdmin } from "@/context/AdminMyState";
import { useEffect } from "react";
import AxiosClient from "@/lib/axios-client";
import { ISearchParams } from "@/types";
import { formatDate } from "@/constant/api";

const AdminOrders = ({ page = 1 }: ISearchParams) => {
  const t = useTranslations("AdminOrdersPage");
  const { orders, setOrders } = useUserContextAdmin();

  useEffect(() => {
    const fetchUser = async () => {
      if (orders?.meta?.page === page) return;

      try {
        const apiUrl = `admin-dashboard/orders?page=${page}`;
        const { data } = await AxiosClient.get(apiUrl);
        setOrders(data?.data);
      } catch (error) {
        console.error("Failed to fetch admin users:", error);
      }
    };

    fetchUser();
  }, [page]);

  return (
    <div className="w-[95%] md:w-[90%] mx-auto mt-6">
      <div className="w-full overflow-x-auto rounded-2xl border border-custom-green dark:border-zinc-800 shadow-xl">
        <table className="w-full text-sm text-left rtl:text-right text-zinc-500 dark:text-zinc-400 border-collapse">
          <thead className="text-xs text-zinc-700 uppercase border-b border-custom-green  dark:bg-zinc-900/50">
            <tr>
              {adminTabPanelOrder.map((tab, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-6 py-4 font-bold tracking-wider whitespace-nowrap"
                >
                  {t(`table.${tab}`)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {orders && orders?.orders?.length > 0 ? (
              orders?.orders?.map((order, i) => {
                const { createdAt, user, totalPrice, paymentMethod, status } =
                  order;

                return (
                  <tr
                    key={i}
                    className="transition-colors duration-150 border-b border-zinc-100 dark:border-zinc-800/50"
                  >
                    <td className="px-6 py-4 font-semibold text-zinc-900 dark:text-zinc-300 whitespace-nowrap">
                      {i + 1}
                    </td>

                    <td className="px-6 py-4 font-medium text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                      {user?.name || t("guest")}
                    </td>

                    <td className="px-6 py-4 max-w-46 truncate text-zinc-400 dark:text-zinc-500">
                      {user?.email || "-"}
                    </td>

                    <td className="px-6 py-4 font-bold text-custom-green whitespace-nowrap">
                      ${totalPrice}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {paymentMethod}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          status === "completed" || status === "delivered"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-zinc-400 dark:text-zinc-500">
                      {formatDate(createdAt)}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={adminTabPanelOrder.length}
                  className="text-center py-12 text-zinc-500 font-medium"
                >
                  {t("noOrdersFound")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <BtnPaginations
          totalPage={orders?.meta?.totalPages || 1}
          page={orders?.meta?.page || page}
        />
      </div>
    </div>
  );
};

export default AdminOrders;

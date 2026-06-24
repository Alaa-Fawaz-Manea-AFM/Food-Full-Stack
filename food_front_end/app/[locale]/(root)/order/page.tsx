import { AxiosServer } from "@/lib/axios-server";
import { IOrder } from "@/types";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { FaChevronRight, FaShoppingBag, FaCalendarAlt } from "react-icons/fa";

const getAllOrders = async () => {
  try {
    const { data } = await AxiosServer("get", "orders/my-orders");
    return data?.data || [];
  } catch {
    return [];
  }
};

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "PENDING":
      return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    case "PREPARING":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "OUT_FOR_DELIVERY":
      return "bg-indigo-500/10 text-indigo-500 border-indigo-500/20";
    case "DELIVERED":
      return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
    default:
      return "bg-zinc-500/10 text-zinc-500 border-zinc-500/20";
  }
};
const OrdersPage = async () => {
  const t = await getTranslations("OrdersPage");
  const locale = await getLocale();
  const orders = await getAllOrders();

  return (
    <div className="min-h-screen pt-32 pb-16 dark:bg-secondary bg-primary transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white">
            {t("title")}
          </h1>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
            {t("description")}
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-zinc-900/20 border border-zinc-100 dark:border-zinc-900 rounded-2xl p-8 max-w-md mx-auto space-y-4">
            <div className="p-4 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-400 w-fit mx-auto">
              <FaShoppingBag size={35} />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
              {t("emptyTitle")}
            </h2>
            <p className="text-xs text-zinc-400">{t("emptyDescription")}</p>
            <Link
              href="/menu"
              className="inline-block px-5 py-2.5 bg-custom-green text-zinc-950 font-bold rounded-xl text-xs shadow-xs hover:opacity-90 transition-all"
            >
              {t("orderNow")}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order: IOrder) => (
              <div
                key={order.id}
                className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-5 hover:border-custom-green dark:hover:border-custom-green transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-zinc-400 truncate max-w-[180px] sm:max-w-xs">
                      ID: {order.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getStatusBadgeClass(order.status)}`}
                    >
                      {t(`status.${order.status}`)}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-zinc-900 dark:text-white">
                    <p className="text-sm font-semibold">
                      {order.items?.length || 0}{" "}
                      {order.items?.length === 1 ? t("item") : t("items")}
                    </p>
                    <div className="h-4 w-[1px] bg-zinc-200 dark:bg-zinc-800" />
                    <p className="text-base font-black text-custom-green">
                      ${order.totalPrice}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <FaCalendarAlt size={12} />
                    <span>
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/order/${order.id}`}
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-zinc-50 hover:bg-custom-green dark:bg-zinc-800/50 dark:hover:bg-custom-green text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-zinc-950 font-bold text-xs rounded-xl transition-all sm:w-auto w-full group-hover:scale-[1.02]"
                >
                  {t("trackOrder")}
                  <FaChevronRight
                    size={10}
                    className={locale === "ar" ? "rotate-180" : ""}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

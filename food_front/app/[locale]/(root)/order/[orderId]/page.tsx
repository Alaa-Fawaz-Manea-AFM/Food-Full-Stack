import { Link } from "@/i18n/navigation";
import { AxiosServer } from "@/lib/axios-server";
import { IOrderItem } from "@/types";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
// import Link from "next/link";
import { FaUtensils, FaClock, FaTruck, FaCheckCircle } from "react-icons/fa";

const getOrderDetails = async (orderId: string) => {
  try {
    const { data } = await AxiosServer("get", `orders/${orderId}`);
    return data?.data;
  } catch (error) {
    return null;
  }
};

const OrderTrackingPage = async ({
  params,
}: {
  params: { orderId: string };
}) => {
  const t = await getTranslations("OrderTrackingPage");
  const { orderId } = await params;
  const order = await getOrderDetails(orderId);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center dark:bg-secondary bg-primary p-4">
        <h2 className="text-2xl font-bold mb-4">{t("orderNotFound")}</h2>
        <Link
          href="/menu"
          className="px-6 py-2.5 bg-custom-green text-white font-bold rounded-xl text-sm"
        >
          {t("backToMenu")}
        </Link>
      </div>
    );
  }

  const statusSteps = [
    {
      key: "PENDING",
      label: "Order Placed",
      icon: FaClock,
      color: "text-amber-500",
    },
    {
      key: "PREPARING",
      label: "Preparing Food",
      icon: FaUtensils,
      color: "text-blue-500",
    },
    {
      key: "OUT_FOR_DELIVERY",
      label: "Out for Delivery",
      icon: FaTruck,
      color: "text-indigo-500",
    },
    {
      key: "DELIVERED",
      label: "Delivered",
      icon: FaCheckCircle,
      color: "text-emerald-500",
    },
  ];

  const currentStatusIndex = statusSteps.findIndex(
    (step) => step.key === order.status,
  );

  return (
    <div className="min-h-screen pt-32 pb-16 dark:bg-secondary bg-primary transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-5 gap-4">
          <div>
            <span className="text-xs font-bold text-custom-green uppercase tracking-widest block mb-1">
              {t("liveTracking")}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white truncate max-w-md">
              {t("orderId")}:{" "}
              <span className="text-zinc-500 text-sm sm:text-base font-semibold">
                {order.id}
              </span>
            </h1>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs text-zinc-400">{t("paymentMethod")}</p>
            <span className="text-sm font-bold uppercase bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-md text-zinc-700 dark:text-zinc-300">
              {t(order.paymentMethod)}
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStatusIndex;
              const isCurrent = index === currentStatusIndex;

              return (
                <div
                  key={step.key}
                  className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 relative z-10"
                >
                  <div
                    className={`p-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                      isCompleted
                        ? "bg-custom-green/10 border-custom-green text-custom-green"
                        : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400"
                    } ${isCurrent ? "ring-4 ring-custom-green/20 scale-105" : ""}`}
                  >
                    <Icon
                      size={22}
                      className={isCurrent ? "animate-pulse" : ""}
                    />
                  </div>

                  <div>
                    <p
                      className={`text-sm font-bold ${isCompleted ? "text-zinc-950 dark:text-white" : "text-zinc-400"}`}
                    >
                      {t(`status.${step.key}`)}
                    </p>
                    {isCurrent && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-custom-green bg-custom-green/10 px-1.5 py-0.5 rounded mt-1 inline-block">
                        {t(`active`)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2">
              {t("itemsOrdered")}
            </h3>
            <div className="space-y-3">
              {order.items?.map((item: IOrderItem) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-white dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-900 p-3 rounded-xl shadow-2xs"
                >
                  <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 flex-shrink-0 bg-zinc-50 dark:bg-zinc-950">
                    <Image
                      fill
                      src={
                        (item.product?.imageCover as string) ||
                        "/fallback-food.png"
                      }
                      alt={item.product?.title || "Food"}
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                      {item.product?.title}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-zinc-900 dark:text-white">
                      ${item.product?.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3">
              {t("summaryBill")}
            </h3>
            <div className="space-y-2.5 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
              <div className="flex justify-between">
                <p>{t("itemsSubtotal")}</p>
                <span className="text-zinc-900 dark:text-white font-bold">
                  ${order.totalPrice}
                </span>
              </div>
              <div className="flex justify-between">
                <p>{t("deliveryFee")}</p>
                <span className="text-custom-green text-xs font-bold bg-custom-green/10 px-2 py-0.5 rounded">
                  {t("free")}
                </span>
              </div>
              <hr className="border-zinc-100 dark:border-zinc-800 my-2" />
              <div className="flex justify-between items-end">
                <p className="text-base font-bold text-zinc-900 dark:text-white">
                  {t("totalAmountPaid")}
                </p>
                <span className="text-xl font-black text-custom-green">
                  ${order.totalPrice}
                </span>
              </div>
            </div>

            <Link
              href="/menu"
              className="block w-full text-center py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold text-xs tracking-wide transition-all mt-2"
            >
              {t("orderSomethingElse")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackingPage;

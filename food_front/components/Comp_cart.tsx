"use client";
import { ICart } from "@/types";
import ProductDiv from "./ProductDiv";
import { useEffect, useState } from "react";
import { FaShoppingBag, FaMoneyBillWave, FaCreditCard } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import BtnPaginations from "./BtnPaginations";
import AxiosClient from "@/lib/axios-client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/MyState";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const PaymentMethod: {
  ONLINE: string;
  CASH: string;
} = {
  ONLINE: "ONLINE",
  CASH: "CASH",
};

const Comp_cart = ({ carts, page }: { carts: ICart; page: number }) => {
  const t = useTranslations("cartPage");
  const { setUser } = useUserContext();
  const [cart, setCart] = useState<ICart>(carts);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string>(
    PaymentMethod.CASH,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const { totalAmount = 0 } = cart.carts?.reduce(
    (acc, item) => {
      acc.totalAmount += +(item.product.price || 0);
      return acc;
    },
    { totalAmount: 0 },
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCart(carts);
  }, [page, carts]);

  const handlePlaceOrder = async () => {
    try {
      setIsSubmitting(true);

      const orderPayload = {
        items: cart.carts.map((item) => ({
          productId: item.product.id,
          price: item.product.price,
        })),
        totalAmount,
        paymentMethod,
      };

      const { data } = await AxiosClient.post("orders", orderPayload);

      toast.success(
        paymentMethod === PaymentMethod.ONLINE
          ? "Redirecting to Payment..."
          : "Order placed successfully!",
      );
      setIsCheckoutOpen(false);

      setCart((pre) => ({ ...pre, carts: [] }));
      setUser((pre) => {
        if (!pre) return pre;
        return {
          ...pre,
          cartCounts: 0,
        };
      });

      router.push(`/order/${data?.data?.id || ""}`);
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-16 dark:bg-secondary bg-primary transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {cart?.carts?.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center justify-center max-w-md mx-auto space-y-6">
            <div className="p-6 bg-zinc-900/50 rounded-full border border-zinc-800 text-zinc-500 animate-bounce">
              <FaShoppingBag size={50} />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold dark:text-white">
                {t("emptyTitle")}
              </h2>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                {t("emptyDescription")}
              </p>
            </div>
            <Link
              href="/menu"
              className="px-6 py-3 rounded-xl bg-custom-green text-white font-semibold text-sm hover:opacity-90 transition-all"
            >
              {t("discoverProducts")}
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-10 pb-5 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-end">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold dark:text-white text-zinc-950">
                  {t("title")}
                </h1>
                <p className="text-sm text-zinc-400 dark:text-zinc-500 mt-1">
                  {t("review")}
                </p>
              </div>
              <span className="bg-custom-green/10 text-custom-green text-xs font-bold px-3 py-1.5 rounded-lg border border-custom-green/20">
                {cart?.carts?.length} {"  "} {t("items")}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap gap-5 justify-center lg:justify-start">
                  {cart?.carts?.map((car) => (
                    <div key={car.product.id} className="w-full sm:w-auto">
                      <ProductDiv
                        prod={car.product}
                        cart={true}
                        setCart={setCart}
                      />
                    </div>
                  ))}
                </div>
                <BtnPaginations
                  totalPage={cart?.meta?.totalPages || 0}
                  page={page}
                />
              </div>

              <aside className="lg:col-span-4 w-full lg:sticky lg:top-36">
                <div className="backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-900 p-6 shadow-xl space-y-4 bg-white/50 dark:bg-zinc-950/20">
                  <h3 className="text-lg font-bold dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-900">
                    {t("summary")}
                  </h3>
                  <div className="space-y-3 text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                    <div className="flex justify-between items-center">
                      <p>{t("subtotal")}</p>
                      <span className="dark:text-white text-zinc-900 font-bold">
                        ${totalAmount}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>{t("shipping")}</p>
                      <span className="text-custom-green text-xs font-bold bg-custom-green/10 px-2 py-0.5 rounded">
                        {t("free")}
                      </span>
                    </div>
                  </div>
                  <hr className="border-zinc-100 dark:border-zinc-900 my-2" />
                  <div className="flex justify-between items-end mb-4">
                    <p className="text-base font-bold dark:text-white">
                      {t("total")}
                    </p>
                    <span className="text-2xl font-black text-zinc-900 dark:text-white">
                      ${totalAmount}
                    </span>
                  </div>

                  <button
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full py-3.5 rounded-xl bg-custom-green hover:opacity-90 text-zinc-950 font-bold text-sm tracking-wide transition-all cursor-pointer shadow-lg shadow-custom-green/20"
                  >
                    {t("checkout")}
                  </button>

                  <Link
                    href="/menu"
                    className="block text-center text-xs font-bold text-zinc-400 hover:text-white transition-colors pt-2"
                  >
                    {t("continueShopping")}
                  </Link>
                </div>
              </aside>
            </div>
          </>
        )}
      </div>

      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-md rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 shadow-2xl relative space-y-6">
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-red-500 bg-zinc-100 dark:bg-zinc-800 transition-colors"
            >
              <IoMdClose size={20} />
            </button>

            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                {t("modelTitle")}
              </h2>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                {t("modelDescription")}
              </p>
            </div>

            <div className="space-y-3">
              <label
                onClick={() => setPaymentMethod(PaymentMethod.CASH)}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === PaymentMethod.CASH ? "border-custom-green bg-custom-green/5" : "border-zinc-200 dark:border-zinc-800 bg-transparent"}`}
              >
                <div className="flex items-center gap-3">
                  <FaMoneyBillWave
                    size={22}
                    className={
                      paymentMethod === PaymentMethod.CASH
                        ? "text-custom-green"
                        : "text-zinc-400"
                    }
                  />
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">
                      {t("modelCodTitle")}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      {t("modelCodDescription")}
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  checked={paymentMethod === PaymentMethod.CASH}
                  readOnly
                  className="accent-custom-green h-4 w-4"
                />
              </label>

              <label
                onClick={() => setPaymentMethod(PaymentMethod.ONLINE)}
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === PaymentMethod.ONLINE ? "border-custom-green bg-custom-green/5" : "border-zinc-200 dark:border-zinc-800 bg-transparent"}`}
              >
                <div className="flex items-center gap-3">
                  <FaCreditCard
                    size={22}
                    className={
                      paymentMethod === PaymentMethod.ONLINE
                        ? "text-custom-green"
                        : "text-zinc-400"
                    }
                  />
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">
                      {t("modelOnlineTitle")}
                    </p>
                    <p className="text-xs text-zinc-400 dark:text-zinc-500">
                      {t("modelOnlineDescription")}
                    </p>
                  </div>
                </div>
                <input
                  type="radio"
                  checked={paymentMethod === PaymentMethod.ONLINE}
                  readOnly
                  className="accent-custom-green h-4 w-4"
                />
              </label>
            </div>

            <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 space-y-3">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-zinc-500">{t("modelFinalTotal")}</span>
                <span className="text-xl text-custom-green">
                  ${totalAmount}
                </span>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-custom-green text-zinc-950 font-extrabold text-sm shadow-md hover:opacity-90 active:scale-95 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? t("modelProcessing")
                  : paymentMethod === PaymentMethod.ONLINE
                    ? t("modelBtnPayNow")
                    : t("modelBtnConfirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comp_cart;

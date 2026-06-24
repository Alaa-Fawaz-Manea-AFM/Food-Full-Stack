import Link from "next/link";
import Image from "next/image";
import { FaUtensils, FaTruck, FaShieldAlt, FaArrowRight } from "react-icons/fa";
import { heroImage } from "@/public/assets";
import { useLocale, useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("homePage");
  const locale = useLocale();
  const featuredFoods = [
    {
      title: "Classic Cheeseburger",
      price: "$8.99",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "Pepperoni Pizza",
      price: "$14.99",
      img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "Fettuccine Alfredo",
      price: "$12.99",
      img: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen dark:bg-secondary bg-primary transition-colors duration-300">
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div
            className={`lg:col-span-6 space-y-6 text-center ${locale === "ar" ? "lg:text-right" : "lg:text-left"}`}
          >
            <span className="inline-block px-3 py-1.5 bg-custom-green/10 text-custom-green text-xs font-bold rounded-lg uppercase tracking-wider">
              {t("badge")}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-950 dark:text-white leading-tight sm:leading-none">
              {t("title1")}
              <br />
              <span className="text-custom-green">Electro Pi</span>
              {t("title2")}
            </h1>
            <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-lg mx-auto lg:mx-0">
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/menu"
                className="w-full sm:w-auto px-8 py-4 bg-custom-green hover:opacity-95 text-zinc-950 font-extrabold rounded-xl shadow-lg shadow-custom-green/20 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                <span>{t("exploreMenu")}</span>

                <FaArrowRight
                  size={14}
                  className={locale === "ar" ? "rotate-180" : ""}
                />
              </Link>
              <Link
                href="/orders"
                className="w-full sm:w-auto px-8 py-4 border border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-white font-bold rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-center"
              >
                {t("trackOrders")}
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative w-full h-[300px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-zinc-800">
            <Image
              fill
              src={heroImage}
              alt="Delicious Food Table"
              className="object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
      </section>
      <section className="py-16 border-t border-b border-zinc-100 dark:border-zinc-900 bg-white/20 dark:bg-zinc-950/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4 p-4">
            <div className="p-3 bg-custom-green/10 text-custom-green rounded-xl">
              <FaUtensils size={24} />
            </div>
            <div>
              <h3 className="font-bold text-zinc-950 dark:text-white text-base">
                {t("premiumQualityTitle")}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {t("premiumQualityDescription")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4">
            <div className="p-3 bg-custom-green/10 text-custom-green rounded-xl">
              <FaTruck size={24} />
            </div>
            <div>
              <h3 className="font-bold text-zinc-950 dark:text-white text-base">
                {t("superFastDeliveryTitle")}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {t("superFastDeliveryDescription")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4">
            <div className="p-3 bg-custom-green/10 text-custom-green rounded-xl">
              <FaShieldAlt size={24} />
            </div>
            <div>
              <h3 className="font-bold text-zinc-950 dark:text-white text-base">
                {t("securePaymentsTitle")}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                {t("securePaymentsDescription")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-4xl font-black text-zinc-950 dark:text-white">
              {t("popularTitle")}
            </h2>
            <p className="text-sm text-zinc-400 max-w-md mx-auto">
              {t("popularDescription")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredFoods.map((food, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 space-y-4 shadow-xs group"
              >
                <div className="h-48 w-full relative rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950">
                  <Image
                    fill
                    src={food.img}
                    alt={food.title}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-zinc-950 dark:text-white text-sm truncate max-w-[180px]">
                    {food.title}
                  </h3>
                  <span className="text-sm font-black text-custom-green">
                    {food.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-sm font-bold text-custom-green hover:underline"
            >
              <span>{t("viewAll")}</span>
              <FaArrowRight
                size={12}
                className={locale === "ar" ? "rotate-180" : ""}
              />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

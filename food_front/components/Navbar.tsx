"use client";
import { useState } from "react";
import { Bg_Navbar, Btn_Cart, NavLink, Toggle_Navbar } from ".";
// import Link from "next/link";
import BtnDark from "./Btn_Dark";
import { FaGlobe, FaChevronDown } from "react-icons/fa";
import { useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";

const Navbar = () => {
  const [langDropdown, setLangDropdown] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();

  const handleLangChange = (nextLocale: "en" | "ar") => {
    setLangDropdown(false);
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Bg_Navbar>
      <div className="flex items-center gap-2">
        <Toggle_Navbar />
        <Link
          href="/"
          className="flex items-center hover:opacity-90 transition-opacity"
        >
          <span className="text-3xl max-xxs:text-2xl font-semibold hover:underline">
            Online Foodie
          </span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <section className="flex items-center gap-2 max-sm:hidden">
          <NavLink />
        </section>

        <section className="flex items-center gap-2 relative">
          <BtnDark />

          <div className="relative">
            <button
              onClick={() => setLangDropdown(!langDropdown)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold rounded-xl border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-zinc-800 dark:text-zinc-200 shadow-2xs uppercase cursor-pointer"
            >
              <FaGlobe className="text-custom-green" size={14} />
              <span>{currentLocale}</span>
              <FaChevronDown
                size={10}
                className={`transition-transform duration-200 ${langDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {langDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setLangDropdown(false)}
                />
                <div
                  className={`absolute mt-2 w-32 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl py-1 z-50 bg-primary dark:bg-secondary ${
                    currentLocale === "ar" ? "left-0" : "right-0"
                  }`}
                >
                  <button
                    onClick={() => handleLangChange("en")}
                    className={`w-full px-4 py-2 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                      currentLocale === "en"
                        ? "text-custom-green bg-zinc-50/50 dark:bg-zinc-800/30"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    } ${currentLocale === "ar" ? "text-right" : "text-left"}`}
                  >
                    English (EN)
                  </button>
                  <button
                    onClick={() => handleLangChange("ar")}
                    className={`w-full px-4 py-2 text-xs font-bold transition-colors flex items-center justify-between cursor-pointer ${
                      currentLocale === "ar"
                        ? "text-custom-green bg-zinc-50/50 dark:bg-zinc-800/30"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    } ${currentLocale === "ar" ? "text-right" : "text-left"}`}
                  >
                    العربية (AR)
                  </button>
                </div>
              </>
            )}
          </div>

          <Btn_Cart />
        </section>
      </div>
    </Bg_Navbar>
  );
};

export default Navbar;

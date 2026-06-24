"use client";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
const Footer = () => {
  const year = new Date().getFullYear();
  const t = useTranslations("Footer");
  const currentLocale = useLocale();

  return (
    <footer className="mx-auto w-full border border-gray-200 dark:border-zinc-800 dark:bg-secondary pb-4 transition-colors duration-300">
      <section className="container px-5 py-4 mx-auto flex items-center sm:flex-row flex-col">
        <Link href="/" className="flex group">
          <h1 className="text-2xl font-bold px-3 py-1 text-black dark:text-white transition-colors duration-200 group-hover:text-custom-green">
            {t("logo")}
          </h1>
        </Link>

        <p className="text-sm font-medium text-gray-500 dark:text-zinc-400 sm:mt-0 mt-4 sm:mx-6 flex flex-wrap items-center justify-center gap-1">
          <span>
            © {year} {t("logo")} —
          </span>
          <Link
            href="/"
            className="text-gray-700 dark:text-zinc-300 hover:text-custom-green dark:hover:text-custom-green transition-colors duration-200 font-semibold"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.Foodie.com
          </Link>
          <span className="text-gray-300 dark:text-zinc-700 mx-1">|</span>
          <span>{t("rights")}</span>
        </p>

        <span
          className={`inline-flex sm:mt-0 mt-4 justify-center sm:justify-start ${
            currentLocale === "ar" ? "sm:mr-auto" : "sm:ml-auto"
          }`}
        >
          <div className="flex gap-4 items-center text-gray-500 dark:text-zinc-400">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black dark:hover:text-white hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Twitter"
            >
              <FaXTwitter size={22} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 dark:hover:text-pink-400 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 dark:hover:text-blue-400 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </span>
      </section>
    </footer>
  );
};

export default Footer;

"use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { ICategory } from "@/types";
import { useUserContext } from "@/context/MyState";
import AxiosClient from "@/lib/axios-client";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

const Filter = () => {
  const t = useTranslations("filter");
  const { category, setCategory } = useUserContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("categoryId") || "",
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearch(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("categoryId") || "");
  }, [searchParams]);

  const updateFilters = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleApplyFilters = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({
      search: search.trim(),
      categoryId: selectedCategory,
    });
  };

  const handleClearSearch = () => {
    setSearch("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetAllFilters = () => {
    setSearch("");
    setSelectedCategory("");
    router.push(pathname);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await AxiosClient.get("filter");
        setCategory(data?.data || []);
      } catch {
        setCategory([]);
      }
    };

    if (category.length > 0) return;
    fetchUser();
  }, []);

  return (
    <div className="border border-custom-green dark:border-custom-green p-6 rounded-2xl shadow-xl max-w-2xl mx-auto mt-5 bg-primary dark:bg-secondary transition-all">
      <form onSubmit={handleApplyFilters}>
        <div className="border border-custom-green text-custom-green w-full p-2.5 rounded-xl font-medium bg-primary dark:bg-transparent items-center flex transition-all focus-within:ring-2 focus-within:ring-custom-green">
          <CiSearch size={28} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("searchPlaceholder")}
            type="text"
            className="w-full outline-none border-none p-2 font-medium bg-transparent text-black dark:text-white"
          />
          {search && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="cursor-pointer mr-1"
            >
              <IoMdClose
                size={22}
                className="text-custom-gray hover:text-black dark:hover:text-custom-gray"
              />
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="w-full sm:w-1/2">
            <select
              value={selectedCategory}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedCategory(val);
              }}
              className="border border-custom-green dark:border-custom-gray dark:bg-custom-gray px-4 py-3.5 w-full rounded-xl outline-0 text-sm font-medium cursor-pointer bg-transparent text-black dark:text-white"
            >
              <option
                value=""
                className="bg-primary dark:bg-custom-gray text-black dark:text-white"
              >
                {t("allCategories")}
              </option>
              {category?.map((cate: ICategory) => (
                <option
                  key={cate.id}
                  value={cate.id}
                  className="bg-primary dark:bg-custom-gray text-black dark:text-white"
                >
                  {cate.category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-end gap-4 w-full sm:w-auto">
            <button
              type="button"
              onClick={resetAllFilters}
              className="text-sm font-bold text-gray-400 hover:text-red-500 transition-colors rounded-xl cursor-pointer py-2 px-3"
            >
              {t("resetFilters")}
            </button>

            <button
              type="submit"
              className="bg-custom-green hover:bg-custom-green/90 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
            >
              {t("applySearch")}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filter;

"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useTranslations } from "next-intl";

const ComSearchAdmin = () => {
  const t = useTranslations("sersh");
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSearch = searchParams.get("search") || "";
  const [searchValue, setSearchValue] = useState(currentSearch);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSearchValue(currentSearch);
  }, [currentSearch]);

  const executeSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }

    router.push(`?${params.toString()}`);
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeSearch(searchValue);
    }
  };

  const handleClear = () => {
    setSearchValue("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex w-full items-center gap-2 border border-custom-green rounded-xl px-3 bg-primary dark:bg-secondary transition-all relative">
      <button
        name="btn search"
        type="button"
        onClick={() => executeSearch(searchValue)}
        className="text-zinc-400 hover:text-custom-green transition-colors cursor-pointer shrink-0"
      >
        <CiSearch name="icn search" size={22} />
      </button>

      <input
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          if (!e.target.value.trim()) {
            const params = new URLSearchParams(searchParams.toString());
            params.delete("search");
            router.push(`?${params.toString()}`);
          }
        }}
        onKeyUp={handleKeyUp}
        placeholder={t("placeholder")}
        type="text"
        className="w-full outline-none py-3 pr-8 font-medium bg-transparent text-sm text-zinc-800 dark:text-zinc-200"
      />

      {searchValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 p-1 rounded-full text-zinc-400 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer flex items-center justify-center animate-fade-in"
        >
          <IoMdClose size={16} />
        </button>
      )}
    </div>
  );
};

export default ComSearchAdmin;

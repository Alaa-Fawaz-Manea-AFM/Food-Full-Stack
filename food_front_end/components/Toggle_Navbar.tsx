"use client";
import { IoMenuSharp } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import NavLink from "./NavLink";
import { useLocale } from "next-intl";

const Toggle_Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const currentLocale = useLocale();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <section className="flex text-lg sm:hidden relative cursor-pointer">
      <span onClick={handleToggle} className="z-20">
        {toggle ? <IoMdClose size={30} /> : <IoMenuSharp size={30} />}
      </span>

      {toggle && (
        <div
          className="fixed inset-0 z-10 h-screen bg-black/5 dark:bg-black/20"
          onClick={handleToggle}
        />
      )}

      <div
        className={`sidebar absolute top-10 my-2 w-52 z-20 rounded-xl dark:bg-secondary bg-primary p-5 border border-zinc-100 dark:border-zinc-800 shadow-xl transition-all duration-200 ${
          !toggle ? "hidden opacity-0 pointer-events-none" : "block opacity-100"
        } ${currentLocale === "ar" ? "-right-5 mx-2" : "-left-5 mx-4"}`}
      >
        <div className="flex flex-col gap-4">
          <NavLink />
        </div>
      </div>
    </section>
  );
};

export default Toggle_Navbar;

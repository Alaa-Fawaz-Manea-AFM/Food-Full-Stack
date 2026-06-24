"use client";
import { useEffect, useState } from "react";

const Bg_Navbar = ({ children }: { children: React.ReactNode }) => {
  const [scroll, setScroll] = useState(false);

  const handleScroll = () => {
    setScroll(window.pageYOffset !== 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${
        scroll ? "shadow-lg dark:bg-secondary bg-primary" : "bg-transparent"
      } fixed z-50 top-0 left-1/2 -translate-x-1/2 w-full max-w-screen-xl flex items-center justify-between max-xs:px-4 px-7 py-4 select-none`}
    >
      {children}
    </header>
  );
};

export default Bg_Navbar;

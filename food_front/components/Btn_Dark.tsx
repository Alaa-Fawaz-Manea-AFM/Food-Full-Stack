"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdOutlineWbSunny, MdOutlineDarkMode } from "react-icons/md";

const BtnDark = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10 rounded-xl" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-2 rounded-xl dark:border-gray-800 bg-primary dark:bg-zinc-900 text-gray-700 dark:text-primary hover:bg-primary dark:hover:bg-zinc-800 transition-all duration-300 shadow-sm active:scale-95 cursor-pointer flex items-center justify-center group overflow-hidden"
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {isDark ? (
          <MdOutlineWbSunny
            size={24}
            className="text-amber-500 transition-transform duration-300 rotate-0 group-hover:rotate-45"
          />
        ) : (
          <MdOutlineDarkMode
            size={24}
            className="text-slate-700 transition-transform duration-300 rotate-0 group-hover:-rotate-12"
          />
        )}
      </div>
    </button>
  );
};

export default BtnDark;

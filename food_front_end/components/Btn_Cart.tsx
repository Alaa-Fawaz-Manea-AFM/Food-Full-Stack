"use client";
import { useUserContext } from "@/context/MyState";
import { FaCartPlus } from "react-icons/fa";
import Link from "next/link";

const Btn_Cart = () => {
  const { user } = useUserContext();

  return (
    <Link
      href={user ? "/cart" : ""}
      className="flex items-center relative cursor-pointer"
    >
      <FaCartPlus size={30} />
      <span className="absolute z-10 right-0 -top-4 rounded-full font-semibold">
        {user?.cartCounts}
      </span>
    </Link>
  );
};

export default Btn_Cart;

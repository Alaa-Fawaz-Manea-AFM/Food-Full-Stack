"use client";
import { useUserContext } from "@/context/MyState";
import { FaPowerOff } from "react-icons/fa";
import { ROLE_ADMIN } from "@/constant/api";
import { Avatar } from "@/public/assets";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import AxiosClient from "@/lib/axios-client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const NavLink = () => {
  const t = useTranslations("Navbar");
  const { user, setUser } = useUserContext();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await AxiosClient.post("auth/logout");
      setUser(null);
      router.refresh();
    } catch {
      toast.error("Sign Out Failed");
    }
    return;
  };

  return (
    <>
      <Link href="/menu" className="font-medium hover:underline">
        {t("menu")}
      </Link>
      {user && (
        <Link href="/order" className="font-medium hover:underline">
          {t("orders")}
        </Link>
      )}
      {user?.name ? (
        <div className="flex gap-2 items-start flex-col sm:flex-row sm:items-center">
          {user?.role === ROLE_ADMIN ? (
            <>
              <Link href="/admin" className="font-medium hover:underline">
                {t("admin")}
              </Link>
              <Link
                href="/admin/category"
                className="font-medium hover:underline max-sm:block ml-2"
              >
                {t("category")}
              </Link>
            </>
          ) : (
            ""
          )}
          <span
            onClick={handleSignOut}
            className="font-medium hover:underline cursor-pointer"
          >
            <FaPowerOff size={25} color="red" />
          </span>
          <div className="flex items-center gap-1">
            Hi,
            {user?.name}
            <div className="w-7 h-7 object-contain flex items-center font-semibold justify-center bg-custom-green rounded-full">
              {user?.name?.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-start flex-col sm:flex-row sm:items-center">
          <Link href="/log-in" className="font-medium hover:underline">
            {t("login")}
          </Link>
          <Link href="/sign-up" className="font-medium hover:underline">
            {t("signup")}
          </Link>
          <div className="flex items-center gap-2">
            {t("guest")}
            <Image
              width={32}
              height={32}
              src={Avatar}
              alt="avatar"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NavLink;

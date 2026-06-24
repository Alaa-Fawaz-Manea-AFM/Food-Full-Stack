// import { redirect } from "next/navigation";

import { redirect } from "@/i18n/navigation";
import { useLocale } from "next-intl";

const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
  let userId;
  if (typeof window !== "undefined") {
    userId = JSON.parse(localStorage.getItem("user")!);
  }
  const locale = useLocale();

  if (userId)
    return redirect({
      href: "/",
      locale,
    });
  return <>{children}</>;
};

export default LayoutAuth;

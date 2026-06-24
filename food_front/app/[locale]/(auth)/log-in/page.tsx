import { InputLogIn } from "@/constant/Constant";
import { Form_log_In_Up } from "@/components";
import { Metadata } from "next";
// import Link from "next/link";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Log In",
  description: "Foodie Online Log In Page",
};

const LoginPage = () => {
  const t = useTranslations("Auth");
  return (
    <div className="dark:bg-secondary dark:text-white bg-primary text-secondary flex items-center flex-col w-full h-screen">
      <div className="dark:border-custom-green border-secondary border mt-40 absolute max-xs:px-5 px-8 pt-5 pb-5 flex flex-col gap-5 max-ss:w-4/5 ss:w-lg rounded-2xl">
        <Link
          href="/"
          className="text-3xl w-fit mx-auto font-semibold hover:underline"
        >
          {t("brand")}
        </Link>
        <h2 className="text-3xl text-center">{t("login")}</h2>
        <Form_log_In_Up title="Log In" InputLog_In_Up={InputLogIn} />
        <section className="flex items-center gap-2">
          {t("dontHaveAccount")}

          <Link href="/sign-up" className="text-custom-red font-semibold ml-1">
            {t("signUp")}
          </Link>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;

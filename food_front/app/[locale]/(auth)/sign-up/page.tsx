import { InputSignUp } from "@/constant/Constant";
import { Form_log_In_Up } from "@/components";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Foodie Online Sign Up Page",
};

const SignUpPage = async () => {
  const t = await getTranslations("Auth");

  return (
    <div className="flex justify-center items-center dark:bg-secondary dark:text-white bg-primary text-secondary w-full h-screen">
      <section className="dark:border-custom-green border-secondary border absolute max-xs:px-5 px-8 py-5 flex flex-col gap-5 max-ss:w-4/5 ss:w-lg rounded-2xl">
        <Link
          href="/"
          className="text-3xl w-fit mx-auto font-semibold hover:underline"
        >
          {t("brand")}
        </Link>

        <h2 className="text-3xl text-center">{t("signUp")}</h2>

        <Form_log_In_Up title="Sign Up" InputLog_In_Up={InputSignUp} />

        <section className="flex items-center gap-2">
          {t("alreadyHaveAccount")}

          <Link href="/log-in" className="text-custom-red font-semibold ml-1">
            {t("login")}
          </Link>
        </section>
      </section>
    </div>
  );
};

export default SignUpPage;

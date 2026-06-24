"use client";
import { handle_LogIn_And_SignUp } from "@/constant/api";
import { useUserContext } from "@/context/MyState";
import { Loader_icon } from "@/public/assets";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IForm } from "@/types";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

type IForm_log_In_Up = {
  title: "Log In" | "Sign Up";
  InputLog_In_Up: {
    type: string;
    name: string;
  }[];
};

const Form_log_In_Up = ({ title, InputLog_In_Up }: IForm_log_In_Up) => {
  const { setUser } = useUserContext();
  const [disable, setDisable] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  const t = useTranslations("Auth");
  const currentLocale = useLocale();

  const [form, setForm] = useState<IForm>({
    name: "",
    email: "",
    password: "",
  });

  const password = form.password || "";
  const hasThreeDigits = (password.match(/\d/g) || []).length >= 3;
  const hasThreeUpper = (password.match(/[A-Z]/g) || []).length >= 3;
  const hasThreeLower = (password.match(/[a-z]/g) || []).length >= 3;

  const fulfilledCount = [hasThreeDigits, hasThreeUpper, hasThreeLower].filter(
    Boolean,
  ).length;

  let strengthLabel = "";
  let strengthColor = "bg-zinc-600";
  let strengthWidth = "w-0";

  if (password.length > 0) {
    if (fulfilledCount === 1) {
      strengthLabel = t("strengthLow");
      strengthColor = "bg-custom-red";
      strengthWidth = "w-1/3";
    } else if (fulfilledCount === 2) {
      strengthLabel = t("strengthMedium");
      strengthColor = "bg-orange-500";
      strengthWidth = "w-2/3";
    } else if (fulfilledCount === 3) {
      strengthLabel = t("strengthStrong");
      strengthColor = "bg-custom-green";
      strengthWidth = "w-full";
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((pre: IForm) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.password || !form.email || (!form?.name && title === "Sign Up"))
      return toast.error(t("fillAllFields"));
    if (title === "Sign Up" && fulfilledCount < 3) {
      toast.error(t("passwordRequirementsError"));
      return;
    }

    return handle_LogIn_And_SignUp(form, router, setDisable, setUser, title);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {InputLog_In_Up.map((item) => (
        <div key={item.name} className="w-full flex flex-col gap-2">
          <div className="relative w-full flex items-center">
            <input
              type={
                item.name === "password"
                  ? showPassword
                    ? "text"
                    : "password"
                  : item.type
              }
              name={item.name}
              value={form[item.name as keyof IForm]}
              onChange={handleChange}
              placeholder={t(`placeholders.${item.name}`)}
              className={`border border-custom-green dark:bg-custom-gray bg-primary outline-0 sm:text-sm rounded-lg w-full p-2.5 ${
                currentLocale === "ar" ? "pl-10 pr-2.5" : "pr-10 pl-2.5"
              }`}
            />

            {item.name === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={`absolute text-custom-green hover:text-green duration-200 cursor-pointer focus:outline-none select-none ${
                  currentLocale === "ar" ? "left-3" : "right-3"
                }`}
              >
                {showPassword ? (
                  <EyeOff size={20} className="w-5 h-5" />
                ) : (
                  <Eye size={20} className="w-5 h-5" />
                )}
              </button>
            )}
          </div>

          {item.name === "password" &&
            title === "Sign Up" &&
            password.length > 0 && (
              <div className="mt-1 space-y-2 p-3 rounded-lg border border-zinc-800 dark:bg-zinc-900/30 text-xs">
                <div className="flex justify-between items-center font-semibold">
                  <span className="text-gray_tx">{t("passwordStrength")}:</span>
                  <span
                    className={
                      fulfilledCount === 1
                        ? "text-red-500"
                        : fulfilledCount === 2
                          ? "text-orange-500"
                          : "text-custom-green"
                    }
                  >
                    {strengthLabel}
                  </span>
                </div>

                <div className="w-full h-1.5 bg-zinc-700/40 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strengthColor} ${strengthWidth} duration-300 transition-all`}
                  />
                </div>

                <div className="pt-1 space-y-1">
                  <div
                    className={`${hasThreeDigits ? "text-custom-green" : "text-red-500"} flex items-center gap-2`}
                  >
                    <span>{hasThreeDigits ? "✓" : "✗"}</span>
                    <span>{t("reqDigits")}</span>
                  </div>

                  <div
                    className={`${hasThreeUpper ? "text-custom-green" : "text-red-500"} flex items-center gap-2`}
                  >
                    <span>{hasThreeUpper ? "✓" : "✗"}</span>
                    <span>{t("reqUppercase")}</span>
                  </div>

                  <div
                    className={`${hasThreeLower ? "text-custom-green" : "text-red-500"} flex items-center gap-2`}
                  >
                    <span>{hasThreeLower ? "✓" : "✗"}</span>
                    <span>{t("reqLowercase")}</span>
                  </div>
                </div>
              </div>
            )}
        </div>
      ))}

      <button
        disabled={disable || (title === "Sign Up" && fulfilledCount < 3)}
        type="submit"
        className={`${
          disable || (title === "Sign Up" && fulfilledCount < 3)
            ? "cursor-not-allowed opacity-50"
            : ""
        } hover:shadow-[inset_0_0_8px_rgb(250,245,255)] border-b-4 border-custom-green bg-dark-admin text-custom-green rounded-lg text-xl hover:shadow-custom-green text-center mb-2 w-full font-bold px-2 py-2 flex items-center gap-3 justify-center`}
      >
        {disable && (
          <Image
            src={Loader_icon}
            alt="loader icon"
            width={20}
            height={20}
            unoptimized
          />
        )}
        {title === "Log In" ? t("login") : t("signUp")}
      </button>
    </form>
  );
};

export default Form_log_In_Up;

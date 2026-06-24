"use client";
import { ChangeEvent, useEffect, useState } from "react";
import { addProduct, updateProduct } from "@/constant/api";
import { Loader_icon, file_upload } from "@/public/assets";
import { adminAddData } from "@/constant/Constant";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation";
import { IPartialProduct, IProduct } from "@/types";
import Image from "next/image";
import { useUserContextAdmin } from "@/context/AdminMyState";
import AxiosClient from "@/lib/axios-client";
import { useTranslations } from "next-intl";

const obj = {
  title: "",
  price: "",
  imageCover: "",
  category: {
    id: "",
    category: "",
  },
  desc: "",
};

const Form_add_And_Update_Prod = ({
  title,
  menu,
}: {
  title: "Update" | "Add";
  menu_id?: string;
  menu?: IPartialProduct;
}) => {
  const t = useTranslations("ProductFormPage");
  const { setProducts, category, setCategory, setAdminCounts } =
    useUserContextAdmin();
  const router = useRouter();

  const [disableBtn, setDisableBtn] = useState(false);
  const [productObj, setProductObj] = useState<IPartialProduct>(obj);

  useEffect(() => {
    if (title === "Update") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProductObj(menu || obj);
    }
  }, [menu, title]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title == "Update") {
      return await updateProduct(
        router,
        productObj,
        setDisableBtn,
        setProducts,
      );
    }
    return await addProduct(
      router,
      productObj,
      setDisableBtn,
      setProducts,
      setAdminCounts,
    );
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await AxiosClient.get("categories");
        setCategory(data?.data || []);
      } catch {
        setCategory([]);
      }
    };

    if (category.length > 0) return;
    fetchUser();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {adminAddData?.map((add) => (
              <div
                key={add.name}
                className={`flex flex-col gap-1.5 ${
                  add.name === "title" ? "sm:col-span-2" : "col-span-1"
                }`}
              >
                <span className="text-xs font-semibold uppercase tracking-wider px-1">
                  {t(add.name)}
                </span>
                {!add.select ? (
                  <input
                    autoFocus={add.auto}
                    type={add.type}
                    name={add.name}
                    onChange={(e) =>
                      setProductObj((pre: IPartialProduct) => ({
                        ...pre,
                        [add.name]: e.target.value,
                      }))
                    }
                    value={productObj[add?.name as keyof IProduct] as string}
                    className="dark:bg-custom-gray border border-custom-green outline-none sm:text-sm rounded-xl w-full p-3 transition-all duration-200 shadow-2xs"
                    placeholder={t(`enter${add.name}`)}
                  />
                ) : (
                  <select
                    aria-label="select category"
                    value={productObj.category?.id || ""}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      const selectedId = e.target.value;

                      if (!selectedId) {
                        setProductObj((pre: IPartialProduct) => ({
                          ...pre,
                          [add.name]: null,
                        }));
                        return;
                      }

                      const foundCategory = category.find(
                        (cat) => cat.id === selectedId,
                      );

                      if (foundCategory) {
                        setProductObj((pre: IPartialProduct) => ({
                          ...pre,
                          [add.name]: {
                            id: foundCategory.id,
                            category: foundCategory.category,
                          },
                        }));
                      }
                    }}
                    className="dark:bg-custom-gray border border-custom-green  outline-none sm:text-sm rounded-xl w-full p-3 transition-all duration-200 shadow-2xs"
                  >
                    <option value="">{t("allCategories")}</option>
                    {category?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.category}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-1">
              {t("description")}
            </span>
            <textarea
              value={productObj?.desc}
              cols={30}
              rows={6}
              name="desc"
              onChange={(e) =>
                setProductObj((pre: IPartialProduct) => ({
                  ...pre,
                  desc: e.target.value,
                }))
              }
              className="min-h-36 max-h-64 dark:bg-custom-gray border border-custom-green  outline-none sm:text-sm rounded-xl w-full p-3 transition-all duration-200 shadow-2xs"
              placeholder={t("writeDescription")}
            />
          </div>
        </div>

        <div className="lg:col-span-5 bg-zinc-50/50 dark:bg-custom-gray p-5 rounded-2xl border border-zinc-200 dark:border-custom-gray space-y-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-1 block">
            {t("productImage")} ({productObj.imageCover ? 1 : 0}/1)
          </span>

          {!productObj.imageCover ? (
            <label
              htmlFor="fillImage"
              className="h-52 w-full border-2 border-dashed rounded-xl items-center justify-center flex-col flex gap-3 cursor-pointer transition-all duration-300 border-zinc-300 dark:border-zinc-700 hover:border-custom-green dark:hover:border-custom-green dark:bg-zinc-950/40 shadow-2xs"
            >
              <div className="p-3 dark:bg-custom-gray rounded-xl shadow-xs border border-zinc-200 dark:border-custom-gray">
                <Image
                  width={36}
                  height={36}
                  src={file_upload}
                  alt="file_upload"
                  className="opacity-80"
                  unoptimized
                />
              </div>
              <div className="text-center px-4">
                <p className="text-sm font-medium">
                  {t("clickToBrowse")}{" "}
                  <span className="text-custom-green underline">
                    {t("browse")}
                  </span>{" "}
                  {t("andUpload")}
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                  {t("supportedFormats")}
                </p>
              </div>

              <input
                id="fillImage"
                type="file"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setProductObj((pre: IPartialProduct) => ({
                      ...pre,
                      imageCover: e.target.files![0],
                    }));
                  }
                }}
                className="sr-only"
              />
            </label>
          ) : (
            <div className="h-52 w-full relative border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xs group transition-all duration-200">
              <Image
                fill
                unoptimized
                alt="preview"
                src={
                  typeof productObj.imageCover === "string"
                    ? productObj.imageCover
                    : URL.createObjectURL(productObj.imageCover)
                }
                className="object-cover"
              />

              <button
                type="button"
                onClick={() =>
                  setProductObj((pre: IPartialProduct) => ({
                    ...pre,
                    imageCover: "",
                  }))
                }
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-red-400 hover:text-red-500 hover:bg-black/80 backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <MdDeleteForever size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-6 border-t border-zinc-200 dark:border-zinc-800">
        <button
          disabled={disableBtn}
          type="submit"
          className={`${
            disableBtn
              ? "cursor-not-allowed opacity-50"
              : "hover:scale-[1.01] hover:shadow-custom-green/20"
          } border-b-4 border-emerald-700 bg-custom-green text-zinc-950 font-bold text-md rounded-xl shadow-md text-center transition-all duration-200 w-full sm:w-52 px-6 py-3 flex items-center gap-3 justify-center`}
        >
          {disableBtn && (
            <Image
              src={Loader_icon}
              alt="loader icon"
              width={18}
              height={18}
              className="animate-spin"
              unoptimized
            />
          )}
          {title === "Add" ? t("addProductBtn") : t("updateProductBtn")}
        </button>
      </div>
    </form>
  );
};

export default Form_add_And_Update_Prod;

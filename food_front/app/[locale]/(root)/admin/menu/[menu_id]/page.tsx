import { Form_add_And_Update_Prod } from "@/components";
import { AiOutlineClose } from "react-icons/ai";
import { Metadata } from "next";
// import Link from "next/link";
import { AxiosServer } from "@/lib/axios-server";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export const metadata: Metadata = {
  title: "Update Product",
  description: "Ecommerce Update Product Page",
};

type IUpdateProd = { params: { menu_id: string } };

const UpdateProductPage = async ({ params }: IUpdateProd) => {
  const t = await getTranslations("UpdateProductPage");
  const { menu_id } = await params;
  let data;
  try {
    data = await AxiosServer("get", `admin-dashboard/${menu_id}`);
  } catch {
    redirect("/admin");
  }

  return (
    <div className="w-full min-h-screen dark:bg-secondary dark:text-white bg-primary py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-custom-green shadow-xs">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight from-custom-green to-emerald-400 bg-clip-text text-transparent">
            {t("title")}
          </h1>

          <Link
            aria-label="close"
            href="/admin"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl border border-custom-green transition-colors"
          >
            <AiOutlineClose className="h-4 w-4" />
            {t("exit")}
          </Link>
        </div>

        <Form_add_And_Update_Prod
          title="Update"
          menu_id={menu_id}
          menu={data?.data?.data}
        />
      </div>
    </div>
  );
};

export default UpdateProductPage;

"use client";
import { AdminUsers, AdminOrders, AdminProduct } from "@/components";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { adminTab } from "@/constant/Constant";
import { FaUserTie } from "react-icons/fa";
import { ISearchParams } from "@/types";
import { useUserContextAdmin } from "@/context/AdminMyState";
import { useEffect } from "react";
import AxiosClient from "@/lib/axios-client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const Comp_admin = ({ page, search }: ISearchParams) => {
  const t = useTranslations("AdminPage");
  const { AdminCounts, setAdminCounts } = useUserContextAdmin();

  useEffect(() => {
    const fetchAdminDashboardCounts = async () => {
      if (AdminCounts !== null) return;

      const { data } = await AxiosClient.get("admin-dashboard");
      setAdminCounts(data?.data);
    };

    fetchAdminDashboardCounts();
  }, []);

  const {
    orderCounts = 0,
    userCounts = 0,
    productCounts = 0,
  } = AdminCounts || {};

  return (
    <div className="overflow-y-auto body-font">
      <div className="container px-5 mx-auto mb-10 flex justify-center flex-wrap -m-4 text-center">
        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <section className="font-medium border-b-4 hover:shadow-[inset_0_0_8px_rgb(250,245,255)] transition-all duration-300 ease-in-out hover:shadow-custom-purple border-custom-purple text-custom-purple rounded-lg text-xl px-5 py-1.5 text-center bg-dark-admin">
            <span className="w-12 h-12 mb-3 inline-block">
              <FaUserTie size={50} />
            </span>
            <h2 className="title-font dark:text-white text-secondary font-medium text-3xl">
              {productCounts}
            </h2>
            <p>{t("totalProducts")}</p>
          </section>
        </div>
        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <section
            className="
          hover:shadow-[inset_0_0_8px_rgb(250,245,255)] transition-all duration-300 ease-in-out font-medium border-b-4 border-custom-pink text-custom-pink hover:shadow-custom-pink rounded-lg text-xl px-5 py-1.5 text-center bg-dark-admin"
          >
            <span className="w-12 h-12 mb-3 inline-block">
              <FaUserTie size={50} />
            </span>
            <h2 className="title-font dark:text-white text-secondary font-medium text-3xl">
              {orderCounts}
            </h2>
            <p>{t("totalOrders")}</p>
          </section>
        </div>
        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <section
            className="hover:shadow-[inset_0_0_8px_rgb(250,245,255)] transition-all duration-300 ease-in-out text-center 
          font-medium border-b-4 border-custom-green text-custom-green rounded-lg text-xl hover:shadow-custom-green  px-5 py-1.5 text-centers bg-dark-admin"
          >
            <div className="w-12 h-12 mb-3 inline-block">
              <FaUserTie size={50} />
            </div>
            <h2 className="title-font font-medium dark:text-white text-secondary text-3xl fonts1">
              {userCounts}
            </h2>
            <p>{t("totalUsers")}</p>
          </section>
        </div>
      </div>
      <div className="container max-w-[1400px] mx-auto mt-10">
        <Tabs defaultIndex={0}>
          <TabList className="flex items-center justify-center flex-wrap md:space-x-8 text-center gap-4 mb-10">
            {adminTab?.map((tab, index) => (
              <Tab key={index}>
                <div
                  className={`${tab.class} 
                  hover:shadow-[inset_0_0_8px_rgb(250,245,255)] transition-all duration-300 ease-in-out font-medium border-b-2 rounded-lg text-xl px-5 py-1.5 text-center cursor-pointer bg-dark-admin`}
                >
                  <Link href="/admin" className="flex gap-2 items-center">
                    <span>{tab.icon}</span>
                    <span>{t(tab.title)}</span>
                  </Link>
                </div>
              </Tab>
            ))}
          </TabList>
          <TabPanel>
            <AdminProduct page={Number(page)} search={search!} />
          </TabPanel>
          <TabPanel>
            <AdminOrders page={Number(page)} />
          </TabPanel>
          <TabPanel>
            <AdminUsers page={Number(page)} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Comp_admin;

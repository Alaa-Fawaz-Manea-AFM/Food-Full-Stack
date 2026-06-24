"use client";
import { adminTabPanelUser } from "@/constant/Constant";
import { ISearchParams } from "@/types";
import BtnPaginations from "./BtnPaginations";
import { useUserContextAdmin } from "@/context/AdminMyState";
import { useEffect } from "react";
import AxiosClient from "@/lib/axios-client";
import { formatDate } from "@/constant/api";
import { useTranslations } from "next-intl";

const AdminUsers = ({ page = 1 }: ISearchParams) => {
  const t = useTranslations("AdminUsersPage");
  const { users, setUsers } = useUserContextAdmin();

  useEffect(() => {
    const fetchUser = async () => {
      if (users?.meta?.page === page) return;

      try {
        const apiUrl = `admin-dashboard/users?page=${page}`;
        const { data } = await AxiosClient.get(apiUrl);
        setUsers(data?.data);
      } catch (error) {
        console.error("Failed to fetch admin users:", error);
      }
    };

    fetchUser();
  }, [page]);

  return (
    <div className="w-[95%] md:w-[90%] mx-auto mt-6">
      <div className="w-full overflow-x-auto rounded-2xl border border-custom-green shadow-xl">
        <table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400 border-collapse">
          <thead className="text-xs uppercase border-b border-custom-green">
            <tr>
              {adminTabPanelUser?.map((tab) => (
                <th
                  key={tab}
                  scope="col"
                  className="px-6 py-4 font-bold tracking-wider"
                >
                  {t(`table.${tab}`)}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60">
            {users?.users?.map((user, i) => {
              const { id, name, email, createdAt } = user;

              return (
                <tr key={id} className="transition-colors duration-150">
                  <td className="px-6 py-4 font-semibold text-zinc-400 dark:text-zinc-600 w-16">
                    {++i}.
                  </td>
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-white max-w-52 truncate">
                    {name}
                  </td>

                  <td className="px-6 py-4 text-zinc-500 dark:text-zinc-400 max-w-62 truncate">
                    {email}
                  </td>

                  <td className="px-6 py-4 text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
                    {createdAt ? formatDate(createdAt) : "---"}
                  </td>
                </tr>
              );
            })}

            {(!users?.users || users.users.length === 0) && (
              <tr>
                <td
                  colSpan={adminTabPanelUser?.length || 4}
                  className="text-center py-12 text-zinc-500 font-medium"
                >
                  {t("noUsersFound")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-2">
        <BtnPaginations totalPage={users?.meta?.totalPages || 0} page={page} />
      </div>
    </div>
  );
};

export default AdminUsers;

import { Comp_admin } from "@/components";
import { AxiosServer } from "@/lib/axios-server";
import { ISearchParams } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Ecommerce admin Page",
};

const AdminPage = async ({ searchParams }: { searchParams: ISearchParams }) => {
  const query = await searchParams;
  const { page, search } = query;

  return (
    <Comp_admin
      page={Number(page) || 1}
      search={search || ""}
    />
  );
};

export default AdminPage;

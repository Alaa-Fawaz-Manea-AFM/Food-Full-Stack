import { Metadata } from "next";
import AdminMyState from "@/context/AdminMyState";

export const metadata: Metadata = {
  title: {
    default: "e-commerce admin",
    template: "e-commerce - %s",
  },
  description: "Ecommerce Admin Page",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminMyState>
      <div className="mt-24">{children}</div>
    </AdminMyState>
  );
}

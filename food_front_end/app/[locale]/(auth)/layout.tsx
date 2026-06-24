import { redirect } from "next/navigation";

const LayoutAuth = ({ children }: { children: React.ReactNode }) => {
  let userId;
  if (typeof window !== "undefined") {
    userId = JSON.parse(localStorage.getItem("user")!);
  }

  if (userId) return redirect("/");
  return <>{children}</>;
};

export default LayoutAuth;

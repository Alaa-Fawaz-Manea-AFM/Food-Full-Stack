import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiFillShopping } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

export const adminTab = [
  {
    icon: <MdOutlineProductionQuantityLimits />,
    title: "products",
    class:
      "hover:shadow-custom-purple border-custom-purple text-custom-purple bg-dark-admin",
  },
  {
    icon: <AiFillShopping />,
    title: "orders",
    class:
      "border-custom-pink bg-dark-admin text-custompink hover:shadow-custom-pink",
  },
  {
    icon: <FaUser />,
    title: "users",
    class:
      "border-custom-green bg-dark-admin text-custom-green rounded-lg text-xl hover:shadow-custom-green",
  },
];

export const adminTabPanelOrder = [
  "id",
  "customerName",
  "email",
  "totalPrice",
  "paymentMethod",
  "status",
  "date",
];
export const adminTabPanelUser = ["id", "Name", "Email", "Date"];
export const adminTabPanelProduct = [
  "id",
  "Image",
  "Title",
  "Price",
  "Category",
  "Date",
  "Action",
];

export const adminAddData = [
  {
    auto: true,
    type: "text",
    name: "Title",
  },
  {
    type: "text",
    name: "Price",
  },
  {
    select: true,
    name: "Category",
  },
];

export const InputSignUp = [
  { type: "text", name: "name" },
  { type: "email", name: "email" },
  { type: "password", name: "password" },
];
export const InputLogIn = [
  { type: "email", name: "email" },
  { type: "password", name: "password" },
];

export const fadeIn = (
  direction: string,
  type: string,
  delay: number,
  duration: number,
) => {
  return {
    hidden: {
      x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: type,
        delay: delay,
        duration: duration,
        ease: "easeOut",
      },
    },
  };
};

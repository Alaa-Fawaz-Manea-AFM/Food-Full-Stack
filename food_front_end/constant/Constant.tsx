import {
  userImg,
  slider_1,
  slider_2,
  slider_3,
  slider_4,
  slider_01,
  slider_02,
  slider_03,
  slider_04,
  home_1_Img,
  home_2_Img,
  home_3_Img,
  home_4_Img,
  home_5_Img,
  home_6_Img,
  home_7_Img,
  home_8_Img,
  home_01_Img,
  home_02_Img,
  home_03_Img,
  home_04_Img,
  home_05_Img,
  home_06_Img,
  icon_1_home,
  icon_2_home,
  icon_3_home,
  icon_4_home,
  homeHeroImg_1,
  homeHeroImg_2,
} from "../public/assets";

import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiFillShopping } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

export const homeImagesSlider = [
  { img_lg: slider_1, img_sm: slider_01, Category: "Men's Kurta" },
  { img_lg: slider_2, img_sm: slider_02, Category: "Men's Kurta" },
  { img_lg: slider_3, img_sm: slider_03, Category: "Women's Lehenga" },
  { img_lg: slider_4, img_sm: slider_04, Category: "Men's Kurta" },
];

export const homePageEL1 = {
  title: "What's Your Vibe?",
  images: [
    {
      img: home_1_Img,
      titleImg: "Shop Kurtas",
      par: "Look Trending",
      cat: "Men's Kurta",
    },
    {
      img: home_2_Img,
      titleImg: "Shop Jackets",
      par: "Look Royal",
      cat: "Men's Kurta",
    },
    {
      img: home_3_Img,
      titleImg: "Shop Kurta Set",
      par: "Look Elegant",
      cat: "Men's Kurta",
    },
    {
      img: home_4_Img,
      titleImg: "Shop Lehenga",
      par: "Look Divine",
      cat: "Women's Lehenga",
    },
    {
      img: home_5_Img,
      titleImg: "Shop Kurta Jacket Set",
      par: "Look Vibrant",
      cat: "Men's Kurta",
    },
    {
      img: home_6_Img,
      titleImg: "Shop Saree",
      par: "Look Stunning",
      cat: "Women's Lehenga",
    },
    {
      img: home_7_Img,
      titleImg: "Shop Indo Western",
      par: "Look Stylish",
      cat: "Men's Kurta",
    },
    {
      img: home_8_Img,
      titleImg: "Shop Kurtas",
      par: "Look Trending",
      cat: "Men's Kurta",
    },
  ],
};

export const homePageEL3 = {
  title: "IN THE SPOTLIGHT",
  cat: "Men's Kurta",
  img_1: homeHeroImg_1,
  img_2: homeHeroImg_2,
};

export const homePageEL4 = {
  title: "THE WEDDING EDIT",
  images: [
    { img: home_01_Img, titleImg: "Achkan Sherwani", cat: "Men's Kurta" },
    { img: home_02_Img, titleImg: "Bridal Lehenga", cat: "Women's Lehenga" },
    { img: home_03_Img, titleImg: "Layered Indo western", cat: "Men's Kurta" },
    { img: home_04_Img, titleImg: "Chikankari Kurta", cat: "Men's Kurta" },
    { img: home_05_Img, titleImg: "Cocktail Saree", cat: "Women's Lehenga" },
    { img: home_06_Img, titleImg: "Brocade Weave Jacket", cat: "Men's Kurta" },
  ],
};

export const homePageEL5 = [
  { img: icon_1_home, titleImg: "MADE IN EGYPT" },
  { img: icon_2_home, titleImg: "ASSURED QUALITY" },
  { img: icon_3_home, titleImg: "SECURE PAYMENTS" },
  { img: icon_4_home, titleImg: "EMPOWERING WEAVERS" },
];

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
  // "Payment Id",
  // "Image",
  // "Title",
  // "Price",
  // "Category",
  // "Name",
  // "Address",
  // "Pincode",
  // "Phone Number",
  // "Email",
  // "Date",
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

export const orderObj = [
  {
    PaymentId: "3393939",
    Img: userImg,
    Title: "Title",
    Price: "$100",
    Category: "pots",
    Name: "name",
    Address: "Egypt",
    Pincode: "82828",
    PhoneNumber: "929929929929",
    Email: "kkakka@gmail.com",
    Date: "13 Aug 2023",
  },
  {
    PaymentId: "3393939",
    Img: userImg,
    Title: "Title",
    Price: "$100",
    Category: "pots",
    Name: "name",
    Address: "Egypt",
    Pincode: "82828",
    PhoneNumber: "929929929929",
    Email: "kkakka@gmail.com",
    Date: "13 Aug 2023",
  },
  {
    PaymentId: "3393939",
    Img: userImg,
    Title: "Title",
    Price: "$100",
    Category: "pots",
    Name: "name",
    Address: "Egypt",
    Pincode: "82828",
    PhoneNumber: "929929929929",
    Email: "kkakka@gmail.com",
    Date: "13 Aug 2023",
  },
  {
    PaymentId: "3393939",
    Img: userImg,
    Title: "Title",
    Price: "$100",
    Category: "pots",
    Name: "name",
    Address: "Egypt",
    Pincode: "82828",
    PhoneNumber: "929929929929",
    Email: "kkakka@gmail.com",
    Date: "13 Aug 2023",
  },
  {
    PaymentId: "3393939",
    Img: userImg,
    Title: "Title",
    Price: "$100",
    Category: "pots",
    Name: "name",
    Address: "Egypt",
    Pincode: "82828",
    PhoneNumber: "929929929929",
    Email: "kkakka@gmail.com",
    Date: "13 Aug 2023",
  },
  {
    PaymentId: "3393939",
    Img: userImg,
    Title: "Title",
    Price: "$100",
    Category: "pots",
    Name: "name",
    Address: "Egypt",
    Pincode: "82828",
    PhoneNumber: "929929929929",
    Email: "kkakka@gmail.com",
    Date: "13 Aug 2023",
  },
  {
    PaymentId: "3393939",
    Img: userImg,
    Title: "Title",
    Price: "$100",
    Category: "pots",
    Name: "name",
    Address: "Egypt",
    Pincode: "82828",
    PhoneNumber: "929929929929",
    Email: "kkakka@gmail.com",
    Date: "13 Aug 2023",
  },
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

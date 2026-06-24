import {
  IAdminDashboard,
  IAdminDashboardCounts,
  ICart,
  IForm,
  IPartialProduct,
  IUser,
} from "@/types";
import { toast } from "react-toastify";
import { Dispatch, SetStateAction } from "react";
import AxiosClient from "../lib/axios-client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import axios from "axios";

export const ROLE_ADMIN = process.env.NEXT_PUBLIC_ROLE_ADMIN;

export const getUserData = async () => {
  const { data } = await AxiosClient.get("auth/me");
  return data.data || null;
};

export const formatDate = (createdAt: string) => {
  const date = new Date(createdAt);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

export const addProduct = async (
  router: AppRouterInstance,
  productObj: IPartialProduct,
  setDisableBtn: React.Dispatch<SetStateAction<boolean>>,
  setProducts: React.Dispatch<SetStateAction<IAdminDashboard>>,
  setAdminCounts: React.Dispatch<SetStateAction<IAdminDashboardCounts | null>>,
) => {
  const imageCover = productObj.imageCover as File;
  if (
    !productObj.title ||
    !productObj.price ||
    !productObj.desc ||
    !imageCover
  ) {
    return toast.error("Please fill all fields, including the cover image");
  }

  try {
    setDisableBtn(true);
    const imgFormData = new FormData();
    imgFormData.append("folderName", "products");
    imgFormData.append("coverFileName", imageCover.name);
    imgFormData.append("file", imageCover);

    const uploadRes = await axios.post("/api/fileupload", imgFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (uploadRes.status !== 200 || !uploadRes.data?.images?.[0]?.url) {
      throw new Error(
        uploadRes.data?.msg || "Failed to upload image to Cloudinary",
      );
    }

    const finalProductObj = {
      ...productObj,
      categoryId: productObj.category?.id,
      imageCover: uploadRes.data.images[0].url,
      images: [],
    };

    const { data } = await AxiosClient.post("products", finalProductObj);

    setProducts((pre: IAdminDashboard) => {
      if (!pre || !pre.products) {
        return {
          ...pre,
          products: [data?.data],
        };
      }

      return {
        ...pre,
        products: [data?.data, ...pre.products].slice(0, 10),
      };
    });

    setAdminCounts((pre) => {
      if (!pre) return pre;
      return {
        ...pre,
        productCounts: (pre.productCounts || 0) + 1,
      };
    });

    toast.success("Product added successfully");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(error.response?.data?.message || "Oops, Please try again");
    } else {
      toast.error("Oops, Please try again");
    }
  } finally {
    setDisableBtn(false);
  }
};

export const updateProduct = async (
  router: AppRouterInstance,
  productObj: IPartialProduct,
  setDisableBtn: React.Dispatch<SetStateAction<boolean>>,
  setProducts: React.Dispatch<SetStateAction<IAdminDashboard>>,
) => {
  if (
    !productObj.title ||
    !productObj.price ||
    !productObj.desc ||
    !productObj.imageCover
  ) {
    return toast.error("Please fill all fields");
  }

  try {
    setDisableBtn(true);

    let finalImageCover = productObj.imageCover;

    if (productObj.imageCover instanceof File) {
      const imgFormData = new FormData();
      imgFormData.append("folderName", "products");
      imgFormData.append("coverFileName", productObj.imageCover.name);
      imgFormData.append("file", productObj.imageCover);

      const uploadRes = await axios.post("/api/fileupload", imgFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (uploadRes.status === 200 && uploadRes.data?.images?.[0]?.url) {
        finalImageCover = uploadRes.data.images[0].url;
      } else {
        throw new Error("Failed to upload new image");
      }
    }

    const finalProductObj = {
      ...productObj,
      categoryId: productObj.category?.id,
      imageCover: finalImageCover,
      images: [],
    };

    await AxiosClient.patch(`products/${productObj.id}`, finalProductObj);
    setProducts((pre: IAdminDashboard) => {
      if (!pre) return pre;
      return {
        ...pre,
        products: pre.products?.map((prod) =>
          prod.id === productObj.id ? { ...prod, ...finalProductObj } : prod,
        ),
      };
    });

    router.back();
    toast.success("Product Updated successfully");
  } catch (err) {
    if (axios.isAxiosError(err)) {
      toast.error(err.response?.data?.message || "Oops, Please try again");
    } else {
      toast.error("Oops, Please try again");
    }
  } finally {
    setDisableBtn(false);
  }
};

export const handleToogleCart = async (
  productId: string,
  setUser: Dispatch<SetStateAction<IUser | null>>,
  setIsLike: Dispatch<SetStateAction<boolean>>,
  setCart?: Dispatch<SetStateAction<ICart>>,
) => {
  try {
    const { data } = await AxiosClient.post(`/carts/${productId}`);

    if (setCart) {
      setCart((pre) => {
        if (!pre?.carts) return pre;

        return {
          ...pre,
          carts: pre.carts?.filter((i) => i.product.id !== productId),
        };
      });
    }

    setIsLike(data.data);
    setUser((pre) => {
      if (!pre) return pre;

      return {
        ...pre,
        cartCounts: data.data ? pre.cartCounts + 1 : pre.cartCounts - 1,
      };
    });
    toast.success(data.message);
  } catch {
    toast.error("Failed to delete product");
  }
};
export const handle_LogIn_And_SignUp = async (
  form: IForm,
  router: AppRouterInstance,
  setDisable: React.Dispatch<SetStateAction<boolean>>,
  setUser: React.Dispatch<SetStateAction<IUser | null>>,
  title: string,
) => {
  try {
    setDisable(true);
    const { data } = await AxiosClient.post(
      `auth/${title.replace(" ", "").toLowerCase()}`,
      form,
    );

    setUser(data?.data || null);
    router.push("/");
    toast.success("Sign up Succesfully");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message || `${title} Failed, Please try again.`,
      );
    } else {
      toast.error(`${title} Failed, Please try again.`);
    }
  } finally {
    setDisable(false);
  }
};

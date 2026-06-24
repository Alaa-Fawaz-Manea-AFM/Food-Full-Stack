import { BtnAddToCart, ProductSlider } from "@/components";
import BtnSeeMore from "@/components/BtnSeeMore";
import { AxiosServer } from "@/lib/axios-server";
import { IProduct } from "@/types";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Products",
  description: "Ecommerce Products Page",
};

const ProductInfo = async ({ params }: { params: { productId: string } }) => {
  const { productId } = await params;

  let product: IProduct;
  let products: IProduct[];
  try {
    const { data } = await AxiosServer("get", `products/${productId}`);
    product = data?.data.product;
    products = data?.data.products || [];
  } catch {
    throw Error;
  }

  return (
    <div
      dir="ltr"
      className="min-h-screen overflow-hidden container mx-auto px-4 md:px-10"
    >
      <div className="w-full py-10 mt-10 grid items-start gap-8 grid-cols-1 lg:grid-cols-5">
        <div className="w-full lg:col-span-2 max-w-[500px] mx-auto">
          <div className="w-full h-[400px] md:h-[500px] relative bg-primary dark:bg-zinc-900 rounded-2xl overflow-hidden border border-custom-green shadow-md group">
            <Image
              fill
              alt={product?.title || "Product Image"}
              className="object-cover p-2 transition-transform duration-500 group-hover:scale-105 rounded-2xl"
              src={product?.imageCover as string}
              priority
              unoptimized
            />
          </div>
        </div>

        <div className="space-y-6 w-full lg:col-span-3 flex flex-col">
          <div>
            <h2 className="text-xs md:text-sm title-font tracking-widest text-custom-green font-bold uppercase mb-1">
              {product?.category?.category}
            </h2>
            <h1 className="text-2xl md:text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {product?.title}
            </h1>
          </div>

          <div className="flex flex-col gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-6">
            <h3 className="text-sm font-bold text-custom-green uppercase tracking-wider">
              Product Details:
            </h3>
            <div className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
              <BtnSeeMore details={product?.desc} length={300} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pt-2">
            <div className="flex items-center">
              <span className="title-font font-black text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 flex items-start">
                <span className="text-custom-green text-xl font-bold mt-1 mr-0.5">
                  $
                </span>
                {product?.price}
              </span>
            </div>

            <div className="w-full sm:w-auto">
              <BtnAddToCart menuId={product?.id} isLiked={product?.isLiked} />
            </div>
          </div>
        </div>
      </div>

      {products.length > 0 && (
        <div className="my-16 border-t border-zinc-200 dark:border-zinc-800 pt-10">
          <h2 className="text-xl font-bold mb-6 text-zinc-950 dark:text-zinc-50">
            Related Products
          </h2>
          <ProductSlider category={product?.category} products={products} />
        </div>
      )}
    </div>
  );
};

export default ProductInfo;

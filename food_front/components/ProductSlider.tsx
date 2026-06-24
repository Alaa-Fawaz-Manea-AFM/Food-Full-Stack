"use client";
import { Link } from "@/i18n/navigation";
import ProductDiv from "./ProductDiv";
// import Link from "next/link";
import { IProduct } from "@/types";

const ProductSlider = ({
  category,
  products,
}: {
  category: { category: string; id: string };
  products: IProduct[];
}) => {
  if (!category.category || products.length === 0) return;
  return (
    <div className="sm:w-11/12 max-sm:w-screen max-sm:px-5 mx-auto my-5">
      {category.category ? (
        <div className="w-fit items-start group mb-10">
          <h1 className="font-semibold text-3xl">{category.category}</h1>
          <div className="bg-custom-green w-1/2 h-1 group-hover:w-full duration-200 ease-out" />
        </div>
      ) : (
        ""
      )}
      <div className="space-y-10">
        <div className="flex flex-wrap w-full gap-5">
          {products?.map((prod) => (
            <ProductDiv key={prod.id} prod={prod} noBtnCart />
          ))}
        </div>
        {products.length > 0 ? (
          <Link
            href={`/menu/?search&categoryId=${category.id}`}
            className="px-5 py-2 bg-custom-green hover:opacity-70 rounded-md block w-fit h-fit mx-auto"
          >
            More...
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductSlider;

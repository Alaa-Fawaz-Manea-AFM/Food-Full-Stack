import { Link } from "@/i18n/navigation";
import BtnAddToCart from "./BtnAddToCart";
import { ICart, IProduct } from "@/types";
import Image from "next/image";
// import Link from "next/link";
import { SetStateAction } from "react";

const ProductDiv = ({
  prod,
  cart,
  noBtnCart,
  setCart,
}: {
  prod: IProduct;
  cart?: boolean;
  noBtnCart?: boolean;
  setCart?: React.Dispatch<SetStateAction<ICart>>;
}) => {
  return (
    <div
      className={`w-[90vw] max-w-[90vw] ss:w-[300px] ${noBtnCart ? "h-full" : "h-[400px]"} border-custom-green hover:shadow-custom-green overflow-hidden grid grid-cols-1 gap-2 p-4 hover:shadow-xl transition-shadow duration-300 ease-in-out border rounded-lg px-5`}
    >
      <Link
        href={`/menu/${prod.id}`}
        className="w-full relative h-44 col-span-1"
      >
        <Image
          fill
          src={prod?.imageCover as string}
          alt="image product"
          className="object-cover rounded-md hover:scale-105 transition-all"
          unoptimized
        />
      </Link>
      <div className="flex flex-col justify-between gap-2 col-span-1">
        <div className="flex flex-col">
          <h1 className="font-black text-md line-clamp-1">{prod.title}</h1>
          <div className="flex items-center justify-between sm:py-2">
            <b>
              <sup>$</sup>
              {prod.price}
            </b>
          </div>
        </div>
        {!noBtnCart && (
          <BtnAddToCart
            menuId={prod.id}
            isLiked={cart || prod.isLiked}
            setCart={setCart}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDiv;

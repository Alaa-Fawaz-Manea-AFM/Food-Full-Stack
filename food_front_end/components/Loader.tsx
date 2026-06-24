import { Loader_icon } from "../public/assets";
import Image from "next/image";

const Loader = () => (
  <span className="flex items-center justify-center w-full h-full">
    <Image src={Loader_icon} alt="loader" width={32} height={32} unoptimized />
  </span>
);

export default Loader;

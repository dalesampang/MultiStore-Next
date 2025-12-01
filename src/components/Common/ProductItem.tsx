"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/model";
import { useRouter } from "next/navigation";
import OrderNowButton from "./OrderButton";

const ProductItem = ({ item }: { item: Product }) => {
  const router = useRouter();

  const handleProductDetails = () => {
    router.push(`/ai-glasses/${item.slug}`);
  };

  const handleOrder = () => {};
  return (
    <div className="group">
      <div
        className="relative overflow-hidden flex items-center justify-center rounded-lg bg-[#F6F7FB] min-h-[270px] mb-4 cursor-pointer"
        onClick={() => handleProductDetails()}>
        <Image src={item.baseImage} alt="" width={250} height={250} />

        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <OrderNowButton slug={item.slug} />
        </div>
      </div>
      <div className="gap-2.5 mb-2">
        <div className="flex justify-center gap-2.5 mb-2">
          <div className="flex justify-center gap-1">
            <Image
              src="/images/icons/icon-star.svg"
              alt="star icon"
              width={14}
              height={14}
            />
            <Image
              src="/images/icons/icon-star.svg"
              alt="star icon"
              width={14}
              height={14}
            />
            <Image
              src="/images/icons/icon-star.svg"
              alt="star icon"
              width={14}
              height={14}
            />
            <Image
              src="/images/icons/icon-star.svg"
              alt="star icon"
              width={14}
              height={14}
            />
            <Image
              src="/images/icons/icon-star.svg"
              alt="star icon"
              width={14}
              height={14}
            />
          </div>
        </div>

        <h2 className="flex justify-center font-medium text-dark ease-out text-custom-1 duration-200  hover:text-blue mb-1.5">
          <Link href={`/ai-glasses/${item.slug}`}>
            {item.name} {item.version && `- ${item.version}`}
          </Link>
        </h2>
        <span className="flex justify-center gap-2 font-medium text-lg">
          <span className="text-dark">
            ₱{item.variants[0].price.toLocaleString("en-PH")}
          </span>
          {/* <span className="text-dark-4 line-through">${item.price}</span> */}
        </span>
      </div>
    </div>
  );
};

export default ProductItem;

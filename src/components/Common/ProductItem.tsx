"use client";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/model";
import { useRouter } from "next/navigation";
import OrderNowButton from "./OrderButton";

const ProductItem = ({ item }: { item: Product }) => {
  const router = useRouter();

  const handleProductDetails = () => {
    router.push(`/ai-glasses/${item.variant.slug}`);
  };

  const handleOrder = () => {};
  return (
    <div className="group">
      <div
        className="relative overflow-hidden flex items-center justify-center rounded-lg bg-[#F6F7FB] min-h-[270px] mb-4 cursor-pointer"
        onClick={() => handleProductDetails()}>
        <Image
          src={item.variant.images?.[0].url}
          alt=""
          width={250}
          height={250}
        />

        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <OrderNowButton slug={item.variant.slug} />
        </div>
      </div>
      <div className="gap-2.5 mb-2">
        <h2 className="text-center font-medium text-dark text-custom-1 duration-200 ease-out hover:text-blue mb-1.5">
          <Link href={`/ai-glasses/${item.slug}`} className="block">
            <div className="mb-0.5">
              {item.brand} {item.name}
              {item.version && (
                <>
                  <br />({item.version})
                </>
              )}
            </div>

            <div className="text-sm font-medium text-dark flex justify-center gap-2">
              <span>{item.variant.color}</span>
            </div>

            <div className="text-sm font-medium text-dark flex justify-center gap-2">
              <span>{item.variant.lens}</span>
            </div>

            <div className="text-lg font-semibold text-price flex justify-center mt-1">
              ₱{item.variant.price.toLocaleString("en-PH")}
            </div>
          </Link>
        </h2>
      </div>
    </div>
  );
};

export default ProductItem;

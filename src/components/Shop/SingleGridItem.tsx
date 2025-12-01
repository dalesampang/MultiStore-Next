"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/model";

const SingleGridItem = ({ item }: { item: Product }) => {
  // update the QuickView state
  const handleAddToCart = () => {};
  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-white shadow-1 min-h-[270px] mb-4">
        <Image src={item.baseImage} alt="" width={250} height={250} />

        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button
            onClick={() => handleAddToCart()}
            className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark">
            Order Now
          </button>
        </div>
      </div>
      <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
        <Link href={`/ai-glasses/${item.slug}`}> {item.name} </Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark">
          ₱{item.variants?.[0].price.toLocaleString("en-PH")}
        </span>
      </span>
    </div>
  );
};

export default SingleGridItem;

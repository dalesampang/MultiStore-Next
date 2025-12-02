"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ProductItem from "@/components/Common/ProductItem";
import { Glasses } from "lucide-react";
import ProductSkeleton from "@/components/Skeleton/ProductSkeleton";
const NewArrival = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/products/data")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);
  console.log("Expanded Data:", products);

  return (
    <section className="overflow-hidden pt-15">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-7 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <Glasses color="blue" size={20} />
              AI Glasses
            </span>
          </div>

          <Link
            href="/ai-glasses"
            className="inline-flex font-medium text-custom-sm py-2.5 px-7 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent">
            View All
          </Link>
        </div>

        {loading ? (
          <ProductSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-7.5 gap-y-9">
            {products.map((item, key) => (
              <ProductItem item={item} key={key} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewArrival;

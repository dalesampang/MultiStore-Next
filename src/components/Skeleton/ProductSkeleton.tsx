import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full animate-pulse">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="flex flex-col items-start">
          <div className="w-full aspect-square bg-gray-300 rounded-xl mb-4"></div>

          <div className="h-4 w-24 bg-gray-300 rounded mb-2"></div>

          <div className="h-5 w-3/4 bg-gray-300 rounded mb-2"></div>

          <div className="h-5 w-16 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;

import React from "react";

const CategorySkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center p-4">
          <div className="h-32 w-32 sm:h-36 sm:w-36 rounded-full bg-gray-300 mb-4"></div>

          <div className="h-5 w-24 bg-gray-300 rounded-md"></div>
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;

"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import ProductItem from "../Common/ProductItem";

const ShopWithoutSidebar = ({ page, slug, title, data }) => {
  const [productStyle, setProductStyle] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  useEffect(() => {
    window.gtag?.("event", "view_item_list", {
      item_list_id: page,
      item_list_name: title,
    });
  }, []);

  return (
    <>
      <Breadcrumb title={title} pages={[page, "/", slug]} />
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            <div className="w-full">
              <div className="rounded-lg bg-white shadow-1 pl-3 pr-2.5 py-2.5 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap items-center gap-4">
                    <p>
                      Showing{" "}
                      <span className="text-dark">
                        {paginatedData.length} of {data.length}
                      </span>{" "}
                      Products
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`${
                  productStyle === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7.5 gap-y-9"
                    : "flex flex-col gap-7.5"
                }`}>
                {paginatedData.map((item, key) => (
                  <ProductItem item={item} key={key} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-15">
                <div className="bg-white shadow-1 rounded-md p-2">
                  <ul className="flex items-center gap-1">
                    <li>
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.max(p - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="flex items-center justify-center w-8 h-9 rounded hover:bg-blue hover:text-white disabled:text-gray-400">
                        &lt;
                      </button>
                    </li>

                    {[...Array(totalPages)].map((_, i) => (
                      <li key={i}>
                        <button
                          onClick={() => setCurrentPage(i + 1)}
                          className={`flex py-1.5 px-3.5 rounded ${
                            currentPage === i + 1
                              ? "bg-blue text-white"
                              : "hover:bg-blue hover:text-white"
                          }`}>
                          {i + 1}
                        </button>
                      </li>
                    ))}

                    <li>
                      <button
                        onClick={() =>
                          setCurrentPage((p) => Math.min(p + 1, totalPages))
                        }
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center w-8 h-9 rounded hover:bg-blue hover:text-white disabled:text-gray-400">
                        &gt;
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              {/* End Pagination */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopWithoutSidebar;

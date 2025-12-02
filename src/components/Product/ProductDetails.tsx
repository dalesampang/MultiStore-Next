"use client";
import { useEffect, useMemo, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { Product, Variant } from "@/types/model";
import Image from "next/image";
import { useRouter } from "next/navigation";
import OrderNowButton from "../Common/OrderButton";
import { set } from "react-hook-form";

function decodeHtmlEntities(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export default function ProductDetails({
  product,
  variant,
}: {
  product: Product;
  variant: Variant;
}) {
  const tabs = [
    {
      id: "tabOne",
      title: "Features",
    },
  ];

  const [previewImg, setPreviewImg] = useState(variant.images?.[0]?.id ?? null);
  const [activeTab, setActiveTab] = useState("tabOne");
  const [selectedVariant, setSelectedVariant] = useState(variant);
  const decoded = useMemo(
    () => decodeHtmlEntities(product.description),
    [product.description]
  );
  useEffect(() => {
    if (selectedVariant.images?.length) {
      setPreviewImg(selectedVariant.images[0].id);
    }
  }, [selectedVariant]);
  useEffect(() => {
    window.gtag?.("event", "view_item", {
      item_id: product.id,
      item_name: product.name + " ",
      item_category: product.category.name,
      currency: "PHP",
      value: selectedVariant.price,
    });
  }, [selectedVariant]);
  const previewImage = selectedVariant.images?.find(
    (img) => img.id === previewImg
  );
  const handleVariantClick = (variant: Variant) => {
    setSelectedVariant(variant);
    window.history.pushState(null, "", `/ai-glasses/${variant.slug}`);
  };

  return (
    <>
      <Breadcrumb
        title={product.category.name}
        pages={[product.category.name]}
      />
      <>
        <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">
              <div className="lg:max-w-[570px] w-full">
                <div className="lg:min-h-[512px] rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7.5 relative flex items-center justify-center">
                  <div>
                    {previewImage && (
                      <Image
                        src={previewImage.url}
                        alt="products-details"
                        width={400}
                        height={400}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
                  {selectedVariant.images.map((item, key) => (
                    <button
                      onClick={() => setPreviewImg(item.id)}
                      key={key}
                      className={`flex items-center justify-center w-15 sm:w-25 h-15 sm:h-25 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border-2 hover:border-blue ${
                        item.id === previewImg
                          ? "border-blue"
                          : "border-transparent"
                      }`}>
                      <Image
                        width={50}
                        height={50}
                        src={item.url}
                        alt="thumbnail"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* <!-- product content --> */}
              <div className="max-w-[539px] w-full">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-xl sm:text-2xl xl:text-custom-3 text-dark">
                    {product.name} {product.version && `(${product.version})`}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-5.5 mb-4.5">
                  <div className="flex items-center gap-2.5">
                    {/* <!-- stars --> */}
                    <div className="flex items-center gap-1">
                      <svg
                        className="fill-[#FFA645]"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_375_9172)">
                          <path
                            d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
                            fill=""
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_375_9172">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <svg
                        className="fill-[#FFA645]"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_375_9172)">
                          <path
                            d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
                            fill=""
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_375_9172">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <svg
                        className="fill-[#FFA645]"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_375_9172)">
                          <path
                            d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
                            fill=""
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_375_9172">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <svg
                        className="fill-[#FFA645]"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_375_9172)">
                          <path
                            d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
                            fill=""
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_375_9172">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>

                      <svg
                        className="fill-[#FFA645]"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_375_9172)">
                          <path
                            d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
                            fill=""
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_375_9172">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>

                    <span> (5 customer reviews) </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_375_9221)">
                        <path
                          d="M10 0.5625C4.78125 0.5625 0.5625 4.78125 0.5625 10C0.5625 15.2188 4.78125 19.4688 10 19.4688C15.2188 19.4688 19.4688 15.2188 19.4688 10C19.4688 4.78125 15.2188 0.5625 10 0.5625ZM10 18.0625C5.5625 18.0625 1.96875 14.4375 1.96875 10C1.96875 5.5625 5.5625 1.96875 10 1.96875C14.4375 1.96875 18.0625 5.59375 18.0625 10.0312C18.0625 14.4375 14.4375 18.0625 10 18.0625Z"
                          fill="#22AD5C"
                        />
                        <path
                          d="M12.6875 7.09374L8.9688 10.7187L7.2813 9.06249C7.00005 8.78124 6.56255 8.81249 6.2813 9.06249C6.00005 9.34374 6.0313 9.78124 6.2813 10.0625L8.2813 12C8.4688 12.1875 8.7188 12.2812 8.9688 12.2812C9.2188 12.2812 9.4688 12.1875 9.6563 12L13.6875 8.12499C13.9688 7.84374 13.9688 7.40624 13.6875 7.12499C13.4063 6.84374 12.9688 6.84374 12.6875 7.09374Z"
                          fill="#22AD5C"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_375_9221">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>

                    <span className="text-green"> In Stock </span>
                  </div>
                </div>

                <h3 className="text-xl font-medium sm:text-2xl xl:text-custom-2 text-dark">
                  Price: ₱{selectedVariant.price.toLocaleString("en-PH")}
                </h3>
                <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
                  {product.variants.map((item, key) => (
                    <button
                      key={key}
                      onClick={() => handleVariantClick(item)}
                      className={`flex items-center justify-center w-15 sm:w-20 h-15 sm:h-20 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border-2 hover:border-blue ${
                        item.id === selectedVariant.id
                          ? "border-black"
                          : "border-transparent"
                      }`}>
                      <Image
                        width={50}
                        height={50}
                        src={item.images[0].url}
                        alt="thumbnail"
                      />
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-4 px-2 py-2">
                  <div className="min-w-[65px]">
                    <h5 className="font-medium text-dark">Frame Color:</h5>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <p>{selectedVariant.color}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 px-2 py-2">
                  <div className="min-w-[65px]">
                    <h5 className="font-medium text-dark">Lens Color:</h5>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <p>{selectedVariant.lens}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4.5">
                  <OrderNowButton slug={selectedVariant.slug} />
                </div>
                <div className="flex items-center gap-4 px-2 py-2">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: decoded }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-gray-2 py-20">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            {/* <!--== tab header start ==--> */}
            <div className="flex flex-wrap items-center bg-white rounded-[10px] shadow-1 gap-5 xl:gap-12.5 py-4.5 px-4 sm:px-6">
              {tabs.map((item, key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(item.id)}
                  className={`font-medium lg:text-lg ease-out duration-200 hover:text-blue relative before:h-0.5 before:bg-blue before:absolute before:left-0 before:bottom-0 before:ease-out before:duration-200 hover:before:w-full ${
                    activeTab === item.id
                      ? "text-blue before:w-full"
                      : "text-dark before:w-0"
                  }`}>
                  {item.title}
                </button>
              ))}
            </div>

            {/* <!-- tab content one start --> */}
            <div>
              <div
                className={`flex-col sm:flex-row gap-7.5 xl:gap-12.5 mt-12.5 ${
                  activeTab === "tabOne" ? "flex" : "hidden"
                }`}>
                <div className="w-full ">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-7.5 xl:gap-12.5">
                    {product.features.map((feature) => {
                      return (
                        <div key={feature.id} className="px-3 py-3">
                          <div className="col-span-12 sm:col-span-4">
                            <Image
                              src={feature.mediaUrl}
                              alt={feature.title}
                              width={400}
                              height={400}
                              className="w-full rounded-lg border"
                            />
                          </div>
                          <div className="col-span-12 sm:col-span-4 py-2">
                            <h3 className="font-semibold text-xl sm:text-2xl xl:text-custom-2 text-dark">
                              {feature.title}
                            </h3>
                            <p>{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              {/* <!-- tab content one end --> */}
            </div>
          </div>
        </section>
      </>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            name: product.name,
            image: product.baseImage,
            description: product.description,
            sku: selectedVariant.slug,
            brand: { "@type": "Brand", name: "Antipara Manila" },
            offers: {
              "@type": "Offer",
              url: `https://antiparamanila.store/ai-glasses/${selectedVariant.slug}`,
              priceCurrency: "PHP",
              price: selectedVariant.price,
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />
    </>
  );
}

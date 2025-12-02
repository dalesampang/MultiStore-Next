"use client";
import { useEffect, useRef, useState } from "react";
import ProductDetails from "@/components/Product/ProductDetails";
import PreLoader from "../Common/PreLoader";

export default function ProductPageClient({
  productSlug,
}: {
  productSlug: string;
}) {
  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${productSlug}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Product not found");
        const { product, variant } = await res.json();
        setProduct(product);
        setVariant(variant);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productSlug]);

  if (!product)
    return <div className="p-10 text-red-500">Product not found</div>;

  return loading ? (
    <PreLoader />
  ) : (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://antiparamanila.store/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: product.category.name,
                item: `https://antiparamanila.store/categories/${product.category.slug}`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: product.name,
                item: `https://antiparamanila.store/ai-glasses/${product.slug}`,
              },
            ],
          }),
        }}
      />
      <ProductDetails product={product} variant={variant} />
    </>
  );
}

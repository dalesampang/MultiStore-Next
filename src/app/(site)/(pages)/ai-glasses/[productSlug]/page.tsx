import ProductDetails from "@/components/Product/ProductDetails";

interface ProductPageProps {
  params: { productSlug: string };
}
export async function generateMetadata({ params }: ProductPageProps) {
  const { productSlug } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${productSlug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return {};

  const { product, variant } = await res.json();

  if (!product) return {};

  return {
    title:
      product.category.name +
      " " +
      product.name +
      " " +
      variant.color +
      " " +
      variant.lens +
      " | SmartGlasses Philippines",
    description: product.description,
    keywords:
      product.category.name +
      "," +
      product.name +
      ",Meta AI,smart glasses, Philippines",
    alternates: {
      canonical: "https://antiparamanila.store/ai-glasses/" + variant.slug,
    },
    openGraph: {
      title: product.category.name + " " + product.name,
      description: product.description,
      images: product.baseImage,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productSlug } = await params;
  // Call your API route
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${productSlug}`,
    {
      cache: "no-store", // ensures fresh data
    }
  );

  if (!res.ok) {
    return <div className="p-10 text-red-500">Product not found</div>;
  }

  const { product, variant } = await res.json();

  return (
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

import ProductPageClient from "@/components/Product/ProductPageClient";

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
      product.brand +
      " " +
      product.name +
      " " +
      variant.color +
      " " +
      variant.lens +
      " | SmartGlasses Philippines",
    description: product.description,
    keywords:
      product.brand +
      "," +
      product.name +
      "," +
      variant.color +
      "," +
      variant.lens +
      "," +
      product.version +
      ",Meta AI,smart glasses, Philippines",
    alternates: {
      canonical: "https://antiparamanila.store/ai-glasses/" + variant.slug,
    },
    openGraph: {
      title: product.category.name + " " + product.name,
      description: product.description,
      images: variant.images[0].url,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productSlug } = await params;
  return <ProductPageClient productSlug={productSlug} />;
}

// app/categories/[slug]/page.tsx
import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";
export async function generateMetadata() {
  return {
    title: "Smart Glasses Collection | Antipara Manila",
    description:
      "Shop Ray-Ban Meta Gen 1 & Gen 2, Oakley Meta HSTN, and Oakley Meta Vanguard at Antipara Manila — the trusted smart glasses store in the Philippines.",
    keywords: [
      "Antipara Manila",
      "smart glasses",
      "Philippines",
      "Meta AI eyewear",
      "Ray-Ban Meta Gen 1",
      "Ray-Ban Meta Gen 2",
      "Oakley Meta HSTN",
      "Oakley Meta Vanguard",
    ],
    alternates: { canonical: "https://antiparamanila.com/ai-glasses" },
    openGraph: {
      title: "Smart Glasses Collection",
      description:
        "Discover Ray-Ban Meta Gen 1 & Gen 2, Oakley Meta HSTN, and Oakley Meta Vanguard smart glasses at Antipara Manila.",
      images: [
        "https://res.cloudinary.com/djws2m6eo/image/upload/v1764594043/meta_glasses_preview_cxosjk.webp",
      ],
    },
  };
}
interface CategoryPageProps {
  params: { slug: string };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Call your API route
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/by-slug/${slug}/products`,
    {
      cache: "no-store", // ensures fresh data
    }
  );

  if (!res.ok) {
    return <div className="p-10 text-red-500">Category not found</div>;
  }

  const { category, products } = await res.json();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: category.name,
            description: category.description,
            itemListElement: products.map((product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: `https://antiparamanila.com/products/${product.slug}`,
              name: product.name,
            })),
          }),
        }}
      />
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
                name: category.name,
                item: `https://antiparamanila.store/categories/${category.slug}`,
              },
            ],
          }),
        }}
      />

      <ShopWithoutSidebar
        page="categories"
        title={category.name}
        slug={slug}
        data={products}
      />
    </>
  );
}

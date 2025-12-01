// app/categories/[slug]/page.tsx
import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";
export async function generateMetadata() {
  return {
    title: "Smart Glasses Collection | Antipara Manila",
    description:
      "Browse Antipara Manila’s full collection of smart glasses. Compare features, styles, and prices.",
    keywords: [
      "smart glasses collection",
      "Antipara Manila products",
      "Oakley Meta Glasses",
      "Rayban Meta Glasses",
      "Philippines eyewear",
    ],
    alternates: { canonical: "https://antiparamanila.com/ai-glasses" },
    openGraph: {
      title: "Smart Glasses Collection",
      description: "Explore Antipara Manila’s smart glasses lineup.",
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

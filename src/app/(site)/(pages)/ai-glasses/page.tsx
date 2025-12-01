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

export default async function Products({ searchParams }) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() ?? "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/data?q=${encodeURIComponent(query)}`,
    {
      cache: "no-store", // ensures fresh data
    }
  );

  const products = await res.json();

  return (
    <ShopWithoutSidebar
      page="ai-glasses"
      title="Ai Glasses"
      slug=""
      data={products}
    />
  );
}

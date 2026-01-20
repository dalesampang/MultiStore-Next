import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";
import { Product } from "@/types/model";

export const metadata = {
  title: "Antipara MNL | Trusted Seller of Smart Glasses in the Philippines",
  description:
    "Shop Ray-Ban Meta Gen 1 & Gen 2, Oakley Meta HSTN, and Oakley Meta Vanguard at Antipara MNL — the trusted smart glasses store in the Philippines.",
  keywords: [
    "Antipara MNL",
    "smart glasses",
    "Philippines",
    "Meta AI eyewear",
    "Ray-Ban Meta Gen 1",
    "Ray-Ban Meta Gen 2",
    "Oakley Meta HSTN",
    "Oakley Meta Vanguard",
  ],
  alternates: { canonical: "https://antiparamanila.store/" },
  openGraph: {
    url: "https://antiparamanila.store",
    type: "website",
    title: "Antipara MNL | Smart Glasses",
    description:
      "Discover Ray-Ban Meta Gen 1 & Gen 2, Oakley Meta HSTN, and Oakley Meta Vanguard smart glasses at Antipara MNL.",
    images: [
      {
        url: "https://res.cloudinary.com/djws2m6eo/image/upload/v1764691334/Antipara_sev4da.jpg",
        width: 1200,
        height: 630,
        alt: "Antipara MNL Smart Glasses",
      },
    ],
  },
};

function generateDescription(item: Product): string {
  const description = `Buy ${item.brand} ${item.name} ${item.version} in ${item.variant.color} frame with ${item.variant.lens} lenses.`;
  return description;
}

export default async function Products({ searchParams }) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() ?? "";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/data?q=${encodeURIComponent(query)}`,
    {
      cache: "no-store", // ensures fresh data
    },
  );

  const products = await res.json();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((item: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: `${item.brand} ${item.name} ${item.variant.color} ${item.variant.lens} ${item.version}`,
        brand: { "@type": "Brand", name: item.brand },
        image: item.variant.images.map((img: any) => img.url),
        description: generateDescription(item),
        offers: {
          "@type": "Offer",
          priceCurrency: "PHP",
          price: item.variant.price,
          availability: "http://schema.org/InStock",
          url: `https://antiparamanila.store/ai-glasses/${item.variant.slug}`,
        },
      },
    })),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ShopWithoutSidebar
        page="ai-glasses"
        title="Ai Glasses"
        slug=""
        data={products}
      />
    </>
  );
}

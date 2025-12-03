import Home from "@/components/Home";

export const metadata = {
  title: "Antipara Manila | #1 Seller of Smart Glasses in the Philippines",
  description:
    "Shop Antipara Manila — the leading destination for smart glasses in the Philippines. Discover AI-powered eyewear with Meta AI, 3K capture, and hands-free communication.",
  keywords: [
    "Antipara Manila",
    "smart glasses",
    "Philippines",
    "Meta AI eyewear",
  ],
  alternates: { canonical: "https://antiparamanila.store/" },
  openGraph: {
    url: "https://antiparamanila.store",
    type: "website",
    title: "Antipara Manila | Smart Glasses",
    description:
      "Antipara Manila is the #1 seller of smart glasses in the Philippines.",
    images: [
      {
        url: "https://res.cloudinary.com/djws2m6eo/image/upload/v1764691334/Antipara_sev4da.jpg",
        width: 1200,
        height: 630,
        alt: "Antipara Manila Smart Glasses",
      },
    ],
  },
};
async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/data`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((item: any, index: number) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://antiparamanila.store/ai-glasses/${item.slug}`,
      name: item.name,
      item: {
        "@type": "Product",
        name: `${item.brand} ${item.name} ${item.variant.color} ${item.variant.lens}`,
        brand: { "@type": "Brand", name: item.brand },
        image: item.variant.images.map((img: any) => img.url),
        description: item.description,
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

      <Home />
    </>
  );
}

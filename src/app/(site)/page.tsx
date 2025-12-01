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
        url: "https://res.cloudinary.com/djws2m6eo/image/upload/v1764591660/antipara-manila_stbq7j.png",
        width: 1200,
        height: 630,
        alt: "Antipara Manila Smart Glasses",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <Home />
    </>
  );
}

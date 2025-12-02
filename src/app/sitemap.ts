import { MetadataRoute } from "next";

// Example: fetch products & categories from your API or DB
async function getProducts() {
  const res = await fetch("https://antiparamanila.store/api/products/data");
  return res.json();
}

async function getCategories() {
  const res = await fetch("https://antiparamanila.store/api/categories");
  return res.json();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();
  const categories = await getCategories();

  const baseUrl = "https://antiparamanila.store";

  const productEntries = products.flatMap((p: any) => {
    const baseEntry = {
      url: `${baseUrl}/ai-glasses/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    };

    // If product has variants, add them
    const variantEntries =
      p.variants?.map((v: any) => ({
        url: `${baseUrl}/ai-glasses/${v.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      })) ?? [];

    return [baseEntry, ...variantEntries];
  });

  const categoryEntries = categories.map((c: any) => ({
    url: `${baseUrl}/categories/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...productEntries,
    ...categoryEntries,
  ];
}

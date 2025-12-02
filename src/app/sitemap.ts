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

  const productEntries = products.map((p: any) => ({
    url: `${baseUrl}/ai-glasses/${p.variant.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

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

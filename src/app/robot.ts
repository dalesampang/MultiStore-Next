import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin"], // block admin pages
      },
    ],
    sitemap: "https://antiparamanila.store/sitemap.xml",
  };
}

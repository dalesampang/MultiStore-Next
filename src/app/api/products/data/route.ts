import { prisma } from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase();

  const products = await prisma.product.findMany({
    where: query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        }
      : undefined,
    include: {
      variants: {
        include: { images: true },
      },
    },
  });
  const expandedData = products.flatMap((product) => {
    const baseEntry = { ...product, isVariant: false };

    const variantEntries =
      product.variants?.map((variant) => ({
        ...product,
        variant: variant,
      })) ?? [];

    return [...variantEntries];
  });
  return NextResponse.json(expandedData);
}

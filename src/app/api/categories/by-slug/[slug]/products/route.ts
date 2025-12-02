import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  // console.log(params.slug);
  const category = await prisma.category.findUnique({
    where: { slug: slug },
    include: {
      products: {
        orderBy: { sort: "asc" },
        include: {
          variants: {
            orderBy: { sort: "asc" },
            include: { images: true },
          },
        },
      },
    },
  });
  const expandedData = category.products.flatMap((product) => {
    const variantEntries =
      product.variants?.map((variant) => ({
        ...product,
        variant: variant,
      })) ?? [];

    return [...variantEntries];
  });

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }
  return NextResponse.json({ category, products: expandedData });
}

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, context: { params: { slug: string } }) {
  try {
    const { slug } = await context.params;

    // Try product first
    let product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        seoSettings: true,
        variants: { include: { images: true } },
        features: true,
        specGroups: { include: { specs: true } },
      },
    });

    if (product) {
      return NextResponse.json({ product, variant: product.variants[0] });
    }

    // If not a product, try variant
    let variant = await prisma.variant.findUnique({
      where: { slug },
      include: {
        product: {
          include: {
            category: true,
            seoSettings: true,
            variants: { include: { images: true } },
            features: true,
            specGroups: { include: { specs: true } },
          },
        },
        images: true,
      },
    });

    if (variant) {
      return NextResponse.json({ variant, product: variant.product });
    }

    return NextResponse.json({ error: "Not found" }, { status: 404 });
  } catch (error) {
    console.error("Error fetching by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch product/variant" },
      { status: 500 }
    );
  }
}

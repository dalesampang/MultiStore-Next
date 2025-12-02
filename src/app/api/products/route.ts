import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import slugify from "slugify";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { sort: "asc" },
    include: { category: true, seoSettings: true },
  });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const variants = body.variants.map((v: any) => ({
      color: v.color,
      lens: v.lens,
      price: parseFloat(v.price),
      stock: parseInt(v.stock, 10),
      images: v.images ?? [],
    }));

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug: body.slug,
        store: {
          connect: { id: Number(body.storeId) },
        },
        category: {
          connect: { id: Number(body.categoryId) },
        },
        description: body.description,
        baseImage: body.baseImage,
        version: body.version,
        variants: {
          create: variants.map((v) => ({
            color: v.color,
            lens: v.lens,
            price: v.price,
            stock: v.stock,
            slug:
              v.slug ??
              slugify(
                `${body.categoryName}-${body.name}-${v.color}-${v.lens}`,
                { lower: true }
              ),
            images: {
              create: v.images.map((img) => ({ url: img.url, sort: img.sort })),
            },
          })),
        },

        features: {
          create: body.features ?? [],
        },
        specGroups: {
          create:
            body.specGroups?.map((group: any) => ({
              title: group.title,
              description: group.description,
              imageUrl: group.imageUrl,
              specs: {
                create: group.specs ?? [],
              },
            })) ?? [],
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("Product creation error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

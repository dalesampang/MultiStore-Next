import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all categories
export async function GET() {
  const categories = await prisma.category.findMany({
    include: { store: true }, // optional: include store info
  });
  return NextResponse.json(categories);
}

// POST new category
export async function POST(req: Request) {
  try {
    const { name, slug, imageUrl } = await req.json();

    // ✅ Fix: include storeId
    const category = await prisma.category.create({
      data: {
        name,
        slug,
        imageUrl,
        storeId: 1,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("POST /api/categories error:", error);
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    );
  }
}

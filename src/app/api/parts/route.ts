import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pcParts } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

type PCPartCategory = "case" | "motherboard" | "cpu" | "gpu" | "ram" | "storage" | "psu" | "cooling";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    if (!category || !isValidCategory(category)) {
      return NextResponse.json(
        { error: "Valid category parameter is required" },
        { status: 400 }
      );
    }

    const parts = await db
      .select()
      .from(pcParts)
      .where(eq(pcParts.category, category as PCPartCategory));

    // Transform the data to handle JSON strings
    const transformedParts = parts.map((part) => ({
      ...part,
      specs: JSON.parse(part.specs),
      formFactor: part.formFactor,
      // Convert price from cents to dollars
      price: part.price / 100,
    }));

    return NextResponse.json(transformedParts);
  } catch (error) {
    console.error("Error fetching parts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function isValidCategory(category: string): category is PCPartCategory {
  const validCategories: PCPartCategory[] = ["case", "motherboard", "cpu", "gpu", "ram", "storage", "psu", "cooling"];
  return validCategories.includes(category as PCPartCategory);
} 
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { pcParts } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

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
      .where(eq(pcParts.category, category as PCPartCategory))
      .orderBy(desc(pcParts.price)); // Sort by price descending (non-zero prices first)

    // Transform the data to handle JSON strings and format names/prices
    const transformedParts = parts.map((part) => ({
      ...part,
      specs: JSON.parse(part.specs),
      formFactor: part.formFactor,
      // Convert price from cents to dollars, but only if price is not 0
      price: part.price > 0 ? part.price / 100 : 0,
      // Clean up the name by removing any duplicate brand mentions
      name: cleanupName(part.name, part.manufacturer)
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

function cleanupName(name: string, manufacturer: string): string {
  // Remove manufacturer from the beginning of the name if it's duplicated
  const regex = new RegExp(`^${manufacturer}\\s+`, 'i');
  return name.replace(regex, '').trim();
} 
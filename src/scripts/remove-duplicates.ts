import { db } from "../lib/db";
import { pcParts } from "../lib/db/schema";
import { eq, sql } from "drizzle-orm";

async function removeDuplicates() {
  console.log("Starting duplicate removal process...");
  
  try {
    // First, get all parts grouped by name with their counts
    const duplicatesQuery = await db
      .select({
        name: pcParts.name,
        count: sql<number>`count(*)`,
      })
      .from(pcParts)
      .groupBy(pcParts.name)
      .having(sql`count(*) > 1`);

    console.log(`Found ${duplicatesQuery.length} names with duplicates`);
    let totalRemoved = 0;

    for (const { name } of duplicatesQuery) {
      // Get all parts with this name
      const parts = await db
        .select()
        .from(pcParts)
        .where(eq(pcParts.name, name))
        .orderBy(sql`price DESC, specs DESC`); // Prefer parts with higher prices and more specs

      // Keep the first part (best one) and remove others
      const [bestPart, ...duplicates] = parts;
      
      if (duplicates.length > 0) {
        // Delete the duplicates
        for (const dupe of duplicates) {
          await db.delete(pcParts).where(eq(pcParts.id, dupe.id));
        }
        
        totalRemoved += duplicates.length;
        console.log(`Removed ${duplicates.length} duplicates for "${name}"`);
      }
    }

    console.log(`\n✅ Duplicate removal complete!`);
    console.log(`Total duplicates removed: ${totalRemoved}`);
    console.log(`Remaining unique parts: ${await db.select({ count: sql<number>`count(*)` }).from(pcParts)}`);

  } catch (error) {
    console.error("Error removing duplicates:", error);
  }
}

// Run the cleanup
removeDuplicates().catch(console.error); 
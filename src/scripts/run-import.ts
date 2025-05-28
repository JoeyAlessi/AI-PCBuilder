import fs from "fs";
import path from "path";
import { db } from "../lib/db"; // Adjust based on your project structure
import { pcParts } from "../lib/db/schema"; // Drizzle schema
import { nanoid } from "nanoid";

const allowedCategories = ["case", "motherboard", "cpu", "gpu", "ram", "storage", "psu", "cooling"];

// Map the JSON keys to our database categories
const categoryMap: { [key: string]: string } = {
  "power-supply": "psu",
  "video-card": "gpu",
  "internal-hard-drive": "storage",
  "memory": "ram",
  "cpu-cooler": "cooling"
};

async function importParts() {
  const filePath = path.join(process.cwd(), "src", "lib", "data", "pc_parts_2025-05-27_20-27-34.json");
  console.log("Reading file from:", filePath);

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileContent);

  let totalProcessed = 0;
  const batchSize = 100; // Process in batches of 100
  let currentBatch: any[] = [];

  for (const [key, jsonStr] of Object.entries(data)) {
    const normalizedKey = key.toLowerCase().replace(/-/g, "_");
    const category = categoryMap[key] || normalizedKey;

    if (!allowedCategories.includes(category)) {
      continue;
    }

    try {
      const parts = JSON.parse(jsonStr as string);
      const partsList = Array.isArray(parts[key]) ? parts[key] : [];

      for (const part of partsList) {
        const id = nanoid();
        const name = `${part.brand ?? ""} ${part.model ?? ""}`.trim();
        const manufacturer = part.brand ?? "Unknown";

        let price = 0;
        if (Array.isArray(part.price)) {
          const priceValue = parseFloat(part.price[1]);
          price = Math.round((priceValue || 0) * 100);
        }

        const specs = Object.entries(part)
          .filter(([k]) => !["price", "brand", "model"].includes(k))
          .map(([k, v]) => `${k}: ${JSON.stringify(v)}`);

        const entry = {
          id,
          type: category,
          category: category as any,
          name,
          manufacturer,
          price,
          image: "/placeholder.jpg",
          specs: JSON.stringify(specs),

          formFactor: part.form_factor ?? part.formFactor,
          socket: part.socket,
          cores: part.cores,
          baseSpeed: part.base_clock?.cycles ? `${part.base_clock.cycles / 1e9} GHz` : undefined,
          memory: part.memory,
          memoryType: part.module_type ?? part.memoryType,
          capacity: part.capacity?.total ? `${part.capacity.total / 1e9} GB` : undefined,
          storageType: part.storage_type,
          wattage: part.wattage ?? part.psu_wattage,
          efficiency: part.efficiency_rating ?? part.efficiency,
          coolingType: part.cooling_type,
          speed: part.speed?.cycles ? `${part.speed.cycles / 1e6} MHz` : undefined,
        };

        currentBatch.push(entry);

        if (currentBatch.length >= batchSize) {
          await db.insert(pcParts).values(currentBatch);
          totalProcessed += currentBatch.length;
          console.log(`Processed ${totalProcessed} parts...`);
          currentBatch = [];
        }
      }
    } catch (err) {
      console.error(`Error processing category ${key}:`, err);
    }
  }

  // Insert any remaining items
  if (currentBatch.length > 0) {
    await db.insert(pcParts).values(currentBatch);
    totalProcessed += currentBatch.length;
  }

  console.log(`✅ Import complete! Total parts processed: ${totalProcessed}`);
}

// Run the import
importParts().catch(console.error);

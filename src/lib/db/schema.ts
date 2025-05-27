import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const pcParts = sqliteTable("pc_parts", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  manufacturer: text("manufacturer").notNull(),
  price: integer("price").notNull(), // Price in cents
  image: text("image").notNull(),
  category: text("category", {
    enum: ["case", "motherboard", "cpu", "gpu", "ram", "storage", "psu", "cooling"],
  }).notNull(),
  specs: text("specs").notNull(), // JSON string of specs array
  formFactor: text("form_factor"), // JSON string of form factor array
  socket: text("socket"),
  cores: integer("cores"),
  baseSpeed: text("base_speed"),
  memory: text("memory"),
  memoryType: text("memory_type"),
  capacity: text("capacity"),
  storageType: text("storage_type"),
  wattage: integer("wattage"),
  efficiency: text("efficiency"),
  coolingType: text("cooling_type"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
}); 
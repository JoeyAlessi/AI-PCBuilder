import { drizzle } from 'drizzle-orm/bun-sqlite';
import { sql } from 'drizzle-orm';
import { pcParts } from '../data/pcParts';
import { pcParts as pcPartsTable } from './schema';
import { eq } from 'drizzle-orm';
import Database from 'better-sqlite3';

async function seed() {
  console.log('🌱 Starting database seed...');
  
  // Initialize the database connection
  const sqlite = new Database('sqlite.db');
  const db = drizzle(sqlite);
  
  // Delete existing records
  console.log('Clearing existing records...');
  await db.delete(pcPartsTable);
  
  // Prepare the data
  const partsToInsert = pcParts.map(part => ({
    id: part.id,
    name: part.name,
    manufacturer: part.manufacturer,
    price: Math.round(part.price * 100), // Convert to cents
    image: part.image,
    category: part.type,
    specs: Array.isArray(part.specs) ? JSON.stringify(part.specs) : part.specs,
    formFactor: part.formFactor ? JSON.stringify(part.formFactor) : null,
    socket: part.socket || null,
    cores: part.cores || null,
    baseSpeed: part.baseSpeed || null,
    memory: part.memory || null,
    memoryType: part.memoryType || null,
    capacity: part.capacity || null,
    storageType: part.storageType || null,
    wattage: part.wattage || null,
    efficiency: part.efficiency || null,
    coolingType: part.coolingType || null,
  }));

  // Insert data in chunks to avoid blocking
  const CHUNK_SIZE = 50;
  const chunks = [];
  
  for (let i = 0; i < partsToInsert.length; i += CHUNK_SIZE) {
    chunks.push(partsToInsert.slice(i, i + CHUNK_SIZE));
  }

  console.log(`Inserting ${partsToInsert.length} parts in ${chunks.length} chunks...`);

  await Promise.all(
    chunks.map(async (chunk, index) => {
      await db.insert(pcPartsTable).values(chunk);
      console.log(`✓ Chunk ${index + 1}/${chunks.length} inserted`);
    })
  );

  // Verify the data
  const count = await db.select({ count: sql`count(*)` }).from(pcPartsTable);
  console.log(`✅ Seed completed! Inserted ${count[0].count} parts`);

  // Close the database connection
  sqlite.close();
}

// Run the seed function
seed().catch(error => {
  console.error('Error seeding database:', error);
  process.exit(1);
}); 
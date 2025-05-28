import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { PCPart } from '../types';
import { Page } from 'puppeteer';

// Categories and their corresponding PCPartPicker URLs
const CATEGORIES = {
  case: 'https://pcpartpicker.com/products/case/',
  cpu: 'https://pcpartpicker.com/products/cpu/',
  gpu: 'https://pcpartpicker.com/products/video-card/',
  ram: 'https://pcpartpicker.com/products/memory/',
  storage: 'https://pcpartpicker.com/products/internal-hard-drive/',
  psu: 'https://pcpartpicker.com/products/power-supply/',
  cooling: 'https://pcpartpicker.com/products/cpu-cooler/',
  motherboard: 'https://pcpartpicker.com/products/motherboard/'
} as const;

async function scrapeCategory(
  page: Page, 
  category: keyof typeof CATEGORIES,
  url: string
): Promise<PCPart[]> {
  console.log(`Scraping ${category}...`);
  await page.goto(url);
  
  // Wait for the parts list to load
  await page.waitForSelector('.list-unstyled');
  
  // Extract data based on category
  const parts = await page.evaluate((cat: keyof typeof CATEGORIES) => {
    const items = document.querySelectorAll('.list-unstyled > li');
    return Array.from(items, (item) => {
      const nameEl = item.querySelector('a.tw-text-primary');
      const priceEl = item.querySelector('.tw-text-right');
      const manufacturerEl = item.querySelector('.list-manufactured-by');
      
      // Basic info available for all parts
      const name = nameEl?.textContent?.trim() || '';
      const manufacturer = manufacturerEl?.textContent?.trim() || '';
      const priceText = priceEl?.textContent?.trim() || '';
      const price = parseFloat(priceText.replace(/[^0-9.]/g, '')) || 0;
      
      // Generate a unique ID
      const id = `${cat}-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
      
      // Extract specs based on the category
      const specs: string[] = [];
      const specElements = item.querySelectorAll('.specs');
      specElements.forEach(spec => {
        const text = spec.textContent?.trim();
        if (text) specs.push(text);
      });

      // Base part object
      const part: Partial<PCPart> = {
        id,
        type: cat,
        category: cat,
        name,
        manufacturer,
        price,
        specs,
        image: `https://placeholder.com/400x400?text=${encodeURIComponent(name)}`,
      };

      // Add category-specific fields
      switch (cat) {
        case 'case':
          part.formFactor = specs.find(s => /ATX|ITX|EATX/i.test(s))?.split(' ')[0] || undefined;
          break;
        case 'motherboard':
          part.socket = specs.find(s => /Socket|AM[4-5]|LGA/i.test(s)) || undefined;
          part.formFactor = specs.find(s => /ATX|ITX|EATX/i.test(s))?.split(' ')[0] || undefined;
          break;
        case 'cpu':
          part.cores = parseInt(specs.find(s => /Cores/i.test(s))?.match(/\d+/)?.[0] || '0');
          part.socket = specs.find(s => /Socket|AM[4-5]|LGA/i.test(s)) || undefined;
          part.baseSpeed = specs.find(s => /GHz/i.test(s)) || undefined;
          break;
        case 'gpu':
          part.memory = specs.find(s => /GB|MB/i.test(s)) || undefined;
          part.memoryType = specs.find(s => /GDDR/i.test(s)) || undefined;
          break;
        case 'ram':
          part.capacity = specs.find(s => /GB|TB/i.test(s)) || undefined;
          part.speed = specs.find(s => /MHz|MT\/s/i.test(s)) || undefined;
          break;
        case 'storage':
          part.capacity = specs.find(s => /GB|TB/i.test(s)) || undefined;
          part.storageType = specs.find(s => /SSD|HDD|NVMe/i.test(s)) || undefined;
          break;
        case 'psu':
          part.wattage = parseInt(specs.find(s => /W/i.test(s))?.match(/\d+/)?.[0] || '0');
          part.efficiency = specs.find(s => /Bronze|Silver|Gold|Platinum|Titanium/i.test(s)) || undefined;
          break;
        case 'cooling':
          part.coolingType = specs.find(s => /Air|Liquid|AIO/i.test(s)) || undefined;
          break;
      }

      return part as PCPart;
    });
  }, category);

  return parts;
}

async function main() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set a reasonable viewport
  await page.setViewport({ width: 1280, height: 800 });
  
  const allParts: PCPart[] = [];
  
  // Scrape each category
  for (const [category, url] of Object.entries(CATEGORIES)) {
    try {
      const parts = await scrapeCategory(page, category as keyof typeof CATEGORIES, url);
      allParts.push(...parts);
      console.log(`✓ Scraped ${parts.length} ${category} parts`);
    } catch (error) {
      console.error(`Error scraping ${category}:`, error);
    }
  }

  // Save to file
  const outputPath = path.join(process.cwd(), 'src', 'lib', 'data', 'pcParts.ts');
  const fileContent = `import { PCPart } from '../types';\n\nexport const pcParts: PCPart[] = ${JSON.stringify(allParts, null, 2)};`;
  
  await fs.writeFile(outputPath, fileContent, 'utf-8');
  console.log(`\n✅ Saved ${allParts.length} parts to ${outputPath}`);
  
  await browser.close();
}

main().catch(console.error); 
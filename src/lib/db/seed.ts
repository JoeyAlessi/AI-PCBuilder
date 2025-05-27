import { db } from "./";
import { pcParts } from "./schema";

type PCPartCategory = "case" | "motherboard" | "cpu" | "gpu" | "ram" | "storage" | "psu" | "cooling";

interface SeedPart {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  image: string;
  category: PCPartCategory;
  specs: string;
  formFactor?: string;
  socket?: string;
  cores?: number;
  baseSpeed?: string;
}

// Helper function to convert dollars to cents
const toCents = (dollars: number) => Math.round(dollars * 100)

export async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Clear existing data
    await db.delete(pcParts);
    console.log("Cleared existing data");

    // Insert PC Cases
    await db.insert(pcParts).values([
      {
        id: 'lian-li-o11-dynamic-evo',
        name: 'O11 Dynamic EVO',
        manufacturer: 'Lian Li',
        price: toCents(169.99),
        image: '/images/cases/o11-dynamic-evo.jpg',
        category: 'case',
        specs: JSON.stringify({
          formFactor: ['ATX', 'Micro-ATX', 'Mini-ITX'],
          dimensions: '445mm x 285mm x 459mm',
          material: 'Aluminum, Steel, Tempered Glass',
          maxGPULength: '420mm',
          maxCPUCoolerHeight: '167mm',
          includedFans: 0,
          fanMounts: '10x 120mm or 7x 140mm',
          radiatorSupport: 'Up to 360mm',
          driveSlots: '6x 2.5" + 2x 3.5"',
          usbPorts: '1x USB 3.1 Type-C, 2x USB 3.0',
          features: ['Tool-free panels', 'Vertical GPU mount option', 'Reversible design']
        }),
        formFactor: 'ATX'
      },
      {
        id: 'fractal-design-torrent',
        name: 'Torrent',
        manufacturer: 'Fractal Design',
        price: toCents(189.99),
        image: 'https://www.fractal-design.com/products/cases/torrent/torrent/black-rgb-tg-light-tint/',
        category: 'case',
        specs: JSON.stringify({
          formFactor: ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX'],
          dimensions: '544mm x 242mm x 530mm',
          material: 'Steel, Tempered Glass',
          maxGPULength: '461mm',
          maxCPUCoolerHeight: '188mm',
          includedFans: 5,
          fanMounts: '9x 120mm or 7x 140mm',
          radiatorSupport: 'Up to 420mm',
          driveSlots: '4x 2.5" + 2x 3.5"',
          usbPorts: '1x USB 3.1 Type-C, 2x USB 3.0',
          features: ['High airflow design', 'Included 180mm fans', 'Tool-less design']
        }),
        formFactor: 'ATX'
      },
      {
        id: 'corsair-5000d-airflow',
        name: '5000D AIRFLOW',
        manufacturer: 'Corsair',
        price: toCents(174.99),
        image: 'https://m.media-amazon.com/images/I/71JF6W4gWvL.jpg',
        category: 'case',
        specs: JSON.stringify({
          formFactor: ['ATX', 'Micro-ATX', 'Mini-ITX'],
          dimensions: '520mm x 245mm x 520mm',
          material: 'Steel, Tempered Glass',
          maxGPULength: '420mm',
          maxCPUCoolerHeight: '170mm',
          includedFans: 2,
          fanMounts: '10x 120mm or 4x 140mm',
          radiatorSupport: 'Up to 360mm',
          driveSlots: '4x 2.5" + 2x 3.5"',
          usbPorts: '1x USB 3.1 Type-C, 2x USB 3.0',
          features: ['High airflow mesh front', 'RapidRoute cable management', 'Three chamber layout']
        }),
        formFactor: 'ATX'
      },
      {
        id: 'phanteks-eclipse-p500a',
        name: 'Eclipse P500A',
        manufacturer: 'Phanteks',
        price: toCents(149.99),
        image: 'https://m.media-amazon.com/images/I/71Qh3M7YhPL.jpg',
        category: 'case',
        specs: JSON.stringify({
          formFactor: ['ATX', 'E-ATX', 'Micro-ATX', 'Mini-ITX'],
          dimensions: '505mm x 240mm x 510mm',
          material: 'Steel, Tempered Glass',
          maxGPULength: '435mm',
          maxCPUCoolerHeight: '190mm',
          includedFans: 3,
          fanMounts: '7x 120mm or 7x 140mm',
          radiatorSupport: 'Up to 420mm',
          driveSlots: '3x 2.5" + 2x 3.5"',
          usbPorts: '1x USB 3.1 Type-C, 2x USB 3.0',
          features: ['Ultra-fine mesh front panel', 'D-RGB lighting', 'Cable management cover']
        }),
        formFactor: 'ATX'
      },
      {
        id: 'be-quiet-pure-base-500dx',
        name: 'Pure Base 500DX',
        manufacturer: 'be quiet!',
        price: toCents(109.99),
        image: 'https://m.media-amazon.com/images/I/71jQZh2qAkL.jpg',
        category: 'case',
        specs: JSON.stringify({
          formFactor: ['ATX', 'Micro-ATX', 'Mini-ITX'],
          dimensions: '450mm x 231mm x 463mm',
          material: 'Steel, Tempered Glass',
          maxGPULength: '369mm',
          maxCPUCoolerHeight: '190mm',
          includedFans: 3,
          fanMounts: '5x 120mm or 3x 140mm',
          radiatorSupport: 'Up to 360mm',
          driveSlots: '5x 2.5" + 2x 3.5"',
          usbPorts: '1x USB 3.1 Type-C, 2x USB 3.0',
          features: ['High airflow mesh design', 'ARGB lighting strips', 'Sound dampening']
        }),
        formFactor: 'ATX'
      },
      {
        id: 'nzxt-h7-flow',
        name: 'H7 Flow',
        manufacturer: 'NZXT',
        price: toCents(129.99),
        image: 'https://m.media-amazon.com/images/I/71wWCxPWj3L.jpg',
        category: 'case',
        specs: JSON.stringify({
          formFactor: ['ATX', 'Micro-ATX', 'Mini-ITX'],
          dimensions: '505mm x 230mm x 480mm',
          material: 'Steel, Tempered Glass',
          maxGPULength: '400mm',
          maxCPUCoolerHeight: '185mm',
          includedFans: 2,
          fanMounts: '7x 120mm or 4x 140mm',
          radiatorSupport: 'Up to 360mm',
          driveSlots: '4x 2.5" + 2x 3.5"',
          usbPorts: '1x USB 3.1 Type-C, 2x USB 3.0',
          features: ['Perforated panel design', 'Cable management bar', 'Tool-less design']
        }),
        formFactor: 'ATX'
      },
      {
        id: 'cooler-master-nr200p',
        name: 'NR200P',
        manufacturer: 'Cooler Master',
        price: toCents(99.99),
        image: 'https://m.media-amazon.com/images/I/71WcGxK7qbL.jpg',
        category: 'case',
        specs: JSON.stringify({
          formFactor: ['Mini-ITX', 'Mini-DTX'],
          dimensions: '376mm x 185mm x 292mm',
          material: 'Steel, Tempered Glass, Mesh',
          maxGPULength: '330mm',
          maxCPUCoolerHeight: '155mm',
          includedFans: 2,
          fanMounts: '7x 120mm or 2x 140mm',
          radiatorSupport: 'Up to 280mm',
          driveSlots: '2x 2.5" + 1x 3.5"',
          usbPorts: '2x USB 3.0',
          features: ['Vertical GPU mount option', 'Multiple panel options', 'Tool-less design']
        }),
        formFactor: 'Mini-ITX'
      },
      {
        id: 'meshify-2-compact',
        name: 'Meshify 2 Compact',
        manufacturer: 'Fractal Design',
        price: toCents(109.99),
        image: 'https://m.media-amazon.com/images/I/81p+yH22UhL.jpg',
        category: 'case',
        specs: JSON.stringify({
          formFactor: ['ATX', 'Micro-ATX', 'Mini-ITX'],
          dimensions: '424mm x 210mm x 475mm',
          material: 'Steel, Tempered Glass',
          maxGPULength: '360mm',
          maxCPUCoolerHeight: '169mm',
          includedFans: 3,
          fanMounts: '7x 120mm or 4x 140mm',
          radiatorSupport: 'Up to 360mm',
          driveSlots: '2x 2.5" + 2x 3.5"',
          usbPorts: '1x USB 3.1 Type-C, 2x USB 3.0',
          features: ['High-airflow mesh front', 'Nexus+ 2 fan hub', 'Tool-less design']
        }),
        formFactor: 'ATX'
      },
      {
        id: 'phanteks-evolv-x',
        name: 'Enthoo Evolv X',
        manufacturer: 'Phanteks',
        price: toCents(199.99),
        image: 'https://m.media-amazon.com/images/I/61RqgM7VjRL.jpg',
        category: 'case',
        specs: JSON.stringify({
          formFactor: ['E-ATX', 'ATX', 'Micro-ATX', 'Mini-ITX'],
          dimensions: '520mm x 240mm x 510mm',
          material: 'Aluminum, Steel, Tempered Glass',
          maxGPULength: '435mm',
          maxCPUCoolerHeight: '190mm',
          includedFans: 3,
          fanMounts: '10x 120mm or 7x 140mm',
          radiatorSupport: 'Up to 420mm',
          driveSlots: '6x 2.5" + 4x 3.5"',
          usbPorts: '1x USB 3.1 Type-C, 2x USB 3.0',
          features: ['Dual System Support', 'Integrated D-RGB', 'Tool-less design']
        }),
        formFactor: 'ATX'
      },
      {
        id: 'silverstone-raven-rv03',
        name: 'Raven RV03',
        manufacturer: 'SilverStone',
        price: toCents(159.99),
        image: 'https://m.media-amazon.com/images/I/41jG0T4I1nL.jpg',
        category: 'case',
        specs: JSON.stringify({
          formFactor: ['ATX', 'Micro-ATX', 'Mini-ITX'],
          dimensions: '522mm x 242mm x 485mm',
          material: 'Steel, Plastic',
          maxGPULength: '420mm',
          maxCPUCoolerHeight: '162mm',
          includedFans: 2,
          fanMounts: '6x 120mm or 4x 140mm',
          radiatorSupport: 'Up to 280mm',
          driveSlots: '4x 2.5" + 3x 3.5"',
          usbPorts: '2x USB 3.0',
          features: ['90-degree motherboard mounting', 'Positive air pressure design', 'Tool-less drive cages']
        }),
        formFactor: 'ATX'
      }
    ]);

    console.log("✅ Database seeded successfully");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

// Run seeding
seed(); 
import { PCPart } from '@/lib/types';

export const pcParts: PCPart[] = [
  // Cases
  {
    id: 'case-1',
    type: 'case',
    name: 'Corsair 4000D Airflow',
    manufacturer: 'Corsair',
    price: 94.99,
    formFactor: ['ATX', 'mATX', 'ITX'],
    specs: [
      'High-Airflow Front Panel',
      'Tempered Glass Side Panel',
      '2x 120mm Fans Included',
      'USB 3.0 Type-C'
    ],
    image: 'https://example.com/placeholder-4000d.jpg'
  },
  {
    id: 'case-2',
    type: 'case',
    name: 'Lian Li O11 Dynamic EVO',
    manufacturer: 'Lian Li',
    price: 169.99,
    formFactor: ['ATX', 'mATX', 'ITX'],
    specs: [
      'Dual-Chamber Design',
      'Triple Tempered Glass',
      'Reversible Design',
      'Hot-Swappable Front Panel'
    ],
    image: 'https://example.com/placeholder-o11.jpg'
  },
  {
    id: 'case-3',
    type: 'case',
    name: 'NZXT H510 Flow',
    manufacturer: 'NZXT',
    price: 89.99,
    formFactor: ['ATX', 'mATX', 'ITX'],
    specs: [
      'Perforated Front Panel',
      'Cable Management Bar',
      'Tempered Glass Panel',
      'USB 3.1 Type-C'
    ],
    image: 'https://example.com/placeholder-h510.jpg'
  },

  // Motherboards
  {
    id: 'mb-1',
    type: 'motherboard',
    name: 'ROG STRIX B650-A GAMING WIFI',
    manufacturer: 'ASUS',
    price: 279.99,
    socket: 'AM5',
    formFactor: 'ATX',
    specs: [
      'DDR5 Memory',
      'PCIe 5.0',
      'WiFi 6E',
      '2.5Gb Ethernet'
    ],
    image: 'https://example.com/placeholder-strix.jpg'
  },
  {
    id: 'mb-2',
    type: 'motherboard',
    name: 'MSI MPG B760I EDGE WIFI',
    manufacturer: 'MSI',
    price: 209.99,
    socket: 'LGA 1700',
    formFactor: 'Mini-ITX',
    specs: [
      'DDR5 Memory',
      'PCIe 4.0',
      'WiFi 6E',
      'Thunderbolt 4'
    ],
    image: 'https://example.com/placeholder-msi.jpg'
  },
  {
    id: 'mb-3',
    type: 'motherboard',
    name: 'GIGABYTE X670E AORUS MASTER',
    manufacturer: 'Gigabyte',
    price: 499.99,
    socket: 'AM5',
    formFactor: 'ATX',
    specs: [
      'DDR5 Memory',
      'PCIe 5.0',
      '10Gb Ethernet',
      'Advanced Thermal Design'
    ],
    image: 'https://example.com/placeholder-aorus.jpg'
  },

  // CPUs
  {
    id: 'cpu-1',
    type: 'cpu',
    name: 'Ryzen 7 7800X3D',
    manufacturer: 'AMD',
    price: 449.99,
    socket: 'AM5',
    cores: 8,
    baseSpeed: '4.2 GHz',
    specs: [
      '8 Cores / 16 Threads',
      '104MB Total Cache',
      '120W TDP',
      '3D V-Cache Technology'
    ],
    image: 'https://example.com/placeholder-7800x3d.jpg'
  },
  {
    id: 'cpu-2',
    type: 'cpu',
    name: 'Core i5-14600K',
    manufacturer: 'Intel',
    price: 319.99,
    socket: 'LGA 1700',
    cores: 14,
    baseSpeed: '3.5 GHz',
    specs: [
      '14 Cores (6P + 8E)',
      '24 Threads',
      '125W Base TDP',
      'Integrated Graphics'
    ],
    image: 'https://example.com/placeholder-14600k.jpg'
  },
  {
    id: 'cpu-3',
    type: 'cpu',
    name: 'Ryzen 5 7600',
    manufacturer: 'AMD',
    price: 229.99,
    socket: 'AM5',
    cores: 6,
    baseSpeed: '3.8 GHz',
    specs: [
      '6 Cores / 12 Threads',
      '38MB Total Cache',
      '65W TDP',
      'Wraith Stealth Cooler'
    ],
    image: 'https://example.com/placeholder-7600.jpg'
  },

  // GPUs
  {
    id: 'gpu-1',
    type: 'gpu',
    name: 'RTX 4070 GAMING X TRIO',
    manufacturer: 'MSI',
    price: 599.99,
    memory: '12GB',
    memoryType: 'GDDR6X',
    specs: [
      'DLSS 3',
      'Ray Tracing',
      'Triple Fan Design',
      '225W TDP'
    ],
    image: 'https://example.com/placeholder-4070.jpg'
  },
  {
    id: 'gpu-2',
    type: 'gpu',
    name: 'RX 7800 XT GAMING OC',
    manufacturer: 'Gigabyte',
    price: 549.99,
    memory: '16GB',
    memoryType: 'GDDR6',
    specs: [
      'FSR 3',
      'Ray Tracing',
      'WINDFORCE Cooling',
      '263W TDP'
    ],
    image: 'https://example.com/placeholder-7800xt.jpg'
  },
  {
    id: 'gpu-3',
    type: 'gpu',
    name: 'RTX 4060 Ti DUAL',
    manufacturer: 'ASUS',
    price: 399.99,
    memory: '8GB',
    memoryType: 'GDDR6',
    specs: [
      'DLSS 3',
      'Ray Tracing',
      'Dual Fan Design',
      '160W TDP'
    ],
    image: 'https://example.com/placeholder-4060ti.jpg'
  },

  // RAM
  {
    id: 'ram-1',
    type: 'ram',
    name: 'Vengeance RGB DDR5',
    manufacturer: 'Corsair',
    price: 134.99,
    capacity: '32GB (2x16GB)',
    speed: '6000MHz',
    specs: [
      'CL30 Timing',
      'RGB Lighting',
      'Low Profile Design',
      'iCUE Compatible'
    ],
    image: 'https://example.com/placeholder-vengeance.jpg'
  },
  {
    id: 'ram-2',
    type: 'ram',
    name: 'Trident Z5 RGB',
    manufacturer: 'G.Skill',
    price: 154.99,
    capacity: '32GB (2x16GB)',
    speed: '6400MHz',
    specs: [
      'CL32 Timing',
      'RGB Lighting',
      'Aluminum Heat Spreader',
      'XMP 3.0'
    ],
    image: 'https://example.com/placeholder-trident.jpg'
  },
  {
    id: 'ram-3',
    type: 'ram',
    name: 'Fury Beast DDR5',
    manufacturer: 'Kingston',
    price: 114.99,
    capacity: '32GB (2x16GB)',
    speed: '5600MHz',
    specs: [
      'CL36 Timing',
      'Low Profile',
      'Intel XMP Certified',
      'Plug-N-Play'
    ],
    image: 'https://example.com/placeholder-fury.jpg'
  },

  // Storage
  {
    id: 'storage-1',
    type: 'storage',
    name: '980 PRO',
    manufacturer: 'Samsung',
    price: 159.99,
    capacity: '2TB',
    storageType: 'NVMe',
    specs: [
      'PCIe 4.0',
      '7000 MB/s Read',
      '5100 MB/s Write',
      'Nickel-Coated Controller'
    ],
    image: 'https://example.com/placeholder-980pro.jpg'
  },
  {
    id: 'storage-2',
    type: 'storage',
    name: 'SN850X',
    manufacturer: 'Western Digital',
    price: 149.99,
    capacity: '2TB',
    storageType: 'NVMe',
    specs: [
      'PCIe 4.0',
      '7300 MB/s Read',
      '6300 MB/s Write',
      'Game Mode 2.0'
    ],
    image: 'https://example.com/placeholder-sn850x.jpg'
  },
  {
    id: 'storage-3',
    type: 'storage',
    name: 'MX500',
    manufacturer: 'Crucial',
    price: 89.99,
    capacity: '2TB',
    storageType: 'SSD',
    specs: [
      'SATA III',
      '560 MB/s Read',
      '510 MB/s Write',
      'AES 256-bit Encryption'
    ],
    image: 'https://example.com/placeholder-mx500.jpg'
  },

  // PSUs
  {
    id: 'psu-1',
    type: 'psu',
    name: 'RM850x',
    manufacturer: 'Corsair',
    price: 149.99,
    wattage: 850,
    efficiency: '80+ Gold',
    specs: [
      'Fully Modular',
      'Zero RPM Fan Mode',
      'Japanese Capacitors',
      '10-Year Warranty'
    ],
    image: 'https://example.com/placeholder-rm850x.jpg'
  },
  {
    id: 'psu-2',
    type: 'psu',
    name: 'ROG Thor 1000W',
    manufacturer: 'ASUS',
    price: 249.99,
    wattage: 1000,
    efficiency: '80+ Platinum',
    specs: [
      'OLED Power Display',
      'RGB Lighting',
      'Fully Modular',
      'IP5X Dust Resistance'
    ],
    image: 'https://example.com/placeholder-thor.jpg'
  },
  {
    id: 'psu-3',
    type: 'psu',
    name: 'Focus GX-750',
    manufacturer: 'Seasonic',
    price: 129.99,
    wattage: 750,
    efficiency: '80+ Gold',
    specs: [
      'Fully Modular',
      'Hybrid Fan Control',
      'Compact Design',
      '10-Year Warranty'
    ],
    image: 'https://example.com/placeholder-focus.jpg'
  },

  // Cooling
  {
    id: 'cooling-1',
    type: 'cooling',
    name: 'H150i ELITE LCD',
    manufacturer: 'Corsair',
    price: 289.99,
    coolingType: 'AIO',
    specs: [
      '360mm Radiator',
      'LCD Display',
      'ML RGB ELITE Fans',
      'iCUE Compatible'
    ],
    image: 'https://example.com/placeholder-h150i.jpg'
  },
  {
    id: 'cooling-2',
    type: 'cooling',
    name: 'NH-D15 chromax.black',
    manufacturer: 'Noctua',
    price: 109.99,
    coolingType: 'Air',
    specs: [
      'Dual Tower Design',
      '2x 140mm Fans',
      'All-Black Design',
      'SecuFirm2 Mounting'
    ],
    image: 'https://example.com/placeholder-nhd15.jpg'
  },
  {
    id: 'cooling-3',
    type: 'cooling',
    name: 'Kraken Z73',
    manufacturer: 'NZXT',
    price: 279.99,
    coolingType: 'AIO',
    specs: [
      '360mm Radiator',
      'LCD Display',
      'Aer P Radiator Fans',
      'CAM-Powered'
    ],
    image: 'https://example.com/placeholder-z73.jpg'
  },
]; 
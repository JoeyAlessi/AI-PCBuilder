export interface PCPart {
  id: string;
  type: 'case' | 'motherboard' | 'cpu' | 'gpu' | 'ram' | 'storage' | 'psu' | 'cooling';
  category: 'case' | 'motherboard' | 'cpu' | 'gpu' | 'ram' | 'storage' | 'psu' | 'cooling';
  name: string;
  manufacturer: string;
  price: number;
  image: string;
  specs: string[] | string;
  // Additional properties based on type
  formFactor?: string | string[];
  socket?: string;
  cores?: number;
  baseSpeed?: string;
  memory?: string;
  memoryType?: string;
  capacity?: string;
  storageType?: string;
  wattage?: number;
  efficiency?: string;
  coolingType?: string;
  speed?: string; // For RAM speed
} 
import { PCPart } from "@/lib/types";

type ComponentCategory =
  | "case"
  | "motherboard"
  | "cpu"
  | "gpu"
  | "ram"
  | "storage"
  | "psu"
  | "cooling";

interface PCCaseProps {
  installedComponents: Partial<Record<ComponentCategory, PCPart>>;
}

export const PCCase: React.FC<PCCaseProps> = ({ installedComponents }) => {
  return (
    <div className="text-white text-center">
      <h2 className="text-xl font-semibold mb-2">PC Case View</h2>
      <ul className="space-y-1 text-sm text-gray-300">
        {Object.entries(installedComponents).map(([key, comp]) => (
          <li key={key}>
            {key.toUpperCase()}: {comp.name} (${comp.price})
          </li>
        ))}
      </ul>
    </div>
  );
};

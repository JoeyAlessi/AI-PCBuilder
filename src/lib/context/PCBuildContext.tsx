"use client";
import { createContext, useContext, ReactNode, useState } from "react";
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

interface PCBuildContextType {
  selectedParts: Partial<Record<ComponentCategory, PCPart>>;
  updatePart: (category: ComponentCategory, part: PCPart | null) => void;
  getSelectedPartsDescription: () => string;
  clearAllParts: () => void;
}

const PCBuildContext = createContext<PCBuildContextType | undefined>(undefined);

export function PCBuildProvider({ children }: { children: ReactNode }) {
  const [selectedParts, setSelectedParts] = useState<
    Partial<Record<ComponentCategory, PCPart>>
  >({});

  const updatePart = (category: ComponentCategory, part: PCPart | null) => {
    setSelectedParts((prev) => {
      if (part === null) {
        const { [category]: removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [category]: part };
    });
  };

  const getSelectedPartsDescription = () => {
    if (Object.keys(selectedParts).length === 0) {
      return "No components have been selected yet.";
    }

    const parts = Object.entries(selectedParts)
      .map(
        ([category, part]) =>
          `${category.charAt(0).toUpperCase() + category.slice(1)}: ${
            part.manufacturer
          } ${part.name} ($${part.price.toFixed(2)})`
      )
      .join("\n");

    return `Currently selected components:\n${parts}`;
  };

  const clearAllParts = () => {
    setSelectedParts({});
  };

  return (
    <PCBuildContext.Provider
      value={{
        selectedParts,
        updatePart,
        getSelectedPartsDescription,
        clearAllParts,
      }}
    >
      {children}
    </PCBuildContext.Provider>
  );
}

export function usePCBuild() {
  const context = useContext(PCBuildContext);
  if (context === undefined) {
    throw new Error("usePCBuild must be used within a PCBuildProvider");
  }
  return context;
}

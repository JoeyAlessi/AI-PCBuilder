"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ComponentDisplay } from "@/components/ComponentDisplay";
import { PCCase } from "@/components/PCCase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResizablePanel } from "@/components/ui/resizable-panel";
import { PCPart } from "@/lib/types";
import { usePCBuild } from "@/lib/context/PCBuildContext";

const componentCategories = [
  { id: "case", name: "Case" },
  { id: "motherboard", name: "Motherboard" },
  { id: "cpu", name: "CPU" },
  { id: "gpu", name: "Graphics Card" },
  { id: "ram", name: "Memory" },
  { id: "storage", name: "Storage" },
  { id: "psu", name: "Power Supply" },
  { id: "cooling", name: "Cooling" },
] as const;

type ComponentCategory = (typeof componentCategories)[number]["id"];

const SelectCaseMessage = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <p className="text-xl text-white font-medium">Please select a case first</p>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
  </div>
);

export const PCVisualizer = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<ComponentCategory>("case");
  const [categoryParts, setCategoryParts] = useState<PCPart[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { selectedParts, updatePart } = usePCBuild();

  useEffect(() => {
    const fetchParts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/parts?category=${selectedCategory}`);
        if (!response.ok) {
          throw new Error("Failed to fetch parts");
        }
        const data = await response.json();
        setCategoryParts(data);
      } catch (err) {
        setError("Error loading parts. Please try again.");
        console.error("Error fetching parts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParts();
  }, [selectedCategory]);

  const handleTabChange = (tabId: ComponentCategory) => {
    // Only allow changing tabs if a case is selected or if selecting the case tab
    if (selectedParts.case || tabId === "case") {
      setSelectedCategory(tabId);
    }
  };

  const isCaseSelected = Boolean(selectedParts.case);

  return (
    <div className="relative h-full flex flex-col overflow-hidden rounded-lg border border-gray-800 bg-gray-950">
      {/* PC Case Display */}
      <div
        className="flex items-center justify-center relative"
        style={{ height: "70%" }}
      >
        <PCCase installedComponents={selectedParts} />
        {!isCaseSelected && <SelectCaseMessage />}
      </div>

      {/* Component Selector */}
      <ResizablePanel>
        <Tabs
          defaultValue="case"
          value={selectedCategory}
          onValueChange={(value) => handleTabChange(value as ComponentCategory)}
          className="w-full flex flex-col h-full px-4"
        >
          <div className="flex justify-center mb-4 overflow-x-auto scrollbar-none">
            <TabsList className="flex flex-nowrap bg-gray-800 border border-gray-700 rounded-lg">
              {componentCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  disabled={!isCaseSelected && category.id !== "case"}
                  className={cn(
                    "px-3 py-1.5 text-sm whitespace-nowrap transition",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    selectedParts[category.id]
                      ? "text-blue-400 border-b-2 border-blue-500"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  {category.name}
                  {selectedParts[category.id] && (
                    <span className="ml-1.5 text-xs">✓</span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            {componentCategories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="mt-0 h-full"
              >
                {isLoading ? (
                  <LoadingSpinner />
                ) : error ? (
                  <div className="text-red-500 text-center p-4">{error}</div>
                ) : (
                  <ComponentDisplay
                    parts={categoryParts}
                    selectedPart={selectedParts[category.id] || null}
                    onSelectPart={(component) =>
                      updatePart(category.id, component)
                    }
                    disabled={!isCaseSelected && category.id !== "case"}
                  />
                )}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </ResizablePanel>
    </div>
  );
};

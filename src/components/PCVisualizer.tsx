"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ComponentDisplay } from "@/components/ComponentDisplay";
import { PCCase } from "@/components/PCCase";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const componentCategories = [
  { id: "cpu", name: "CPU" },
  { id: "motherboard", name: "Motherboard" },
  { id: "gpu", name: "Graphics Card" },
  { id: "ram", name: "Memory" },
  { id: "storage", name: "Storage" },
  { id: "psu", name: "Power Supply" },
  { id: "cooling", name: "Cooling" },
  { id: "case", name: "Case" },
];

export const PCVisualizer = () => {
  const [selectedCategory, setSelectedCategory] = useState("cpu");
  const [installedComponents, setInstalledComponents] = useState<
    Record<string, any>
  >({});

  const handleComponentSelection = (category: string, component: any) => {
    setInstalledComponents((prev) => ({
      ...prev,
      [category]: component,
    }));
    setSelectedCategory(category);
  };

  return (
    <div className="h-full flex flex-col p-4 overflow-hidden">
      {/* PC Case Display */}
      <div className="flex-1 flex items-center justify-center border border-gray-800 bg-gray-950 rounded-lg mb-6">
        <PCCase installedComponents={installedComponents} />
      </div>

      {/* Component Selector */}
      <Tabs
        defaultValue="cpu"
        value={selectedCategory}
        onValueChange={setSelectedCategory}
        className="w-full"
      >
        <div className="flex justify-center mb-4 overflow-x-auto scrollbar-none">
          <TabsList className="flex flex-nowrap bg-gray-800 border border-gray-700 rounded-lg">
            {componentCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className={cn(
                  "px-3 py-1.5 text-sm whitespace-nowrap transition",
                  installedComponents[category.id]
                    ? "text-blue-400 border-b-2 border-blue-500"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {componentCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <ComponentDisplay
              category={category.id}
              onSelectComponent={(component) =>
                handleComponentSelection(category.id, component)
              }
              selectedComponent={installedComponents[category.id]}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

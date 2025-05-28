import React, { useState, useMemo } from "react";
import { PCPart } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ComponentDisplayProps {
  parts: PCPart[];
  selectedPart: PCPart | null;
  onSelectPart: (part: PCPart | null) => void;
  disabled?: boolean;
}

export const ComponentDisplay: React.FC<ComponentDisplayProps> = ({
  parts,
  selectedPart,
  onSelectPart,
  disabled = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredParts = useMemo(() => {
    if (!searchQuery.trim()) return parts;

    const query = searchQuery.toLowerCase();
    return parts.filter(
      (part) =>
        part.name.toLowerCase().includes(query) ||
        part.manufacturer.toLowerCase().includes(query)
    );
  }, [parts, searchQuery]);

  return (
    <div className="flex flex-col h-full">
      {/* Search Bar */}
      <div className="p-4 pb-2 sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search parts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Parts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4 pt-2">
        {filteredParts.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-8">
            No parts found matching "{searchQuery}"
          </div>
        ) : (
          filteredParts.map((part) => {
            const isSelected = selectedPart?.id === part.id;

            return (
              <button
                key={part.id}
                className={cn(
                  "relative w-full rounded-xl border transition-all duration-200 ease-in-out",
                  "hover:scale-[1.02] hover:shadow-lg hover:cursor-pointer",
                  "bg-gray-800/40 backdrop-blur-sm overflow-hidden",
                  isSelected
                    ? "border-blue-500 bg-blue-500/10 shadow-blue-500/20"
                    : disabled
                    ? "cursor-not-allowed border-gray-700 opacity-50"
                    : "border-gray-700 hover:border-gray-500 shadow-black/20"
                )}
                onClick={() => {
                  if (!disabled) {
                    onSelectPart(isSelected ? null : part);
                  }
                }}
                disabled={disabled}
              >
                {/* Image Container */}
                <div className="aspect-[4/2] w-full bg-gray-900">
                  <img
                    src={part.image}
                    alt={part.name}
                    className={cn(
                      "h-full w-full object-contain transition-transform duration-300",
                      !disabled && "hover:scale-105"
                    )}
                  />
                </div>

                {/* Content Container */}
                <div className="p-4 flex items-center justify-between bg-gray-900/50">
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-medium text-gray-100 truncate">
                      {part.name}
                    </h3>
                    {part.manufacturer && part.manufacturer !== "Unknown" && (
                      <p className="text-sm text-gray-400 truncate">
                        {part.manufacturer}
                      </p>
                    )}
                    {part.price > 0 && (
                      <span className="text-xl font-bold text-blue-400 block mt-1">
                        ${part.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Selection Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-xl border-2 transition-opacity",
                    isSelected
                      ? "border-blue-500 opacity-100 shadow-lg shadow-blue-500/20"
                      : "border-blue-500/50 opacity-0"
                  )}
                />
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

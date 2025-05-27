import React from "react";
import { PCPart } from "@/lib/types";
import { cn } from "@/lib/utils";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
      {parts.map((part) => {
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
            <div className="aspect-[4/3] w-full bg-gray-900">
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
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-100 truncate">
                  {part.name}
                </h3>
                <span className="text-xl font-bold text-blue-400">
                  ${part.price.toFixed(2)}
                </span>
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
      })}
    </div>
  );
};

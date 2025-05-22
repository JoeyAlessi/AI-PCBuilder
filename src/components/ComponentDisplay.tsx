import React from "react";
import { Button } from "@/components/ui/button";

export const ComponentDisplay = ({
  category,
  onSelectComponent,
  selectedComponent,
}: {
  category: string;
  onSelectComponent: (component: any) => void;
  selectedComponent: any;
}) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {[1, 2, 3].map((n) => (
        <Button
          key={n}
          variant={
            selectedComponent?.name === `${category} ${n}`
              ? "default"
              : "outline"
          }
          onClick={() =>
            onSelectComponent({
              name: `${category} ${n}`,
              id: `${category}-${n}`,
              price: n * 100,
            })
          }
        >
          {category} {n}
        </Button>
      ))}
    </div>
  );
};

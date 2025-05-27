import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ResizablePanelProps {
  children: React.ReactNode;
  className?: string;
  defaultHeight?: number;
  minHeight?: number;
  maxHeight?: number;
}

export function ResizablePanel({
  children,
  className,
  defaultHeight = 35,
  minHeight = 35,
  maxHeight = 90,
}: ResizablePanelProps) {
  const [height, setHeight] = useState(defaultHeight);
  const [isDragging, setIsDragging] = useState(false);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const startDragY = useRef<number>(0);
  const startHeight = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerHeight =
        containerRef.current.parentElement?.clientHeight || 0;
      const deltaY = startDragY.current - e.clientY;
      const deltaPercent = (deltaY / containerHeight) * 100;
      const newHeight = Math.min(
        Math.max(startHeight.current + deltaPercent, minHeight),
        maxHeight
      );

      setHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, minHeight, maxHeight]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startDragY.current = e.clientY;
    startHeight.current = height;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 shadow-lg transition-transform duration-200",
        className
      )}
      style={{ height: `${height}%` }}
    >
      {/* Drag Handle */}
      <div
        ref={dragHandleRef}
        className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize group"
        onMouseDown={handleMouseDown}
      >
        <div className="h-full bg-gray-700 group-hover:bg-blue-500 transition-colors" />
      </div>

      {/* Content */}
      <div className="h-full pt-2 overflow-hidden">{children}</div>
    </div>
  );
}

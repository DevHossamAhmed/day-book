import React from "react";
import { SlidersHorizontal } from "lucide-react";

type FilterButtonProps = {
  isOpen: boolean;
  onClick: () => void;
  activeFilterCount?: number;
  className?: string;
};

export default function FilterButton({
  isOpen,
  onClick,
  activeFilterCount = 0,
  className = "",
}: FilterButtonProps) {
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-sm font-medium ${className} ${
        isOpen || hasActiveFilters
          ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
          : "text-gray-700 border-gray-300 hover:bg-gray-50"
      }`}
    >
      <SlidersHorizontal size={16} />
      Filter
      {hasActiveFilters && (
        <span className="ml-1 px-1.5 py-0.5 bg-white text-blue-600 rounded-full text-xs font-semibold">
          {activeFilterCount}
        </span>
      )}
    </button>
  );
}


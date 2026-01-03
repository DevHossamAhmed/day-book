import React from "react";
import SearchBar from "./SearchBar";

type PageActionsProps = {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  actions: React.ReactNode;
  className?: string;
};

export default function PageActions({
  search,
  onSearchChange,
  searchPlaceholder = "Search...",
  actions,
  className = "",
}: PageActionsProps) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 ${className}`}>
      <SearchBar
        value={search}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
      />
      <div className="flex gap-3">{actions}</div>
    </div>
  );
}


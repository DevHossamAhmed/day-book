import React from "react";

export type FilterField = {
  type: "date" | "select" | "number" | "text";
  label: string;
  value: string;
  onChange: (value: string) => void;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  disabled?: boolean;
};

type FilterPanelProps = {
  isOpen: boolean;
  fields: FilterField[];
  onClearFilters: () => void;
  className?: string;
};

export default function FilterPanel({
  isOpen,
  fields,
  onClearFilters,
  className = "",
}: FilterPanelProps) {
  if (!isOpen) return null;

  return (
    <div className={`p-6 border-b border-gray-200 bg-gray-50 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fields.map((field, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            {field.type === "date" && (
              <input
                type="date"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
            {field.type === "select" && (
              <select
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                disabled={field.disabled}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
            {field.type === "number" && (
              <input
                type="number"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
            {field.type === "text" && (
              <input
                type="text"
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )}
          </div>
        ))}
      </div>

      {/* Filter Actions */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={onClearFilters}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}


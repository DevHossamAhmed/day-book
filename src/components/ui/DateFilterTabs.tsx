import React from "react";
import { formatDate } from "@/lib/utils/date.util";

type DateFilterTabsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs?: string[];
  showDatePicker?: boolean;
  className?: string;
};

const defaultTabs = ["Yesterday", "Today", "Tomorrow"];

export default function DateFilterTabs({
  activeTab,
  onTabChange,
  tabs = defaultTabs,
  showDatePicker = true,
  className = "",
}: DateFilterTabsProps) {
  return (
    <div className={`p-6 border-b border-gray-200 ${className}`}>
      <div className="flex items-center justify-between gap-6 flex-wrap">
        {showDatePicker && (
          <div className="flex gap-6">
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm">
              Day
            </button>
            <button className="flex items-center gap-2 text-gray-700 font-medium text-sm">
              {formatDate(new Date(), "Do MMMM, YYYY")}
            </button>
          </div>
        )}

        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`font-medium text-sm pb-1 transition-colors ${
                activeTab === tab
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

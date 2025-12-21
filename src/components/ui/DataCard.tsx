import React from "react";

type DataCardProps<T> = {
  data: T[];
  renderItem: (item: T) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
};

export default function DataCard<T extends { id: string | number }>({
  data,
  renderItem,
  emptyMessage = "No records found",
  className = "",
}: DataCardProps<T>) {
  if (data.length === 0) {
    return (
      <div className={`text-center py-12 text-gray-500 ${className}`}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {data.map((item) => (
        <div key={item.id}>{renderItem(item)}</div>
      ))}
    </div>
  );
}

import React from "react";

type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  className?: string;
};

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  onRowClick,
  emptyMessage = "No records found",
  className = "",
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">{emptyMessage}</div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-4 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 ${
                    column.className || ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
            {data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={`${
                  onRowClick ? "hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer" : ""
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={`px-6 py-4 text-gray-900 dark:text-gray-100 ${
                      column.className || ""
                    }`}
                  >
                    {column.render
                      ? column.render(item)
                      : (item[column.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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
      <div className="px-6 py-12 text-center text-[var(--color-muted)]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div
      className={`bg-[var(--color-surface)] rounded-lg border border-[var(--color-border)] overflow-hidden ${className}`}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--color-border)]">
          <thead className="bg-[var(--color-gray-50)]">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-6 py-4 text-left text-sm font-semibold text-[var(--color-text-muted)] ${
                    column.className || ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)] bg-[var(--color-surface)]">
            {data.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick?.(item)}
                className={`${
                  onRowClick
                    ? "hover:bg-[var(--color-gray-50)] cursor-pointer"
                    : ""
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)}
                    className={`px-6 py-4 text-[var(--color-text)] ${
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

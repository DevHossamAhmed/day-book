/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Converts data array to CSV format and downloads it as an Excel file
 * @param data Array of objects to export
 * @param filename Name of the file to download
 * @param headers Optional custom headers mapping (key: display name)
 */
export function exportToExcel<T extends Record<string, any>>(
  data: T[],
  filename: string,
  headers?: Record<keyof T, string>
): void {
  if (data.length === 0) {
    throw new Error("No data to export");
  }

  // Get all unique keys from the data
  const keys = Object.keys(data[0]) as Array<keyof T>;

  // Create header row
  const headerRow = keys
    .map((key) => {
      const headerName = headers?.[key] || String(key);
      return escapeCSVValue(headerName);
    })
    .join(",");

  // Create data rows
  const dataRows = data.map((item) =>
    keys
      .map((key) => {
        const value = item[key];
        return escapeCSVValue(formatValue(value));
      })
      .join(",")
  );

  // Combine header and data rows
  const csvContent = [headerRow, ...dataRows].join("\n");

  // Create BOM for UTF-8 (helps Excel recognize encoding)
  const BOM = "\uFEFF";
  const blob = new Blob([BOM + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  // Create download link
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Escapes CSV values that contain commas, quotes, or newlines
 */
function escapeCSVValue(value: string): string {
  if (value == null || value === undefined) {
    return "";
  }

  const stringValue = String(value);

  // If value contains comma, quote, or newline, wrap in quotes and escape quotes
  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n") ||
    stringValue.includes("\r")
  ) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

/**
 * Formats a value for CSV export
 */
function formatValue(value: any): string {
  if (value == null || value === undefined) {
    return "";
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

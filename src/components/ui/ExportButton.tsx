import React from "react";
import ExcelIcon from "@/lib/icons/Excel.icon";

type ExportButtonProps = {
  onClick: () => void;
  isExporting?: boolean;
  className?: string;
};

export default function ExportButton({
  onClick,
  isExporting = false,
  className = "",
}: ExportButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isExporting}
      className={`px-6 py-3 border border-green-600 cursor-pointer text-green-700 rounded-lg  font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <ExcelIcon />
      {isExporting ? "Exporting..." : "Export Excel"}
    </button>
  );
}


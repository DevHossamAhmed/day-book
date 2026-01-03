import React from "react";

type EmptyStateProps = {
  message?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
};

export default function EmptyState({
  message = "No records found",
  icon,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`text-center py-12 text-gray-500 flex flex-col items-center gap-4 ${className}`}
    >
      {icon && <div className="text-gray-400">{icon}</div>}
      <p>{message}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

import React from "react";

type PageHeaderProps = {
  title: string;
  actions?: React.ReactNode;
  className?: string;
};

export default function PageHeader({
  title,
  actions,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {actions && <div className="flex gap-3">{actions}</div>}
      </div>
    </div>
  );
}

import React from "react";
import Breadcrumb, { BreadcrumbItem } from "./Breadcrumb";

interface PageTitleProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ 
  title, 
  breadcrumbs,
  className = "" 
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <Breadcrumb items={breadcrumbs} />
      )}
      <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
    </div>
  );
};

export default PageTitle;


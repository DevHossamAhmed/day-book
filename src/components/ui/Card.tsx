import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
};

export default function Card({
  children,
  className = "",
  padding = true,
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${
        padding ? "p-6" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

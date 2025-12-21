"use client";
import React, { useState } from "react";
import Image from "next/image";

type AvatarProps = {
  src?: string | null;
  alt: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
};

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const getColorFromName = (name: string): string => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-teal-500",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export default function Avatar({
  src,
  alt,
  name = "User",
  size = "md",
  className = "",
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const initials = getInitials(name);
  const colorClass = getColorFromName(name);
  const sizeClass = sizeClasses[size];

  // Show fallback if no src or image error
  const showFallback = !src || imageError;

  if (showFallback) {
    return (
      <div
        className={`${sizeClass} ${colorClass} rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0 ${className}`}
        title={alt}
      >
        {initials}
      </div>
    );
  }

  return (
    <div className={`${sizeClass} rounded-full overflow-hidden flex-shrink-0 relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={size === "sm" ? 32 : size === "md" ? 40 : size === "lg" ? 48 : 64}
        height={size === "sm" ? 32 : size === "md" ? 40 : size === "lg" ? 48 : 64}
        className="rounded-full object-cover w-full h-full"
        onError={() => setImageError(true)}
        unoptimized
      />
    </div>
  );
}

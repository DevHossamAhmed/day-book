import React from "react";

const PageLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default PageLoading;


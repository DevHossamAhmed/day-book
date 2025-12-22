"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import { X, Upload, File } from "lucide-react";

type FileUploadProps = {
  onChange?: (files: File[]) => void;
  value?: File[];
  error?: boolean;
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
};

export default function FileUpload({
  onChange,
  value = [],
  error = false,
  multiple = true,
  accept = "image/*,.pdf,.doc,.docx",
  maxSize = 10 * 1024 * 1024, // 10MB default
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previews, setPreviews] = useState<{ file: File; preview: string }[]>(
    []
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync previews when value prop changes (when parent resets files)
  useEffect(() => {
    if (value.length === 0 && previews.length > 0) {
      setPreviews([]);
    }
  }, [value.length, previews.length]);

  // Convert files to previews
  const processFiles = useCallback(
    (files: File[]) => {
      const validFiles: File[] = [];
      const previewPromises: Promise<{ file: File; preview: string }>[] = [];

      files.forEach((file) => {
        if (file.size > maxSize) {
          alert(`File "${file.name}" exceeds the maximum size of ${maxSize / (1024 * 1024)}MB`);
          return;
        }

        validFiles.push(file);

        // Create preview for images
        if (file.type.startsWith("image/")) {
          const promise = new Promise<{ file: File; preview: string }>(
            (resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => {
                resolve({
                  file,
                  preview: reader.result as string,
                });
              };
              reader.readAsDataURL(file);
            }
          );
          previewPromises.push(promise);
        } else {
          previewPromises.push(
            Promise.resolve({ file, preview: "" })
          );
        }
      });

      Promise.all(previewPromises).then((previewData) => {
        setPreviews(previewData);
        if (onChange) {
          onChange(validFiles);
        }
      });
    },
    [maxSize, onChange]
  );

  // Handle file selection
  const handleFileSelect = useCallback(
    (files: FileList | null) => {
      if (!files) return;

      const fileArray = Array.from(files);
      const filesToAdd = multiple
        ? [...value, ...fileArray]
        : fileArray.slice(0, 1);

      processFiles(filesToAdd);
    },
    [multiple, value, processFiles]
  );

  // Handle drag events
  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      handleFileSelect(files);
    },
    [handleFileSelect]
  );

  // Handle file input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(e.target.files);
      // Reset input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [handleFileSelect]
  );

  // Remove file
  const removeFile = useCallback(
    (index: number) => {
      const newFiles = value.filter((_, i) => i !== index);
      const newPreviews = previews.filter((_, i) => i !== index);
      setPreviews(newPreviews);
      if (onChange) {
        onChange(newFiles);
      }
    },
    [value, previews, onChange]
  );

  // Clear all files
  const clearAll = useCallback(() => {
    setPreviews([]);
    if (onChange) {
      onChange([]);
    }
  }, [onChange]);

  return (
    <div className="space-y-3">
      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : error
            ? "border-red-300 bg-red-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-3">
          <div className={`p-3 rounded-full ${
            isDragging ? "bg-blue-100" : "bg-gray-100"
          }`}>
            <Upload
              size={24}
              className={isDragging ? "text-blue-600" : "text-gray-400"}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              {isDragging
                ? "Drop files here"
                : "Drag & drop files here, or click to browse"}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supported: Images, PDF, DOC, DOCX (Max {maxSize / (1024 * 1024)}MB)
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {value.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              {value.length} file{value.length > 1 ? "s" : ""} selected
            </p>
            {value.length > 1 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {value.map((file, index) => {
              const preview = previews[index]?.preview;
              const isImage = file.type.startsWith("image/");

              return (
                <div
                  key={`${file.name}-${index}`}
                  className="relative border border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  {isImage && preview ? (
                    <div className="aspect-video mb-2 overflow-hidden rounded">
                      <img
                        src={preview}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-video mb-2 bg-gray-200 rounded flex items-center justify-center">
                      <File size={24} className="text-gray-400" />
                    </div>
                  )}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-gray-700 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                      className="p-1 hover:bg-red-100 rounded transition-colors flex-shrink-0"
                    >
                      <X size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}


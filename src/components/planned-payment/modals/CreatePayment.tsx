"use client";
import React from "react";
import { X, Calendar, ChevronDown, Save } from "lucide-react";

type Props = {
  onClose: () => void;
  onSave: () => void;
};

export default function CreatePayment({ onClose, onSave }: Props) {
  const closeDialog = () => {
    onClose();
  };

  const handleSave = () => {
    // TODO: Implement save logic
    if (onSave) onSave();
    closeDialog();
  };

  const handleSaveAndNew = () => {
    // TODO: Implement save and new logic
    if (onSave) onSave();
    // Don't close, just reset form
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/5 bg-opacity-50 z-40"
        onClick={closeDialog}
      />

      {/* Side Panel */}
      <div className="fixed top-0 right-0 h-full w-[560px] bg-white shadow-2xl z-9999 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Add Planned Payment
          </h2>
          <button
            onClick={closeDialog}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Vendor */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Vendor
            </label>
            <div className="relative">
              <select className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-500">
                <option value=""></option>
              </select>
              <ChevronDown
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Purpose */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Purpose
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Amount
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Due Date and Payment Method */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Due Date
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select date"
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                />
                <Calendar
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Payment Method
              </label>
              <div className="relative">
                <select className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-500">
                  <option value=""></option>
                  <option value="cash">Cash</option>
                  <option value="account">Account</option>
                </select>
                <ChevronDown
                  size={20}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Status
            </label>
            <div className="relative">
              <select className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-500">
                <option value=""></option>
                <option value="upcoming">Upcoming</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
              <ChevronDown
                size={20}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Note
            </label>
            <textarea
              placeholder="Receipt Info (optional)"
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-500"
            />
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
          <button
            onClick={handleSaveAndNew}
            className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
          >
            Save and New
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2"
          >
            <Save size={18} />
            Save
          </button>
        </div>
      </div>
    </>
  );
}

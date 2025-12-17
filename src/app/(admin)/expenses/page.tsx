"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  MoreVertical,
  Plus,
  X,
  Calendar,
  ChevronDown,
  Image,
  Save,
} from "lucide-react";

const ExpensesPage = () => {
  const [isCreateExpenseOpen, setIsCreateExpenseOpen] = useState(false);

  const expenses = [
    {
      id: 1,
      title: "Electricity",
      seller: "Mahmoud Ahmed",
      time: "9:30 AM",
      amount: "$35,000",
      type: "Account",
    },
    {
      id: 2,
      title: "Internet/Phone",
      seller: "Sajid Nahvi",
      time: "9:30 AM",
      amount: "$30,000",
      type: "Cash",
    },
    {
      id: 3,
      title: "Travel",
      seller: "Sajid Nahvi",
      time: "9:30 AM",
      amount: "$30,000",
      type: "Cash",
    },
    {
      id: 4,
      title: "Misc (Tea,Snacks, Etc)",
      seller: "Sajid Nahvi",
      time: "9:30 AM",
      amount: "$30,000",
      type: "Cash",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
        </div>

        {/* Create Expenses Button and Menu */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setIsCreateExpenseOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium shadow-sm"
          >
            <Plus size={20} />
            Create Expenses
          </button>
          <button className="bg-white border border-gray-200 p-2.5 rounded-lg hover:bg-gray-50">
            <MoreVertical size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Date Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Day
              </button>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="font-medium text-sm">21st September, 2025</span>
                <ChevronRight size={16} className="rotate-90" />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button className="text-gray-500 hover:text-gray-700 font-medium text-sm pb-1 transition-colors">
                Yesterday
              </button>
              <button className="text-blue-600 font-medium text-sm border-b-2 border-blue-600 pb-1">
                Today
              </button>
              <button className="text-gray-500 hover:text-gray-700 font-medium text-sm pb-1 transition-colors">
                Tomorrow
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                <SlidersHorizontal size={16} />
                Filter
              </button>
              <button className="flex items-center justify-center w-10 h-10 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Search size={18} />
              </button>
            </div>
          </div>
          {/* Expenses List */}
          <div className="space-y-1">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {expense.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          expense.type === "Cash"
                            ? "bg-green-100 text-green-700"
                            : "bg-pink-100 text-pink-700"
                        }`}
                      >
                        {expense.type}
                      </span>
                      <span className="text-sm text-gray-600">
                        {expense.seller}
                      </span>
                      <span className="text-sm text-gray-600">
                        {expense.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {expense.amount}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <button className="w-10 h-10 bg-blue-600 text-white rounded-lg font-medium text-sm">
              1
            </button>
            <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium text-sm text-gray-700 transition-colors">
              2
            </button>
            <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium text-sm text-gray-700 transition-colors">
              3
            </button>
            <span className="px-2 text-gray-500">...</span>
            <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium text-sm text-gray-700 transition-colors">
              8
            </button>
            <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium text-sm text-gray-700 transition-colors">
              9
            </button>
            <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium text-sm text-gray-700 transition-colors">
              10
            </button>

            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
              <span>Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Create Expense Side Panel */}
      {isCreateExpenseOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/5 bg-opacity-50 z-40"
            onClick={() => setIsCreateExpenseOpen(false)}
          />

          {/* Side Panel */}
          <div className="fixed top-0 right-0 h-full w-[560px] bg-white shadow-2xl z-9999 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Create Expense
              </h2>
              <button
                onClick={() => setIsCreateExpenseOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Date
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

              {/* Expense Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Expense Type
                </label>
                <div className="relative">
                  <select className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-500">
                    <option value=""></option>
                    <option value="electricity">Electricity</option>
                    <option value="internet">Internet/Phone</option>
                    <option value="travel">Travel</option>
                    <option value="misc">Misc (Tea,Snacks, Etc)</option>
                  </select>
                  <ChevronDown
                    size={20}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
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

              {/* Payment Method */}
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

              {/* Attachment */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Attachment
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Image size={36} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-400 text-sm">Drag & Drop Receipt</p>
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Note
                </label>
                <textarea
                  placeholder="Receipt Info (optional)"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-500"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
              <button className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                Save and New
              </button>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2">
                <Save size={18} />
                Save
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpensesPage;

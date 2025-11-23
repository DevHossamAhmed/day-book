"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  ArrowLeftRight,
  MoreVertical,
  SlidersHorizontal,
  Search,
  X,
  Save,
  ArrowUpDown,
} from "lucide-react";

const OpeningBalancePage = () => {
  const [selectedDate, setSelectedDate] = useState(21);
  const [activeTab, setActiveTab] = useState("Today");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isPNLModalOpen, setIsPNLModalOpen] = useState(false);

  const dates = [
    { day: 19, label: "Sun" },
    { day: 20, label: "Mon" },
    { day: 21, label: "Tue" },
    { day: 22, label: "Wed" },
    { day: 23, label: "Thu" },
    { day: 24, label: "Fri" },
    { day: 25, label: "Sat" },
  ];

  const transactions = [
    {
      id: 1,
      type: "Cash in Sale Counter",
      status: "Added",
      user: "Sajid Nahvi",
      time: "9:30 AM",
      amount: "$30,000",
    },
    {
      id: 2,
      type: "Cash in Sale Counter",
      status: "Added",
      user: "Sajid Nahvi",
      time: "9:30 AM",
      amount: "$30,000",
    },
    {
      id: 3,
      type: "Cash in Sale Counter",
      status: "Added",
      user: "Sajid Nahvi",
      time: "9:30 AM",
      amount: "$30,000",
    },
    {
      id: 4,
      type: "Cash in Bank",
      status: "Transfer",
      user: "Sajid Nahvi",
      time: "9:30 AM",
      amount: "$30,000",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Opening Balance</h1>
          <button
            onClick={() => setIsPNLModalOpen(true)}
            className="cursor-pointer flex items-center gap-3 bg-gradient-to-r from-blue-400 to-blue-700 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            <div className="w-8 h-8 border border-[#cefa8c] bg-[#0d81e0] bg-opacity-20 rounded-full flex items-center justify-center">
              <ArrowUpDown size={20} className="text-[#cefa8c]" />
            </div>
            <span className="font-semibold text-[#cefa8c]">
              Today&lsquo;s PNL: $30,211
            </span>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          {/* Action Buttons */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-3">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex cursor-pointer items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              >
                <Plus size={18} />
                Create Entry
              </button>
              <button
                onClick={() => setIsTransferModalOpen(true)}
                className="flex cursor-pointer items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300"
              >
                <ArrowLeftRight size={18} />
                Transfer
              </button>
              <button className="flex items-center justify-center w-10 h-10 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors border border-gray-300">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Date Navigation */}
          <div className="p-6 border-b border-gray-200">
            {/* Tabs */}
            <div className="flex items-center justify-between gap-6 mb-6">
              <div className="flex gap-6">
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm">
                  Day
                </button>
                <button className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                  21st September, 2025
                  <ChevronRight size={16} className="rotate-90" />
                </button>
              </div>
              <div className="flex gap-6 ">
                {["Yesterday", "Today", "Tomorrow"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`font-medium text-sm pb-1 transition-colors ${
                      activeTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex justify-end gap-3 mb-4">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                  <SlidersHorizontal size={16} />
                  Filter
                </button>
                <button className="flex items-center justify-center w-10 h-10 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* Calendar */}
            <div className="flex items-center justify-between">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft size={20} className="text-gray-600" />
              </button>

              <div className="flex gap-4">
                {dates.map((date) => (
                  <button
                    key={date.day}
                    onClick={() => setSelectedDate(date.day)}
                    className={`flex flex-col items-center justify-center w-16 h-20 rounded-2xl transition-all ${
                      selectedDate === date.day
                        ? "bg-blue-600 text-white shadow-lg scale-105"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-2xl font-bold mb-1">{date.day}</span>
                    <span className="text-xs font-medium opacity-80">
                      {date.label}
                    </span>
                  </button>
                ))}
              </div>

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="p-6">
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {transaction.type}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span
                          className={`px-2 py-0.5 rounded font-medium ${
                            transaction.status === "Added"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {transaction.status}
                        </span>
                        <span className="text-gray-600">
                          {transaction.user} {transaction.time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-end gap-2">
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                ← Previous
              </button>
              <button className="w-10 h-10 bg-blue-600 text-white rounded-lg font-medium text-sm">
                1
              </button>
              <button className="w-10 h-10 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm">
                2
              </button>
              <button className="w-10 h-10 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm">
                3
              </button>
              <span className="px-2 text-gray-500">...</span>
              <button className="w-10 h-10 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm">
                8
              </button>
              <button className="w-10 h-10 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm">
                9
              </button>
              <button className="w-10 h-10 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium text-sm">
                10
              </button>
              <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                Next →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Create Entry Modal */}
      {isCreateModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-end z-[9999]"
          onClick={() => setIsCreateModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md h-full shadow-2xl animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Create Entry
                </h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Date Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-3 text-gray-400">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Source Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Source
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                      <option value="">Select source</option>
                      <option value="cash-sale">Cash in Sale Counter</option>
                      <option value="cash-bank">Cash in Bank</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                      <ChevronRight size={20} className="rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Amount Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="text"
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Note Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Note
                  </label>
                  <textarea
                    placeholder="Receipt Info (optional)"
                    //@ts-expect-error:row
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Save and New
                  </button>
                  <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
                    <Save size={18} />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transfer Modal */}
      {isTransferModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-end z-[9999]"
          onClick={() => setIsTransferModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md h-full shadow-2xl animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Transfer Cash
                </h2>
                <button
                  onClick={() => setIsTransferModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Date Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-3 text-gray-400">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* From Account Field */}
                <div>
                  <div className="relative">
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
                      <option value="cash-sale">Cash in Sale Counter</option>
                      <option value="cash-bank">Cash in Bank</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                      <ChevronRight size={20} className="rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Transfer Arrow */}
                <div className="flex justify-center">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="text-gray-600"
                    >
                      <path
                        d="M10 4L10 16M10 16L6 12M10 16L14 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* To Account Field */}
                <div>
                  <div className="relative">
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900">
                      <option value="undeposited">Undeposited Fund</option>
                      <option value="cash-sale">Cash in Sale Counter</option>
                      <option value="cash-bank">Cash in Bank</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                      <ChevronRight size={20} className="rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Amount Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="text"
                    placeholder="Select date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-sm text-blue-600 font-medium mt-2">
                    21,000 Available in Cash Counter
                  </p>
                </div>

                {/* Attachment Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Attachment
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center gap-2">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        className="text-gray-400"
                      >
                        <rect
                          x="8"
                          y="12"
                          width="24"
                          height="20"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle cx="15" cy="19" r="2" fill="currentColor" />
                        <path
                          d="M32 26L27 21L20 28"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-sm text-gray-500 font-medium">
                        Drag & Drop Receipt
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Info Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Info
                  </label>
                  <textarea
                    placeholder="Receipt Info (optional)"
                    //@ts-expect-error:row
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
                  <Save size={18} />
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PNL Details Modal */}
      {isPNLModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-end z-[9999]"
          onClick={() => setIsPNLModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-md h-full shadow-2xl animate-slide-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col h-full">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Create Entry
                </h2>
                <button
                  onClick={() => setIsPNLModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Date Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute right-3 top-3 text-gray-400">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Source Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Source
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                      <option value="">Select source</option>
                      <option value="cash-sale">Cash in Sale Counter</option>
                      <option value="cash-bank">Cash in Bank</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                      <ChevronRight size={20} className="rotate-90" />
                    </div>
                  </div>
                </div>

                {/* Amount Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Amount
                  </label>
                  <input
                    type="text"
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Note Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Note
                  </label>
                  <textarea
                    placeholder="Receipt Info (optional)"
                    //@ts-expect-error:row
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsCreateModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Save and New
                  </button>
                  <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
                    <Save size={18} />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OpeningBalancePage;

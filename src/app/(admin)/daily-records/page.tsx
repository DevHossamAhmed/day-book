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
  ArrowUpDown,
} from "lucide-react";
import EntryDetails from "@/components/modals/EntryDetails";
import CreateDailyRecord from "@/components/daily-record/models/CreateDialyRecord";
import CreateTransfer from "@/components/daily-record/models/CreateTransfer";

const OpeningBalancePage = () => {
  const [selectedDate, setSelectedDate] = useState(21);
  const [activeTab, setActiveTab] = useState("Today");

  const [isOpenCreateRecord, setOpenCreateRecord] = useState(false);
  const [isOpenCreateTransfer, setOpenCreateTransfer] = useState(false);
  const [isEntryDetailsOpen, setIsEntryDetailsOpen] = useState(false);

  const openCreateRecord = () => setOpenCreateRecord(true);
  const closeCreateRecord = () => setOpenCreateRecord(false);

  const openCreateTransfer = () => setOpenCreateTransfer(true);
  const closeCreateTransfer = () => setOpenCreateTransfer(false);


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
                onClick={() => openCreateRecord()}
                className="flex cursor-pointer items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              >
                <Plus size={18} />
                Create Entry
              </button>
              <button
                onClick={() => openCreateTransfer()}
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
                    className={`font-medium text-sm pb-1 transition-colors ${activeTab === tab
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
                    className={`flex flex-col items-center justify-center w-16 h-20 rounded-2xl transition-all ${selectedDate === date.day
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
                  onClick={() => setIsEntryDetailsOpen(true)}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {transaction.type}
                      </h3>
                      <div className="flex items-center gap-2 text-sm">
                        <span
                          className={`px-2 py-0.5 rounded font-medium ${transaction.status === "Added"
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
      {isOpenCreateRecord && <CreateDailyRecord onClose={closeCreateRecord} />}

      {/* Transfer Modal */}
      {isOpenCreateTransfer && (<CreateTransfer onClose={closeCreateTransfer} />)}

      <EntryDetails isOpen={isEntryDetailsOpen} onClose={() => setIsEntryDetailsOpen(false)}
      />

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

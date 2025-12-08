"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, MoreVertical, Plus, X, Calendar, ChevronDown, Image, Save } from 'lucide-react';
import { formatDate, getDateByLabel } from '@/lib/utils/date.util';
import CreateIncome from '@/components/income/modals/CreateIncome';

const IncomePage = () => {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [dateFilter, setDateFilter] = useState<string>(getDateByLabel("today"));
  const [isCreateIncomeOpen, setIsCreateIcomeOpen] = useState(false);

  const openCreateIncome = () => setIsCreateIcomeOpen(true);
  const closeCreateIncome = () => setIsCreateIcomeOpen(false);


  const setDateToFilter = (value: string) => {
    setActiveTab(value);
    setDateFilter(getDateByLabel(value.toLowerCase()));
  }

  const onSave = () => {

  }

  const sales = [
    {
      id: 1,
      title: 'Illaaj Online Sale',
      seller: 'Mahmoud Ahmed',
      time: '9:30 AM',
      amount: '$35,000',
      type: 'Cash'
    },
    {
      id: 2,
      title: 'Store Sale',
      seller: 'Sajid Nahvi',
      time: '9:30 AM',
      amount: '$30,000',
      type: 'Account'
    },
    {
      id: 3,
      title: '1MG Sale',
      seller: 'Sajid Nahvi',
      time: '9:30 AM',
      amount: '$30,000',
      type: 'Cash'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6" >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Income</h1>
        </div>

        {/* Create Sale Button and Menu */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => openCreateIncome()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm"
          >
            <Plus size={20} />
            Create Sale
          </button>
          <button className="bg-white border border-gray-200 p-2.5 rounded-lg hover:bg-gray-50">
            <MoreVertical size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          {/* Date Navigation */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between gap-6">
              <div className="flex gap-6">
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm">
                  Day
                </button>
                <button className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                  {formatDate(new Date(), "Do MMMM, YYYY")}
                  <ChevronRight size={16} className="rotate-90" />
                </button>
              </div>
              <div className="flex gap-6 ">
                {["Yesterday", "Today", "Tomorrow"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setDateToFilter(tab)}
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
          </div>

          {/* Sales List */}
          <div className="p-6 space-y-1">
            {sales.map((sale) => (
              <div
                key={sale.id}
                className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{sale.title}</h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${sale.type === 'Cash'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-pink-100 text-pink-700'
                          }`}
                      >
                        {sale.type}
                      </span>
                      <span className="text-sm text-gray-600">{sale.seller}</span>
                      <span className="text-sm text-gray-600">{sale.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900">{sale.amount}</div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end gap-2 mt-8 p-6 border-t border-gray-100">
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <ChevronLeft size={18} />
              <span>Previous</span>
            </button>

            <button className="w-10 h-10 bg-blue-600 text-white rounded-lg font-medium">1</button>
            <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium">2</button>
            <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium">3</button>
            <span className="px-2">...</span>
            <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium">8</button>
            <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium">9</button>
            <button className="w-10 h-10 hover:bg-gray-100 rounded-lg font-medium">10</button>

            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <span>Next</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Create Income Side Panel */}
      {isCreateIncomeOpen && <CreateIncome onClose={closeCreateIncome} onSave={onSave} />}
    </div>
  );
};

export default IncomePage;
"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, MoreVertical, Plus, X, Calendar, ChevronDown, Image, Save } from 'lucide-react';

const IncomePage = () => {
  const [selectedDate, setSelectedDate] = useState(21);
  const [isCreateSaleOpen, setIsCreateSaleOpen] = useState(false);
  
  const dates = [
    { day: 19, name: 'Sun' },
    { day: 20, name: 'Mon' },
    { day: 21, name: 'Tue' },
    { day: 22, name: 'Wed' },
    { day: 23, name: 'Thu' },
    { day: 24, name: 'Fri' },
    { day: 25, name: 'Sat' }
  ];

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
            onClick={() => setIsCreateSaleOpen(true)}
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          {/* Date Navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">
                Day
              </button>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="font-medium">21st September, 2025</span>
                <ChevronRight size={20} className="transform rotate-90" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="text-gray-600 hover:text-gray-900 font-medium">Yesterday</button>
              <button className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">Today</button>
              <button className="text-gray-600 hover:text-gray-900 font-medium">Tomorrow</button>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <SlidersHorizontal size={18} />
                <span className="font-medium">Filter</span>
              </button>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Search size={18} />
              </button>
            </div>
          </div>

          {/* Calendar Week View */}
          <div className="flex items-center justify-between mb-8">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {dates.map((date) => (
                <button
                  key={date.day}
                  onClick={() => setSelectedDate(date.day)}
                  className={`flex flex-col items-center justify-center w-20 h-20 rounded-2xl transition-all ${
                    selectedDate === date.day
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="text-2xl font-bold">{date.day}</span>
                  <span className="text-sm">{date.name}</span>
                </button>
              ))}
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Sales List */}
          <div className="space-y-1">
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
                        className={`text-xs px-2 py-0.5 rounded ${
                          sale.type === 'Cash'
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
          <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-gray-100">
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
      {isCreateSaleOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/5 bg-opacity-50 z-[*999]"
            onClick={() => setIsCreateSaleOpen(false)}
          />
          
          {/* Side Panel */}
          <div className="fixed top-0 right-0 h-full w-[560px] bg-white shadow-2xl z-[999999] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Create Income</h2>
              <button 
                onClick={() => setIsCreateSaleOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Date</label>
                <div className="relative flex justify-between">
                  <input
                    type="text"
                    placeholder="Select date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Calendar size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Channel */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Channel</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value=""></option>
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sales Person */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Sales Person</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value=""></option>
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Amount</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Payment Method</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    <option value=""></option>
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Attachment */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Attachment</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors cursor-pointer">
                  <Image size={40} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500 text-sm">Drag & Drop Receipt</p>
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Note</label>
                <textarea
                  placeholder="Receipt Info (optional)"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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

export default IncomePage;
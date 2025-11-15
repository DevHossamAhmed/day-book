"use client"
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, MoreVertical, Plus, X, Calendar, ChevronDown, Save, Copy } from 'lucide-react';

const PlannedPaymentPage = () => {
  const [selectedDate, setSelectedDate] = useState(21);
  const [isCreatePaymentOpen, setIsCreatePaymentOpen] = useState(false);
  
  const dates = [
    { day: 19, name: 'Sun' },
    { day: 20, name: 'Mon' },
    { day: 21, name: 'Tue' },
    { day: 22, name: 'Wed' },
    { day: 23, name: 'Thu' },
    { day: 24, name: 'Fri' },
    { day: 25, name: 'Sat' }
  ];

  const payments = [
    {
      id: 1,
      title: 'AHCH Corp.',
      seller: 'Sajid Nahvi',
      time: '9:30 AM',
      amount: '$35,000',
      type: 'Cash',
      status: 'Upcoming',
      hasIcon: true
    },
    {
      id: 2,
      title: 'Salary',
      seller: 'Sajid Nahvi',
      time: '9:30 AM',
      amount: '$35,000',
      type: 'Account',
      status: 'Upcoming',
      hasIcon: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6" >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Planned Payment</h1>
        </div>

        {/* Create Payment Button and Menu */}
        <div className="flex gap-2 mb-6">
          <button 
            onClick={() => setIsCreatePaymentOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm"
          >
            <Plus size={20} />
            Create Payment
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

          {/* Payments List */}
          <div className="space-y-1">
            {payments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{payment.title}</h3>
                      {payment.hasIcon && (
                        <Copy size={16} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          payment.type === 'Cash'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-pink-100 text-pink-700'
                        }`}
                      >
                        {payment.type}
                      </span>
                      <span className="text-sm text-gray-600">{payment.seller}</span>
                      <span className="text-sm text-gray-600">{payment.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-orange-500">{payment.status}</span>
                  <div className="text-xl font-bold text-gray-900">{payment.amount}</div>
                </div>
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

      {/* Add Planned Payment Side Panel */}
      {isCreatePaymentOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/5 bg-opacity-50 z-40"
            onClick={() => setIsCreatePaymentOpen(false)}
          />
          
          {/* Side Panel */}
          <div className="fixed top-0 right-0 h-full w-[560px] bg-white shadow-2xl z-[9999] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Add Planned Payment</h2>
              <button 
                onClick={() => setIsCreatePaymentOpen(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Vendor */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Vendor</label>
                <div className="relative">
                  <select className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-500">
                    <option value=""></option>
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Purpose</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Amount</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Due Date and Payment Method */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Due Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Select date"
                      className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                    />
                    <Calendar size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Payment Method</label>
                  <div className="relative">
                    <select className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-500">
                      <option value=""></option>
                      <option value="cash">Cash</option>
                      <option value="account">Account</option>
                    </select>
                    <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Status</label>
                <div className="relative">
                  <select className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-500">
                    <option value=""></option>
                    <option value="upcoming">Upcoming</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                  <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Note</label>
                <textarea
                  placeholder="Receipt Info (optional)"
                  rows={5}
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

export default PlannedPaymentPage;
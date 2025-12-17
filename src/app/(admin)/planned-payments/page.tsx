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
  Save,
  Copy,
  Trash2,
  Printer,
} from "lucide-react";
import { formatDate } from "@/lib/utils/date.util";

const PlannedPaymentPage = () => {
  const [isCreatePaymentOpen, setIsCreatePaymentOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const payments = [
    {
      id: 1,
      date: "19/09/2025",
      title: "AHCH Corp.",
      seller: "Sajid Nahvi",
      time: "9:30 AM",
      amount: "$40,500",
      type: "Cash",
      status: "Upcoming",
      hasIcon: true,
      note: "This is an additional information. If available this section will show otherwise it will be hidden.",
      attachment: true,
    },
    {
      id: 2,
      date: "19/09/2025",
      title: "Salary",
      seller: "Sajid Nahvi",
      time: "9:30 AM",
      amount: "$35,000",
      type: "Account",
      status: "Upcoming",
      hasIcon: false,
      note: "Monthly salary payment",
      attachment: false,
    },
  ];
  //@ts-expect-error:Payment
  const handleRowClick = (payment) => {
    setSelectedPayment(payment);
    setIsDetailsOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Planned Payment</h1>
        </div>

        {/* Create Payment Button and Menu */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setIsCreatePaymentOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium shadow-sm"
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Day
              </button>
              <div className="flex items-center gap-2 text-gray-700">
                <span className="font-medium text-sm">{formatDate(new Date(), "Do MMMM, YYYY")}</span>
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
          {/* Payments List */}
          <div className="space-y-1">
            {payments.map((payment) => (
              <div
                key={payment.id}
                onClick={() => handleRowClick(payment)}
                className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {payment.title}
                      </h3>
                      {payment.hasIcon && (
                        <Copy size={16} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          payment.type === "Cash"
                            ? "bg-green-100 text-green-700"
                            : "bg-pink-100 text-pink-700"
                        }`}
                      >
                        {payment.type}
                      </span>
                      <span className="text-sm text-gray-600">
                        {payment.seller}
                      </span>
                      <span className="text-sm text-gray-600">
                        {payment.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-orange-500">
                    {payment.status}
                  </span>
                  <div className="text-xl font-bold text-gray-900">
                    {payment.amount}
                  </div>
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

      {/* Add Planned Payment Side Panel */}
      {isCreatePaymentOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/5 bg-opacity-50 z-40"
            onClick={() => setIsCreatePaymentOpen(false)}
          />

          {/* Side Panel */}
          <div className="fixed top-0 right-0 h-full w-[560px] bg-white shadow-2xl z-9999 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Add Planned Payment
              </h2>
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

      {/* Payment Details Side Panel */}
      {isDetailsOpen && selectedPayment && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/5 bg-opacity-50 z-40"
            onClick={() => setIsDetailsOpen(false)}
          />

          {/* Side Panel */}
          <div className="fixed top-0 right-0 h-full w-[560px] bg-white shadow-2xl z-9999 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Planned Payment
              </h2>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium">
                  <Trash2 size={18} />
                  Delete
                </button>
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-lg"
                >
                  <X size={24} className="text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Payment Info Card */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">
                      {
                        //@ts-expect-error:Payment
                        selectedPayment.date
                      }
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {
                        //@ts-expect-error:Payment
                        selectedPayment.title
                      }
                    </h3>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    {
                      //@ts-expect-error:Payment
                      selectedPayment.amount
                    }
                  </div>
                </div>
              </div>

              {/* Note Section */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">
                  Note
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {
                      //@ts-expect-error:Payment
                      selectedPayment.note
                    }
                  </p>
                </div>
              </div>

              {/* Attachment Section */}
              {
                //@ts-expect-error:Payment
                selectedPayment.attachment && (
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Attachment
                    </h4>
                    <div className="border border-gray-200 rounded-lg p-4 bg-white">
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="text-center">
                          <p className="text-xs text-gray-600 font-medium mb-2">
                            Written Tests - Recruitment - 2025 (944 Posts)
                          </p>
                          <div className="bg-white border border-gray-200 rounded p-4 text-xs text-left space-y-1">
                            <p className="font-semibold">
                              It is expected that Written Test of shortlisted
                              candidates for the advertised posts of IRPS 7 or
                              10
                            </p>
                            <p>
                              job notification will be held as per the following
                              schedule:
                            </p>

                            <table className="w-full mt-3 text-xs">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-1">Date / Day</th>
                                  <th className="text-left py-1">Shift</th>
                                  <th className="text-left py-1">Post</th>
                                  <th className="text-left py-1">Batch</th>
                                  <th className="text-left py-1">Start Time</th>
                                </tr>
                              </thead>
                              <tbody className="text-gray-700">
                                <tr>
                                  <td className="py-1">10-04-2025</td>
                                  <td>Morning</td>
                                  <td>Corporate</td>
                                  <td>Batch-1</td>
                                  <td>9 AM</td>
                                </tr>
                                <tr>
                                  <td className="py-1">(Day 1)</td>
                                  <td>Afternoon</td>
                                  <td>Corporate</td>
                                  <td>Batch-3</td>
                                  <td>2 PM</td>
                                </tr>
                                <tr>
                                  <td className="py-1">10-04-2025</td>
                                  <td>Morning</td>
                                  <td>AB</td>
                                  <td>Batch-2</td>
                                  <td>9 AM</td>
                                </tr>
                                <tr>
                                  <td className="py-1">(Day 2)</td>
                                  <td>Afternoon</td>
                                  <td>Corporate</td>
                                  <td>Batch-1</td>
                                  <td>2 PM</td>
                                </tr>
                                <tr>
                                  <td className="py-1">10-04-2025</td>
                                  <td>Morning</td>
                                  <td>LDC</td>
                                  <td>-</td>
                                  <td>9 AM</td>
                                </tr>
                                <tr>
                                  <td className="py-1">(Day 3)</td>
                                  <td>Afternoon</td>
                                  <td>Assistant</td>
                                  <td>Batch-2</td>
                                  <td>2 PM</td>
                                </tr>
                                <tr>
                                  <td className="py-1">11-04-2025</td>
                                  <td>Morning</td>
                                  <td>GDC</td>
                                  <td>-</td>
                                  <td>9 AM</td>
                                </tr>
                                <tr>
                                  <td className="py-1">(Day 1)</td>
                                  <td>Afternoon</td>
                                  <td>Assistant</td>
                                  <td>-</td>
                                  <td>2 PM</td>
                                </tr>
                                <tr>
                                  <td className="py-1">12-04-2025</td>
                                  <td>Morning</td>
                                  <td>Lab Attendant</td>
                                  <td>-</td>
                                  <td>9 AM</td>
                                </tr>
                                <tr>
                                  <td className="py-1">(Day 2)</td>
                                  <td>Afternoon</td>
                                  <td>Stenotypist</td>
                                  <td>-</td>
                                  <td>1 PM</td>
                                </tr>
                                <tr>
                                  <td className="py-1">-</td>
                                  <td>Evening</td>
                                  <td>Nursing Assistant</td>
                                  <td>-</td>
                                  <td>5 PM</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              {/* Footer Note */}
              <div className="text-xs text-gray-500 border-t pt-4">
                <p>
                  This document has been automatically generated by Day Book.
                </p>
                <p>Therefore, a signature is not required.</p>
              </div>
            </div>

            {/* Footer Button */}
            <div className="p-6 border-t border-gray-200">
              <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                <Printer size={18} />
                Print
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PlannedPaymentPage;

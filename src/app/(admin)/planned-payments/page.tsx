"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
  Copy,
  Trash2,
  Printer,
} from "lucide-react";
import { formatDate } from "@/lib/utils/date.util";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";
import CreatePayment from "@/components/planned-payment/modals/CreatePayment";

const PlannedPaymentPage = () => {
  const [isCreatePaymentOpen, setIsCreatePaymentOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [search, setSearch] = useState<string>("");

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
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Planned Payment</h1>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          {/* Search */}
          <div className="relative w-full sm:max-w-sm">
            <input
              type="text"
              placeholder="Search planned payment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <SearchIcon />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              className="px-6 py-3 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 font-medium flex items-center gap-2"
            >
              <ExcelIcon />
              Export Excel
            </button>

            <button
              onClick={() => setIsCreatePaymentOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Create Payment
            </button>
          </div>
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

      {/* Create Payment Modal */}
      {isCreatePaymentOpen && (
        <CreatePayment
          onClose={() => setIsCreatePaymentOpen(false)}
          onSave={() => {
            // TODO: Implement refresh logic
          }}
        />
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

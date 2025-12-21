"use client";
import React, { useState } from "react";
import {
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
import CreateSalary from "@/components/salary/modals/CreateSalary";
import PageTitle from "@/components/ui/PageTitle";

const SalaryPage = () => {
  const [isCreateSalaryOpen, setIsCreateSalaryOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [search, setSearch] = useState<string>("");

  const salaries = [
    {
      id: 1,
      title: "Mahmoud Ahmed",
      position: "Backend Developer",
      employeeId: "344521",
      seller: "Sajid Nahvi",
      time: "9:30 AM",
      amount: "$40,000",
      salary: "$45,000",
      deduction: "$5,000",
      deductionReason: "Reason",
      type: "Account",
      status: "Upcoming",
      hasIcon: true,
      joiningDate: "1st January, 2025",
      payPeriod: "August, 2025",
      payDate: "29th August, 2025",
      paidBy: "Bank Transfer",
      note: "This is an additional information. If available this section will show otherwise it will be hidden.",
      attachment: true,
    },
    {
      id: 2,
      title: "Sajid Nahvi",
      position: "Frontend Developer",
      employeeId: "344522",
      seller: "Sajid Nahvi",
      time: "9:30 AM",
      amount: "$35,000",
      salary: "$40,000",
      deduction: "$5,000",
      deductionReason: "Late arrival",
      type: "Account",
      status: "Upcoming",
      hasIcon: false,
      joiningDate: "15th March, 2025",
      payPeriod: "August, 2025",
      payDate: "29th August, 2025",
      paidBy: "Bank Transfer",
      note: "Regular monthly salary payment",
      attachment: false,
    },
  ];
  //@ts-expect-error:salary
  const handleRowClick = (salary) => {
    setSelectedSalary(salary);
    setIsDetailsOpen(true);
  };

  return (
    <div>
      <PageTitle 
        title="Salary"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Salary" }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <input
            type="text"
            placeholder="Search salary..."
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
            onClick={() => setIsCreateSalaryOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Create Salary
          </button>
        </div>
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
            <div className="flex gap-6">
              {["Yesterday", "Today", "Tomorrow"].map((tab) => (
                <button
                  key={tab}
                  className="font-medium text-sm pb-1 transition-colors text-gray-500 hover:text-gray-700"
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                <SlidersHorizontal size={16} />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Salaries List */}
        <div className="p-6">
          <div className="space-y-1">
            {salaries.map((salary) => (
              <div
                key={salary.id}
                onClick={() => handleRowClick(salary)}
                className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {salary.title}
                      </h3>
                      {salary.hasIcon && (
                        <Copy size={16} className="text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-pink-100 text-pink-700">
                        {salary.type}
                      </span>
                      <span className="text-sm text-gray-600">
                        {salary.seller}
                      </span>
                      <span className="text-sm text-gray-600">
                        {salary.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-orange-500">
                    {salary.status}
                  </span>
                  <div className="text-xl font-bold text-gray-900">
                    {salary.amount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Salary Modal */}
      {isCreateSalaryOpen && (
        <CreateSalary
          onClose={() => setIsCreateSalaryOpen(false)}
          onSave={() => {
            // TODO: Implement refresh logic
          }}
        />
      )}

      {/* Salary Details Side Panel */}
      {isDetailsOpen && selectedSalary && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/5 bg-opacity-50 z-40"
            onClick={() => setIsDetailsOpen(false)}
          />

          {/* Side Panel */}
          <div className="fixed top-0 right-0 h-full w-[800px] bg-white shadow-2xl z-9999 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Salary Details
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
              <div className="grid grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Employee Info Card */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {
                        //@ts-expect-error:salary
                        selectedSalary.title
                      }
                    </h3>
                    <p className="text-gray-600 mb-1">
                      {
                        //@ts-expect-error:salary
                        selectedSalary.position
                      }
                    </p>
                    <p className="text-sm text-gray-500">
                      Employee ID#{" "}
                      {
                        //@ts-expect-error:salary
                        selectedSalary.employeeId
                      }
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">
                        Joining Date
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {
                          //@ts-expect-error:salary
                          selectedSalary.joiningDate
                        }
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">
                        Pay Period
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {
                          //@ts-expect-error:salary
                          selectedSalary.payPeriod
                        }
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">
                        Pay Date
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {
                          //@ts-expect-error:salary
                          selectedSalary.payDate
                        }
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Paid By</span>
                      <span className="text-gray-900 font-semibold">
                        {
                          //@ts-expect-error:salary
                          selectedSalary.paidBy
                        }
                      </span>
                    </div>
                  </div>

                  {/* Earning & Deduction */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Earning</p>
                        <p className="text-lg font-semibold text-gray-900">
                          Total
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-2">Deduction</p>
                        <p className="text-lg font-semibold text-gray-900">
                          Total
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary</span>
                        <span className="text-gray-900 font-semibold">
                          {
                            //@ts-expect-error:salary
                            selectedSalary.salary
                          }
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {
                            //@ts-expect-error:salary
                            selectedSalary.deductionReason
                          }
                        </span>
                        <span className="text-red-600 font-semibold">
                          {
                            //@ts-expect-error:salary
                            selectedSalary.deduction
                          }
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Total</span>
                      <span className="text-2xl font-bold text-gray-900">
                        {
                          //@ts-expect-error:salary
                          selectedSalary.amount
                        }
                      </span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">
                      Additional Info
                    </h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {
                          //@ts-expect-error:salary
                          selectedSalary.note
                        }
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column - Attachment */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Attachment
                  </h4>
                  {
                    //@ts-expect-error:salary
                    selectedSalary.attachment && (
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
                                job notification will be held as per the
                                following schedule:
                              </p>

                              <table className="w-full mt-3 text-xs">
                                <thead>
                                  <tr className="border-b">
                                    <th className="text-left py-1">
                                      Date / Day
                                    </th>
                                    <th className="text-left py-1">Shift</th>
                                    <th className="text-left py-1">Post</th>
                                    <th className="text-left py-1">Batch</th>
                                    <th className="text-left py-1">
                                      Start Time
                                    </th>
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
                    )
                  }
                </div>
              </div>

              {/* Footer Note */}
              <div className="text-xs text-gray-500 border-t pt-4 mt-6">
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

export default SalaryPage;

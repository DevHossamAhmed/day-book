"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
  Calendar,
  ChevronDown,
  Image,
  Save,
} from "lucide-react";
import { formatDate, getDateByLabel } from "@/lib/utils/date.util";
import CreateExpense from "@/components/expense/modals/CreateExpense";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";
import { fetchExpenses } from "@/services/expense.service";
import { Expense } from "@/types/expense";
import toast from "react-hot-toast";
import { PaginationMeta } from "@/types/pagination";
import { Pagination } from "@/components/ui/Pagination";
import { fetchGetIdNameList as fetchExpenseTypeIdNameList } from "@/services/expense-type.service";
import { ExpenseTypeIdNameList } from "@/types/expense-type";
import ExpenseDetails from "@/components/expense/modals/ExpenseDetails";
import { formatMoney } from "@/lib/utils/money.util";

const ExpensesPage = () => {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [dateFilter, setDateFilter] = useState<string>(getDateByLabel("today"));
  const [isCreateExpenseOpen, setIsCreateExpenseOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [expenseTypes, setExpenseTypes] = useState<ExpenseTypeIdNameList[]>([]);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchData(1);
    fetchExpenseTypes();
  }, [activeTab, search]);

  const openCreateExpense = () => setIsCreateExpenseOpen(true);
  const closeCreateExpense = () => setIsCreateExpenseOpen(false);

  const setDateToFilter = (value: string) => {
    setActiveTab(value);
    setDateFilter(getDateByLabel(value.toLowerCase()));
  };

  const onPageChange = (newPage: number) => {
    fetchData(newPage);
  };

  const fetchData = async (newPage: number) => {
    try {
      const { items, meta } = await fetchExpenses({
        date: dateFilter,
        page: newPage,
        limit,
        search: search || undefined,
      });

      setExpenses(items);
      setMeta(meta);
      setPage(meta.page);
    } catch (error) {
      toast.error("Failed to fetch expense records. Please try again later.");
    }
  };

  const fetchExpenseTypes = async () => {
    try {
      const response = await fetchExpenseTypeIdNameList();
      setExpenseTypes(response.data);
    } catch (error) {
      toast.error("Failed to fetch expense types. Please try again later.");
    }
  };

  const onSave = () => {
    fetchData(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Expenses</h1>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          {/* Search */}
          <div className="relative w-full sm:max-w-sm">
            <input
              type="text"
              placeholder="Search expenses..."
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
              onClick={openCreateExpense}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Create Expense
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
                    onClick={() => setDateToFilter(tab)}
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
              <div className="flex gap-3">
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

          {/* Expenses Table */}
          <div className="p-6">
            {/* Desktop / Tablet Table */}
            <div className="hidden sm:block bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Vendor
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Expense Type
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Payment Method
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                        Note
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {expenses.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                          No expense records found
                        </td>
                      </tr>
                    ) : (
                      expenses.map((expense: Expense) => (
                        <tr
                          key={expense.id}
                          className="hover:bg-gray-50 cursor-pointer"
                          onClick={() => {
                            setSelectedExpense(expense);
                            setIsDetailsOpen(true);
                          }}
                        >
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {formatDate(new Date(expense.date), "MMM DD, YYYY")}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">
                              {expense.vendor?.name || "—"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">
                              {expense.expense_type?.name || "—"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">
                              {formatMoney(expense.amount)}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-700">
                              {expense.payment_method || "—"}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {expense.note ? (
                              <span className="text-sm text-gray-700 line-clamp-1">
                                {expense.note}
                              </span>
                            ) : (
                              <span className="text-sm text-gray-400">—</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <ChevronRight className="w-5 h-5 text-gray-400 inline" />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3">
              {expenses.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No expense records found
                </div>
              ) : (
                expenses.map((expense: Expense) => (
                  <div
                    key={expense.id}
                    onClick={() => {
                      setSelectedExpense(expense);
                      setIsDetailsOpen(true);
                    }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 truncate">
                        {expense.expense_type?.name || "Expense"}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{expense.vendor?.name || "—"}</span>
                        <span>•</span>
                        <span>{formatDate(new Date(expense.date), "MMM DD, YYYY")}</span>
                      </div>
                      {expense.payment_method && (
                        <div className="text-sm text-gray-500 mt-1">
                          {expense.payment_method}
                        </div>
                      )}
                    </div>
                    <div className="text-xl font-bold text-gray-900 ml-4">
                      {formatMoney(expense.amount)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pagination */}
          {meta && (
            <Pagination
              meta={meta}
              onPageChange={(newPage) => onPageChange(newPage)}
            />
          )}
        </div>
      </div>

      {/* Create Expense Side Panel */}
      {isCreateExpenseOpen && (
        <CreateExpense onClose={closeCreateExpense} onSave={onSave} />
      )}

      {/* Expense Details Modal */}
      {selectedExpense && (
        <ExpenseDetails
          expense={selectedExpense}
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedExpense(null);
          }}
          onSave={onSave}
        />
      )}
    </div>
  );
};

export default ExpensesPage;

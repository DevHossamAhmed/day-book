"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { formatDate, getDateByLabel } from "@/lib/utils/date.util";
import CreateExpense from "@/components/expense/modals/CreateExpense";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";
import { fetchExpenses, exportExpenses } from "@/services/expense.service";
import { Expense } from "@/types/expense";
import toast from "react-hot-toast";
import { exportToExcel } from "@/lib/utils/excel.util";
import { PaginationMeta } from "@/types/pagination";
import { Pagination } from "@/components/ui/Pagination";
import ExpenseDetails from "@/components/expense/modals/ExpenseDetails";
import { formatMoney } from "@/lib/utils/money.util";
import PageTitle from "@/components/ui/PageTitle";

const ExpensesPage = () => {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [dateFilter, setDateFilter] = useState<string>(getDateByLabel("today"));
  const [isCreateExpenseOpen, setIsCreateExpenseOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchData(1);
  }, [activeTab, search, dateFilter]);

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

  const onSave = () => {
    fetchData(1);
  };

  const handleRowClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDetailsOpen(true);
  };

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      const data = await exportExpenses({
        date: dateFilter,
        search: search || undefined,
      });
      
      const exportData = data.map((expense) => ({
        "Date": formatDate(new Date(expense.date), "YYYY-MM-DD"),
        "Vendor": expense.vendor?.name || "—",
        "Expense Type": expense.expense_type?.name || "—",
        "Amount": formatMoney(expense.amount),
        "Payment Method": expense.payment_method || "—",
        "Note": expense.note || "—",
        "Added By": expense.added_by_fullname || "—",
      }));

      exportToExcel(exportData, `expenses-${formatDate(new Date(), "YYYY-MM-DD")}`);
      toast.success("Expenses exported successfully!");
    } catch (error) {
      toast.error("Failed to export expenses. Please try again later.");
    } finally {
      setIsExporting(false);
    }
  };


  return (
    <div>
      <PageTitle 
        title="Expenses"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Expenses" }
        ]}
      />

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
            onClick={handleExportExcel}
            disabled={isExporting}
            className="px-6 py-3 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ExcelIcon />
            {isExporting ? "Exporting..." : "Export Excel"}
          </button>

          <button
            onClick={() => setIsCreateExpenseOpen(true)}
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
            </div>
          </div>
        </div>

        {/* Expenses List */}
        <div className="p-6">
          <div className="space-y-1">
            {expenses.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No expense records found
              </div>
            ) : (
              expenses.map((expense) => (
                <div
                  key={expense.id}
                  onClick={() => handleRowClick(expense)}
                  className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {expense.vendor?.name || expense.expense_type?.name || "Expense"}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {expense.expense_type?.name && (
                          <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                            {expense.expense_type.name}
                          </span>
                        )}
                        {expense.vendor?.name && expense.expense_type?.name && (
                          <span className="text-sm text-gray-600">
                            {expense.vendor.name}
                          </span>
                        )}
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(expense.date), "MMM DD, YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {expense.payment_method && (
                      <span className="text-sm font-medium text-gray-600">
                        {expense.payment_method}
                      </span>
                    )}
                    <div className="text-xl font-bold text-gray-900">
                      {formatMoney(expense.amount)}
                    </div>
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

      {/* Create Expense Modal */}
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

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
import ExpenseRow from "@/components/expense/ui/ExpenseRow";
import PageTitle from "@/components/ui/PageTitle";
import PageLoading from "@/components/ui/PageLoading";
import { formatMoney } from "@/lib/utils/money.util";
import { PaymentMethod } from "@/data/payment-method";
import { fetchGetIdNameList as fetchVendorIdNameList } from "@/services/vendor.service";
import { fetchGetIdNameList as fetchExpenseTypeIdNameList } from "@/services/expense-type.service";
import { useAsyncData } from "@/hooks/useAsyncData";

const ExpensesPage = () => {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [dateFilter, setDateFilter] = useState<string>(getDateByLabel("today"));
  const [isCreateExpenseOpen, setIsCreateExpenseOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  
  // Filter states
  const [filterFromDate, setFilterFromDate] = useState<string>("");
  const [filterToDate, setFilterToDate] = useState<string>("");
  const [filterVendorId, setFilterVendorId] = useState<string>("");
  const [filterExpenseTypeId, setFilterExpenseTypeId] = useState<string>("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState<string>("");
  const [filterAmountMin, setFilterAmountMin] = useState<string>("");
  const [filterAmountMax, setFilterAmountMax] = useState<string>("");

  // Fetch vendors and expense types for filters
  const {
    data: vendorsData,
    isLoading: isLoadingVendors,
  } = useAsyncData({
    fetchFn: async () => {
      const res = await fetchVendorIdNameList();
      return res.data;
    },
  });

  const {
    data: expenseTypesData,
    isLoading: isLoadingExpenseTypes,
  } = useAsyncData({
    fetchFn: async () => {
      const res = await fetchExpenseTypeIdNameList();
      return res.data;
    },
  });

  const vendors = vendorsData || [];
  const expenseTypes = expenseTypesData || [];

  useEffect(() => {
    fetchData(1);
  }, [activeTab, search, dateFilter, filterFromDate, filterToDate, filterVendorId, filterExpenseTypeId, filterPaymentMethod, filterAmountMin, filterAmountMax]);

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
      setIsLoading(true);
      const params: any = {
        date: dateFilter,
        page: newPage,
        limit,
        search: search || undefined,
      };

      // Add filter parameters
      if (filterFromDate) params.from_date = filterFromDate;
      if (filterToDate) params.to_date = filterToDate;
      if (filterVendorId) params.vendor_id = filterVendorId;
      if (filterExpenseTypeId) params.expense_type_id = filterExpenseTypeId;
      if (filterPaymentMethod) params.payment_method = filterPaymentMethod;
      if (filterAmountMin) params.amount_min = filterAmountMin;
      if (filterAmountMax) params.amount_max = filterAmountMax;

      const { items, meta } = await fetchExpenses(params);

      setExpenses(items);
      setMeta(meta);
      setPage(meta.page);
    } catch (error) {
      toast.error("Failed to fetch expense records. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSave = () => {
    fetchData(1);
  };

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      const params: any = {
        date: dateFilter,
        search: search || undefined,
      };

      // Add filter parameters for export
      if (filterFromDate) params.from_date = filterFromDate;
      if (filterToDate) params.to_date = filterToDate;
      if (filterVendorId) params.vendor_id = filterVendorId;
      if (filterExpenseTypeId) params.expense_type_id = filterExpenseTypeId;
      if (filterPaymentMethod) params.payment_method = filterPaymentMethod;
      if (filterAmountMin) params.amount_min = filterAmountMin;
      if (filterAmountMax) params.amount_max = filterAmountMax;

      const data = await exportExpenses(params);
      
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

  const handleClearFilters = () => {
    setFilterFromDate("");
    setFilterToDate("");
    setFilterVendorId("");
    setFilterExpenseTypeId("");
    setFilterPaymentMethod("");
    setFilterAmountMin("");
    setFilterAmountMax("");
  };

  const hasActiveFilters = filterFromDate || filterToDate || filterVendorId || filterExpenseTypeId || filterPaymentMethod || filterAmountMin || filterAmountMax;


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
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors text-sm font-medium ${
                  isFilterOpen || hasActiveFilters
                    ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                    : "text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <SlidersHorizontal size={16} />
                Filter
                {hasActiveFilters && (
                  <span className="ml-1 px-1.5 py-0.5 bg-white text-blue-600 rounded-full text-xs font-semibold">
                    {[
                      filterFromDate && "1",
                      filterToDate && "1",
                      filterVendorId && "1",
                      filterExpenseTypeId && "1",
                      filterPaymentMethod && "1",
                      filterAmountMin && "1",
                      filterAmountMax && "1",
                    ].filter(Boolean).length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Period From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period From
                </label>
                <input
                  type="date"
                  value={filterFromDate}
                  onChange={(e) => setFilterFromDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Period To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period To
                </label>
                <input
                  type="date"
                  value={filterToDate}
                  onChange={(e) => setFilterToDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Vendor */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vendor
                </label>
                <select
                  value={filterVendorId}
                  onChange={(e) => setFilterVendorId(e.target.value)}
                  disabled={isLoadingVendors}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">All Vendors</option>
                  {vendors.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Expense Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expense Type
                </label>
                <select
                  value={filterExpenseTypeId}
                  onChange={(e) => setFilterExpenseTypeId(e.target.value)}
                  disabled={isLoadingExpenseTypes}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">All Expense Types</option>
                  {expenseTypes.map((expenseType) => (
                    <option key={expenseType.id} value={expenseType.id}>
                      {expenseType.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method
                </label>
                <select
                  value={filterPaymentMethod}
                  onChange={(e) => setFilterPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                >
                  <option value="">All Payment Methods</option>
                  {PaymentMethod.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              {/* Amount Min */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Min
                </label>
                <input
                  type="number"
                  value={filterAmountMin}
                  onChange={(e) => setFilterAmountMin(e.target.value)}
                  placeholder="Minimum amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Amount Max */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Max
                </label>
                <input
                  type="number"
                  value={filterAmountMax}
                  onChange={(e) => setFilterAmountMax(e.target.value)}
                  placeholder="Maximum amount"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Expenses List */}
        <div className="p-6">
          {isLoading ? (
            <PageLoading />
          ) : (
            <div className="space-y-3">
              {expenses.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No expense records found
                </div>
              ) : (
                expenses.map((expense) => (
                  <ExpenseRow
                    key={expense.id}
                    expense={expense}
                    onSave={onSave}
                  />
                ))
              )}
            </div>
          )}
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
        <CreateExpense 
          onClose={closeCreateExpense} 
          onSave={onSave}
          vendors={vendors}
          expenseTypes={expenseTypes}
          isLoadingVendors={isLoadingVendors}
          isLoadingExpenseTypes={isLoadingExpenseTypes}
        />
      )}

    </div>
  );
};

export default ExpensesPage;

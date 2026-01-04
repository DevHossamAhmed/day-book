/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import { formatDate, getDateByLabel } from "@/lib/utils/date.util";
import CreateExpense from "@/components/expense/modals/CreateExpense";
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
import PageActions from "@/components/ui/PageActions";
import ExportButton from "@/components/ui/ExportButton";
import FilterButton from "@/components/ui/FilterButton";
import FilterPanel, { FilterField } from "@/components/ui/FilterPanel";
import DateFilterTabs from "@/components/ui/DateFilterTabs";

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

  const activeFilterCount = [
    filterFromDate,
    filterToDate,
    filterVendorId,
    filterExpenseTypeId,
    filterPaymentMethod,
    filterAmountMin,
    filterAmountMax,
  ].filter(Boolean).length;

  const filterFields: FilterField[] = [
    {
      type: "date",
      label: "Period From",
      value: filterFromDate,
      onChange: setFilterFromDate,
    },
    {
      type: "date",
      label: "Period To",
      value: filterToDate,
      onChange: setFilterToDate,
    },
    {
      type: "select",
      label: "Vendor",
      value: filterVendorId,
      onChange: setFilterVendorId,
      options: [
        { value: "", label: "All Vendors" },
        ...vendors.map((vendor) => ({
          value: String(vendor.id),
          label: vendor.name,
        })),
      ],
      disabled: isLoadingVendors,
    },
    {
      type: "select",
      label: "Expense Type",
      value: filterExpenseTypeId,
      onChange: setFilterExpenseTypeId,
      options: [
        { value: "", label: "All Expense Types" },
        ...expenseTypes.map((expenseType) => ({
          value: String(expenseType.id),
          label: expenseType.name,
        })),
      ],
      disabled: isLoadingExpenseTypes,
    },
    {
      type: "select",
      label: "Payment Method",
      value: filterPaymentMethod,
      onChange: setFilterPaymentMethod,
      options: [
        { value: "", label: "All Payment Methods" },
        ...PaymentMethod.map((method) => ({ value: method, label: method })),
      ],
    },
    {
      type: "number",
      label: "Amount Min",
      value: filterAmountMin,
      onChange: setFilterAmountMin,
      placeholder: "Minimum amount",
    },
    {
      type: "number",
      label: "Amount Max",
      value: filterAmountMax,
      onChange: setFilterAmountMax,
      placeholder: "Maximum amount",
    },
  ];


  return (
    <div>
      <PageTitle 
        title="Expenses"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Expenses" }
        ]}
      />

      <PageActions
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search expenses..."
        actions={
          <>
            <ExportButton onClick={handleExportExcel} isExporting={isExporting} />
            <button
              onClick={() => setIsCreateExpenseOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 font-medium"
            >
              Create Expense
            </button>
          </>
        }
      />

      {/* Main Content Card */}
      <div className="bg-[var(--color-overviewTab)] rounded-2xl shadow-sm border border-gray-100">
        {/* Date Navigation */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between gap-6">
            <DateFilterTabs
              activeTab={activeTab}
              onTabChange={setDateToFilter}
              showDatePicker={false}
            />
            <div className="flex gap-3">
              <FilterButton
                isOpen={isFilterOpen}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                activeFilterCount={activeFilterCount}
              />
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <FilterPanel
          isOpen={isFilterOpen}
          fields={filterFields}
          onClearFilters={handleClearFilters}
        />

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

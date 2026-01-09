/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { formatDate, getDateByLabel } from "@/lib/utils/date.util";
import CreateIncome from "@/components/income/modals/CreateIncome";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";
import { fetchIncomes, exportIncomes } from "@/services/income.service";
import { Income } from "@/types/income";
import toast from "react-hot-toast";
import { exportToExcel } from "@/lib/utils/excel.util";
import { formatMoney } from "@/lib/utils/money.util";
import { PaginationMeta } from "@/types/pagination";
import { Pagination } from "@/components/ui/Pagination";
import PageTitle from "@/components/ui/PageTitle";
import PageLoading from "@/components/ui/PageLoading";
import IncomeRow from "@/components/income/ui/IncomeRow";
import { PaymentMethod } from "@/data/payment-method";
import { fetchGetIdNameList } from "@/services/user.service";
import { fetchStoreIdNameList } from "@/services/store.service";
import { useAsyncData } from "@/hooks/useAsyncData";

const IncomePage = () => {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [dateFilter, setDateFilter] = useState<string>(getDateByLabel("today"));
  const [isCreateIncomeOpen, setIsCreateIcomeOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  
  // Filter states
  const [filterFromDate, setFilterFromDate] = useState<string>("");
  const [filterToDate, setFilterToDate] = useState<string>("");
  const [filterStoreId, setFilterStoreId] = useState<string>("");
  const [filterSalesPersonId, setFilterSalesPersonId] = useState<string>("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState<string>("");
  const [filterAmountMin, setFilterAmountMin] = useState<string>("");
  const [filterAmountMax, setFilterAmountMax] = useState<string>("");

  // Fetch members and stores for filters
  const {
    data: membersData,
    isLoading: isLoadingMembers,
  } = useAsyncData({
    fetchFn: async () => {
      const res = await fetchGetIdNameList();
      return res.data;
    },
  });

  const {
    data: storesData,
    isLoading: isLoadingStores,
  } = useAsyncData({
    fetchFn: async () => {
      const res = await fetchStoreIdNameList();
      return res.data;
    },
  });

  const members = membersData || [];
  const stores = storesData || [];

  useEffect(() => {
    fetchData(1);
  }, [activeTab, search, dateFilter, filterFromDate, filterToDate, filterStoreId, filterSalesPersonId, filterPaymentMethod, filterAmountMin, filterAmountMax]);

  const openCreateIncome = () => setIsCreateIcomeOpen(true);
  const closeCreateIncome = () => setIsCreateIcomeOpen(false);

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
      if (filterStoreId) params.store_id = filterStoreId;
      if (filterSalesPersonId) params.sales_person_id = filterSalesPersonId;
      if (filterPaymentMethod) params.payment_method = filterPaymentMethod;
      if (filterAmountMin) params.amount_min = filterAmountMin;
      if (filterAmountMax) params.amount_max = filterAmountMax;

      const { items, meta } = await fetchIncomes(params);

      setIncomes(items);
      setMeta(meta);
      setPage(meta.page);
    } catch (error) {
      toast.error("Failed to fetch income records. Please try again later.");
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
      if (filterStoreId) params.store_id = filterStoreId;
      if (filterSalesPersonId) params.sales_person_id = filterSalesPersonId;
      if (filterPaymentMethod) params.payment_method = filterPaymentMethod;
      if (filterAmountMin) params.amount_min = filterAmountMin;
      if (filterAmountMax) params.amount_max = filterAmountMax;

      const data = await exportIncomes(params);
      
      const exportData = data.map((income) => ({
        "Date": formatDate(new Date(income.date), "YYYY-MM-DD"),
        "Store": income.store?.name || "—",
        "Sales Person": income.sales_person_fullname || "—",
        "Amount": formatMoney(income.amount),
        "Payment Method": income.payment_method || "—",
        "Note": income.note || "—",
        "Added By": income.added_by_fullname || "—",
      }));

      exportToExcel(exportData, `income-${formatDate(new Date(), "YYYY-MM-DD")}`);
      toast.success("Income records exported successfully!");
    } catch (error) {
      toast.error("Failed to export income records. Please try again later.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearFilters = () => {
    setFilterFromDate("");
    setFilterToDate("");
    setFilterStoreId("");
    setFilterSalesPersonId("");
    setFilterPaymentMethod("");
    setFilterAmountMin("");
    setFilterAmountMax("");
  };

  const hasActiveFilters = filterFromDate || filterToDate || filterStoreId || filterSalesPersonId || filterPaymentMethod || filterAmountMin || filterAmountMax;


  return (
    <div>
      <PageTitle 
        title="Income"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Income" }
        ]}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <input
            type="text"
            placeholder="Search income..."
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
            className="px-6 py-3 border border-green-600 text-green-700 rounded-lg cursor-pointer font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ExcelIcon />
            {isExporting ? "Exporting..." : "Export Excel"}
          </button>

          <button
            onClick={() => setIsCreateIcomeOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white cursor-pointer rounded-lg hover:bg-blue-700 font-medium"
          >
            Create Income
          </button>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-[var(--color-overviewTab)] rounded-2xl shadow-sm border border-gray-100">
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
                      : " hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 cursor-pointer px-4 py-2 border rounded-lg transition-colors text-sm font-medium ${
                  isFilterOpen || hasActiveFilters
                    ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                    : " border-gray-300 "
                }`}
              >
                <SlidersHorizontal size={16} />
                Filter
                {hasActiveFilters && (
                  <span className="ml-1 px-1.5 py-0.5 bg-white text-blue-600 rounded-full text-xs font-semibold">
                    {[
                      filterFromDate && "1",
                      filterToDate && "1",
                      filterStoreId && "1",
                      filterSalesPersonId && "1",
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

              {/* Store */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Store
                </label>
                <select
                  value={filterStoreId}
                  onChange={(e) => setFilterStoreId(e.target.value)}
                  disabled={isLoadingStores}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">All Stores</option>
                  {stores.map((store) => (
                    <option key={store.id} value={store.id}>
                      {store.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sales Person */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sales Person
                </label>
                <select
                  value={filterSalesPersonId}
                  onChange={(e) => setFilterSalesPersonId(e.target.value)}
                  disabled={isLoadingMembers}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">All Sales Persons</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.full_name}
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

        {/* Income List */}
        <div className="p-6">
          {isLoading ? (
            <PageLoading />
          ) : (
            <div className="space-y-3">
              {incomes.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No income records found
                </div>
              ) : (
                incomes.map((income) => (
                  <IncomeRow
                    key={income.id}
                    income={income}
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

      {/* Create Income Modal */}
      {isCreateIncomeOpen && (
        <CreateIncome
          onClose={closeCreateIncome}
          onSave={onSave}
          members={members}
          stores={stores}
          isLoadingMembers={isLoadingMembers}
          isLoadingStores={isLoadingStores}
        />
      )}
    </div>
  );
};

export default IncomePage;

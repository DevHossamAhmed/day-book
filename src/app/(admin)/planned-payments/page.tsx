/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useEffect } from "react";
import {
  SlidersHorizontal,
} from "lucide-react";
import { formatDate, getDateByLabel } from "@/lib/utils/date.util";
import CreatePayment from "@/components/planned-payment/modals/CreatePayment";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";
import { fetchPlannedPayments, exportPlannedPayments } from "@/services/planned-payment.service";
import { PlannedPayment } from "@/types/planned-payment";
import toast from "react-hot-toast";
import PlannedPaymentRow from "@/components/planned-payment/ui/PlannedPaymentRow";
import { PaginationMeta } from "@/types/pagination";
import { Pagination } from "@/components/ui/Pagination";
import { formatMoney } from "@/lib/utils/money.util";
import { exportToExcel } from "@/lib/utils/excel.util";
import PageTitle from "@/components/ui/PageTitle";
import PageLoading from "@/components/ui/PageLoading";
import { PaymentMethod } from "@/data/payment-method";
import { fetchGetIdNameList as fetchVendorIdNameList } from "@/services/vendor.service";
import { useAsyncData } from "@/hooks/useAsyncData";

const PlannedPaymentPage = () => {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [dateFilter, setDateFilter] = useState<string>(getDateByLabel("today"));
  const [isCreatePaymentOpen, setIsCreatePaymentOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [payments, setPayments] = useState<PlannedPayment[]>([]);
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
  const [filterPaymentMethod, setFilterPaymentMethod] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [filterAmountMin, setFilterAmountMin] = useState<string>("");
  const [filterAmountMax, setFilterAmountMax] = useState<string>("");

  // Fetch vendors for filters
  const {
    data: vendorsData,
    isLoading: isLoadingVendors,
  } = useAsyncData({
    fetchFn: async () => {
      const res = await fetchVendorIdNameList();
      return res.data;
    },
  });

  const vendors = vendorsData || [];

  useEffect(() => {
    fetchData(1);
  }, [activeTab, search, dateFilter, filterFromDate, filterToDate, filterVendorId, filterPaymentMethod, filterStatus, filterAmountMin, filterAmountMax]);

  const openCreatePayment = () => setIsCreatePaymentOpen(true);
  const closeCreatePayment = () => setIsCreatePaymentOpen(false);

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
      if (filterPaymentMethod) params.payment_method = filterPaymentMethod;
      if (filterStatus) params.status = filterStatus;
      if (filterAmountMin) params.amount_min = filterAmountMin;
      if (filterAmountMax) params.amount_max = filterAmountMax;

      const { items, meta } = await fetchPlannedPayments(params);

      setPayments(items);
      setMeta(meta);
      setPage(meta.page);
    } catch (error) {
      toast.error("Failed to fetch planned payments. Please try again later.");
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
      if (filterPaymentMethod) params.payment_method = filterPaymentMethod;
      if (filterStatus) params.status = filterStatus;
      if (filterAmountMin) params.amount_min = filterAmountMin;
      if (filterAmountMax) params.amount_max = filterAmountMax;

      const data = await exportPlannedPayments(params);
      
      const exportData = data.map((payment: PlannedPayment) => ({
        "Due Date": formatDate(new Date(payment.due_date), "YYYY-MM-DD"),
        "Vendor": payment.vendor_name || "—",
        "Purpose": payment.purpose || "—",
        "Amount": formatMoney(payment.amount),
        "Payment Method": payment.payment_method || "—",
        "Status": payment.status || "—",
        "Note": payment.note || "—",
        "Added By": payment.added_by_fullname || "—",
      }));

      exportToExcel(exportData, `planned-payments-${formatDate(new Date(), "YYYY-MM-DD")}`);
      toast.success("Planned payments exported successfully!");
    } catch (error) {
      toast.error("Failed to export planned payments. Please try again later.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearFilters = () => {
    setFilterFromDate("");
    setFilterToDate("");
    setFilterVendorId("");
    setFilterPaymentMethod("");
    setFilterStatus("");
    setFilterAmountMin("");
    setFilterAmountMax("");
  };

  const hasActiveFilters = filterFromDate || filterToDate || filterVendorId || filterPaymentMethod || filterStatus || filterAmountMin || filterAmountMax;

  return (
    <div>
      <PageTitle 
        title="Planned Payment"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Planned Payment" }
        ]}
      />

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
            onClick={handleExportExcel}
            disabled={isExporting}
            className="px-6 py-3 border border-green-600 cursor-pointer text-green-700 rounded-lg  font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ExcelIcon />
            {isExporting ? "Exporting..." : "Export Excel"}
          </button>

          <button
            onClick={() => setIsCreatePaymentOpen(true)}
            className="px-6 py-3 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Create Payment
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
                  className={`font-medium cursor-pointer text-sm pb-1 transition-colors ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : ""
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
                    : " border-gray-300 hover:bg-gray-50"
                }`}
              >
                <SlidersHorizontal size={16} />
                Filter
                {hasActiveFilters && (
                  <span className="ml-1 px-1.5 py-0.5 bg-[var(--color-overviewTab)] text-blue-600 rounded-full text-xs font-semibold">
                    {[
                      filterFromDate && "1",
                      filterToDate && "1",
                      filterVendorId && "1",
                      filterPaymentMethod && "1",
                      filterStatus && "1",
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
          <div className="p-6 border-b border-gray-200 bg-[var(--color-overviewTab)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Period From */}
              <div>
                <label className="block text-sm font-medium  mb-2">
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
                <label className="block text-sm font-medium  mb-2">
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
                <label className="block text-sm font-medium  mb-2">
                  Vendor
                </label>
                <select
                  value={filterVendorId}
                  onChange={(e) => setFilterVendorId(e.target.value)}
                  disabled={isLoadingVendors}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[var(--color-overviewTab)] disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">All Vendors</option>
                  {vendors.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Payment Method
                </label>
                <select
                  value={filterPaymentMethod}
                  onChange={(e) => setFilterPaymentMethod(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[var(--color-overviewTab)]"
                >
                  <option value="">All Payment Methods</option>
                  {PaymentMethod.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium  mb-2">
                  Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[var(--color-overviewTab)]"
                >
                  <option value="">All Statuses</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>

              {/* Amount Min */}
              <div>
                <label className="block text-sm font-medium  mb-2">
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
                <label className="block text-sm font-medium  mb-2">
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
                className="px-4 py-2  border border-gray-300 rounded-lg cursor-pointer transition-colors text-sm font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}

        {/* Payments List */}
        <div className="p-6">
          {isLoading ? (
            <PageLoading />
          ) : (
            <div className="space-y-3">
              {payments.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No planned payments found
                </div>
              ) : (
                payments.map((payment: PlannedPayment) => (
                  <PlannedPaymentRow key={payment.id} payment={payment} onSave={onSave} />
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

      {/* Create Payment Modal */}
      {isCreatePaymentOpen && (
        <CreatePayment onClose={closeCreatePayment} onSave={onSave} />
      )}
    </div>
  );
};

export default PlannedPaymentPage;

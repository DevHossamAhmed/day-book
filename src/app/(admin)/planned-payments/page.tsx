"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { formatDate, getDateByLabel } from "@/lib/utils/date.util";
import CreatePayment from "@/components/planned-payment/modals/CreatePayment";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";
import { fetchPlannedPayments } from "@/services/planned-payment.service";
import { PlannedPayment } from "@/types/planned-payment";
import toast from "react-hot-toast";
import PlannedPaymentRow from "@/components/planned-payment/ui/PlannedPaymentRow";
import { PaginationMeta } from "@/types/pagination";
import { Pagination } from "@/components/ui/Pagination";

const PlannedPaymentPage = () => {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [dateFilter, setDateFilter] = useState<string>(getDateByLabel("today"));
  const [isCreatePaymentOpen, setIsCreatePaymentOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [payments, setPayments] = useState<PlannedPayment[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchData(1);
  }, [activeTab, search]);

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
      const { items, meta } = await fetchPlannedPayments({
        date: dateFilter,
        page: newPage,
        limit,
        search: search || undefined,
      });

      setPayments(items);
      setMeta(meta);
      setPage(meta.page);
    } catch (error) {
      toast.error("Failed to fetch planned payments. Please try again later.");
    }
  };

  const onSave = () => {
    fetchData(1);
  };

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      const data = await exportPlannedPayments({
        date: dateFilter,
        search: search || undefined,
      });
      
      const exportData = data.map((payment) => ({
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
              onClick={handleExportExcel}
              disabled={isExporting}
              className="px-6 py-3 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ExcelIcon />
              {isExporting ? "Exporting..." : "Export Excel"}
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

          {/* Payments List */}
          <div className="p-6">
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

      {/* Create Payment Modal */}
      {isCreatePaymentOpen && (
        <CreatePayment onClose={closeCreatePayment} onSave={onSave} />
      )}
    </div>
  );
};

export default PlannedPaymentPage;

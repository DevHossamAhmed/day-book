"use client";
import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  Search,
  SlidersHorizontal,
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

  useEffect(() => {
    fetchData(1);
  }, [activeTab, search, dateFilter]);

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
      const { items, meta } = await fetchIncomes({
        date: dateFilter,
        page: newPage,
        limit,
        search: search || undefined,
      });

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
      const data = await exportIncomes({
        date: dateFilter,
        search: search || undefined,
      });
      
      const exportData = data.map((income) => ({
        "Date": formatDate(new Date(income.date), "YYYY-MM-DD"),
        "Store": income.source || "—",
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

  const handleRowClick = (income: Income) => {
    // TODO: Implement income details view if needed
    console.log("Income clicked:", income);
  };

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
            className="px-6 py-3 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ExcelIcon />
            {isExporting ? "Exporting..." : "Export Excel"}
          </button>

          <button
            onClick={() => setIsCreateIcomeOpen(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Create Sale
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

        {/* Income List */}
        <div className="p-6">
          {isLoading ? (
            <PageLoading />
          ) : (
            <div className="space-y-1">
              {incomes.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No income records found
                </div>
              ) : (
                incomes.map((income) => (
                <div
                  key={income.id}
                  onClick={() => handleRowClick(income)}
                  className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {income.source || income.sales_person_fullname || "Income"}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {income.source && (
                          <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">
                            {income.source}
                          </span>
                        )}
                        {income.sales_person_fullname && (
                          <span className="text-sm text-gray-600">
                            {income.sales_person_fullname}
                          </span>
                        )}
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(income.date), "MMM DD, YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {income.payment_method && (
                      <span className="text-sm font-medium text-gray-600">
                        {income.payment_method}
                      </span>
                    )}
                    <div className="text-xl font-bold text-gray-900">
                      {formatMoney(income.amount)}
                    </div>
                  </div>
                </div>
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
        <CreateIncome onClose={closeCreateIncome} onSave={onSave} />
      )}
    </div>
  );
};

export default IncomePage;

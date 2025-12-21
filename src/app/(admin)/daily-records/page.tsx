"use client";
import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  Plus,
  ArrowLeftRight,
  MoreVertical,
  SlidersHorizontal,
  Search,
  ArrowUpDown,
} from "lucide-react";
import CreateDailyRecord from "@/components/daily-record/modals/CreateDialyRecord";
import CreateTransfer from "@/components/daily-record/modals/CreateTransfer";
import { fetchBalances, exportBalances } from "@/services/balance.service";
import type { Balance } from "@/types/balance";
import toast from "react-hot-toast";
import { formatDate, getDateByLabel } from "@/lib/utils/date.util";
import EntryDetails from "@/components/daily-record/modals/EntryDetails";
import { PaginationMeta } from "@/types/pagination";
import { Pagination } from "@/components/ui/Pagination";
import ExcelIcon from "@/lib/icons/Excel.icon";
import SearchIcon from "@/lib/icons/Search.icon";
import { exportToExcel } from "@/lib/utils/excel.util";
import { formatMoney } from "@/lib/utils/money.util";
import { CapitalizeFirst } from "@/lib/utils/string.util";
import PageTitle from "@/components/ui/PageTitle";

const OpeningBalancePage = () => {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [dateFilter, setDateFilter] = useState<string>(getDateByLabel("today"));
  const [balances, setBalances] = useState<Balance[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(2);
  const [isExporting, setIsExporting] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [selectedBalance, setSelectedBalance] = useState<Balance | null>(null);
  const [isEntryDetailsOpen, setIsEntryDetailsOpen] = useState<boolean>(false);

  const [isOpenCreateRecord, setOpenCreateRecord] = useState<boolean>(false);
  const [isOpenCreateTransfer, setOpenCreateTransfer] = useState<boolean>(false);


  useEffect(() => {
    fetchData(1);
  }, [activeTab]);

  const openCreateRecord = () => setOpenCreateRecord(true);
  const closeCreateRecord = () => setOpenCreateRecord(false);

  const openCreateTransfer = () => setOpenCreateTransfer(true);
  const closeCreateTransfer = () => setOpenCreateTransfer(false);

  const setDateToFilter = (value: string) => {
    setActiveTab(value);
    setDateFilter(getDateByLabel(value.toLowerCase()));
  }

  const onSave = () => fetchData(1);

  const onPageChange = (page: number) => {
    fetchData(page);
  }

  const fetchData = async (newPage: number) => {
    try {
      const { items, meta } = await fetchBalances({
        date: dateFilter,
        page: newPage,
        limit
      });

      setBalances(items);
      setMeta(meta);
      setPage(meta.page);
    } catch (error) {
      toast.error("Failed to fetch balances. Please try again later.");
    }
  };

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      const data = await exportBalances({
        date: dateFilter,
      });
      
      const exportData = data.map((balance) => ({
        "Date": formatDate(new Date(balance.date), "YYYY-MM-DD"),
        "Source": balance.source || "—",
        "Type": CapitalizeFirst(balance.type) || "—",
        "Amount": formatMoney(balance.amount),
        "Note": balance.note || "—",
        "Added By": balance.added_by_fullname || "—",
      }));

      exportToExcel(exportData, `daily-records-${formatDate(new Date(), "YYYY-MM-DD")}`);
      toast.success("Daily records exported successfully!");
    } catch (error) {
      toast.error("Failed to export daily records. Please try again later.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <PageTitle 
            title="Opening Balance"
            breadcrumbs={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Opening Balance" }
            ]}
          />
        </div>
        <button
          className="cursor-pointer flex items-center gap-3 bg-liner-to-r from-blue-400 to-blue-700 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <div className="w-8 h-8 border border-[#cefa8c] bg-[#0d81e0] bg-opacity-20 rounded-full flex items-center justify-center">
            <ArrowUpDown size={20} className="text-[#cefa8c]" />
          </div>
          <span className="font-semibold text-[#cefa8c]">
            Today&lsquo;s PNL: $30,211
          </span>
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <SearchIcon />
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={() => openCreateRecord()}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Plus size={18} />
            Create Entry
          </button>
          <button
            onClick={() => openCreateTransfer()}
            className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300"
          >
            <ArrowLeftRight size={18} />
            Transfer
          </button>
          <button
            onClick={handleExportExcel}
            disabled={isExporting}
            className="px-6 py-3 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ExcelIcon />
            {isExporting ? "Exporting..." : "Export Excel"}
          </button>
          <button className="flex items-center justify-center w-10 h-10 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors border border-gray-300">
            <MoreVertical size={18} />
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

        {/* Transactions List */}
        <div className="p-6">
          <div className="space-y-1">
            {balances.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No records found
              </div>
            ) : (
              balances.map((balance: Balance) => (
                <div
                  key={balance.id}
                  onClick={() => handleRowClick(balance)}
                  className="flex items-center justify-between py-4 px-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {balance.source}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded font-medium ${
                            balance.type === "Added"
                              ? "bg-green-100 text-green-700"
                              : "bg-purple-100 text-purple-700"
                          }`}
                        >
                          {CapitalizeFirst(balance.type)}
                        </span>
                        <span className="text-sm text-gray-600">
                          {balance.added_by_fullname}
                        </span>
                        <span className="text-sm text-gray-600">
                          {formatDate(new Date(balance.date), "MMM DD, YYYY")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-gray-900">
                    {formatMoney(balance.amount)}
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

      {/* Create Entry Modal */}
      {isOpenCreateRecord && (
        <CreateDailyRecord onClose={closeCreateRecord} onSave={onSave} />
      )}

      {/* Transfer Modal */}
      {isOpenCreateTransfer && (
        <CreateTransfer onClose={closeCreateTransfer} />
      )}

      {/* Entry Details Modal */}
      {selectedBalance && (
        <EntryDetails
          balance={selectedBalance}
          isOpen={isEntryDetailsOpen}
          onClose={() => {
            setIsEntryDetailsOpen(false);
            setSelectedBalance(null);
          }}
        />
      )}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default OpeningBalancePage;

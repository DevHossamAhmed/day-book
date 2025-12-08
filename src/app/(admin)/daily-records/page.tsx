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
import { fetchBalances } from "@/services/balance.service";
import type { Balance } from "@/types/balance";
import toast from "react-hot-toast";
import { formatDate, getDateByLabel } from "@/lib/utils/date.util";
import Row from "@/components/daily-record/ui/Row";
import { PaginationMeta } from "@/types/pagination";
import { Pagination } from "@/components/ui/Pagination";

const OpeningBalancePage = () => {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [dateFilter, setDateFilter] = useState<string>(getDateByLabel("today"));
  const [balances, setBalances] = useState<Balance[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(2);

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Opening Balance</h1>
          <button
            className="cursor-pointer flex items-center gap-3 bg-gradient-to-r from-blue-400 to-blue-700 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
          >
            <div className="w-8 h-8 border border-[#cefa8c] bg-[#0d81e0] bg-opacity-20 rounded-full flex items-center justify-center">
              <ArrowUpDown size={20} className="text-[#cefa8c]" />
            </div>
            <span className="font-semibold text-[#cefa8c]">
              Today&lsquo;s PNL: $30,211
            </span>
          </button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          {/* Action Buttons */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex gap-3">
              <button
                onClick={() => openCreateRecord()}
                className="flex cursor-pointer items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
              >
                <Plus size={18} />
                Create Entry
              </button>
              <button
                onClick={() => openCreateTransfer()}
                className="flex cursor-pointer items-center gap-2 bg-white text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300"
              >
                <ArrowLeftRight size={18} />
                Transfer
              </button>
              <button className="flex items-center justify-center w-10 h-10 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors border border-gray-300">
                <MoreVertical size={18} />
              </button>
            </div>
          </div>

          {/* Date Navigation */}
          <div className="p-6 border-b border-gray-200">
            {/* Tabs */}
            <div className="flex items-center justify-between gap-6 mb-6">
              <div className="flex gap-6">
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium text-sm">
                  Day
                </button>
                <button className="flex items-center gap-2 text-gray-700 font-medium text-sm">
                  {formatDate(new Date(), "Do MMMM, YYYY")}
                  <ChevronRight size={16} className="rotate-90" />
                </button>
              </div>
              <div className="flex gap-6 ">
                {["Yesterday", "Today", "Tomorrow"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setDateToFilter(tab)}
                    className={`font-medium text-sm pb-1 transition-colors ${activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex justify-end gap-3 mb-4">
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

          {/* Transactions List */}
          <div className="p-6">
            <div className="space-y-3">
              {balances.map((balance: Balance) => (
                <Row key={balance.id} balance={balance} />
              ))}
            </div>
          </div>

          {/* Pagination */}
          <Pagination
            meta={meta}
            onPageChange={(newPage) => onPageChange(newPage)}
          />
        </div>
      </div>

      {/* Create Entry Modal */}
      {isOpenCreateRecord && <CreateDailyRecord onClose={closeCreateRecord} onSave={onSave} />}

      {/* Transfer Modal */}
      {isOpenCreateTransfer && (<CreateTransfer onClose={closeCreateTransfer} />)}

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

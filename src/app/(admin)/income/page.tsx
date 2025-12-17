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
import CreateIncome from "@/components/income/modals/CreateIncome";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";
import { fetchIncomes } from "@/services/income.service";
import { Balance } from "@/types/balance";
import toast from "react-hot-toast";
import IncomeRow from "@/components/income/ui/IncomeRow";
import { PaginationMeta } from "@/types/pagination";
import { Pagination } from "@/components/ui/Pagination";

const IncomePage = () => {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [dateFilter, setDateFilter] = useState<string>(getDateByLabel("today"));
  const [isCreateIncomeOpen, setIsCreateIcomeOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [incomes, setIncomes] = useState<Balance[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>();
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    fetchData(1);
  }, [activeTab, search]);

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
    }
  };

  const onSave = () => {
    fetchData(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Income</h1>
        </div>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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
              className="px-6 py-3 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 font-medium flex items-center gap-2"
            >
              <ExcelIcon />
              Export Excel
            </button>

            <button
              onClick={openCreateIncome}
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
              <div className="flex gap-6 ">
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

          {/* Income List */}
          <div className="p-6">
            <div className="space-y-3">
              {incomes.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No income records found
                </div>
              ) : (
                incomes.map((income: Balance) => (
                  <IncomeRow key={income.id} income={income} onSave={onSave} />
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

      {/* Create Income Side Panel */}
      {isCreateIncomeOpen && (
        <CreateIncome onClose={closeCreateIncome} onSave={onSave} />
      )}
    </div>
  );
};

export default IncomePage;

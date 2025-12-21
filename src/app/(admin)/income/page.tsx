"use client";
import React, { useState, useEffect } from "react";
import { SlidersHorizontal, Search } from "lucide-react";
import { formatDate, getDateByLabel } from "@/lib/utils/date.util";
import CreateIncome from "@/components/income/modals/CreateIncome";
import SearchBar from "@/components/ui/SearchBar";
import DateFilterTabs from "@/components/ui/DateFilterTabs";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DataCard from "@/components/ui/DataCard";
import ExcelIcon from "@/lib/icons/Excel.icon";
import { fetchIncomes } from "@/services/income.service";
import { Income } from "@/types/income";
import toast from "react-hot-toast";
import IncomeRow from "@/components/income/ui/IncomeRow";
import { PaginationMeta } from "@/types/pagination";
import { Pagination } from "@/components/ui/Pagination";

const IncomePage = () => {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [dateFilter, setDateFilter] = useState<string>(getDateByLabel("today"));
  const [isCreateIncomeOpen, setIsCreateIcomeOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);

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

  const headerActions = (
    <>
      <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
        <ExcelIcon />
        Export Excel
      </Button>
      <Button variant="primary" onClick={openCreateIncome}>
        Create Sale
      </Button>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <PageHeader title="Income" actions={headerActions} />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search income..."
          />
          <div className="flex gap-3">
            <Button variant="outline" icon={<SlidersHorizontal size={16} />}>
              Filter
            </Button>
            <Button variant="outline" icon={<Search size={18} />} size="sm" />
          </div>
        </div>

        <Card padding={false}>
          <DateFilterTabs
            activeTab={activeTab}
            onTabChange={setDateToFilter}
          />

          <div className="p-6">
            <DataCard
              data={incomes}
              renderItem={(income) => (
                <IncomeRow key={income.id} income={income} onSave={onSave} />
              )}
              emptyMessage="No income records found"
            />
          </div>

          {meta && (
            <Pagination meta={meta} onPageChange={onPageChange} />
          )}
        </Card>
      </div>

      {isCreateIncomeOpen && (
        <CreateIncome onClose={closeCreateIncome} onSave={onSave} />
      )}
    </div>
  );
};

export default IncomePage;

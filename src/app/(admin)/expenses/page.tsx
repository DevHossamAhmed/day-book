"use client";
import React, { useState, useEffect } from "react";
import { SlidersHorizontal, Search, ChevronRight } from "lucide-react";
import { formatDate, getDateByLabel } from "@/lib/utils/date.util";
import CreateExpense from "@/components/expense/modals/CreateExpense";
import SearchBar from "@/components/ui/SearchBar";
import DateFilterTabs from "@/components/ui/DateFilterTabs";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DataTable from "@/components/ui/DataTable";
import DataCard from "@/components/ui/DataCard";
import EmptyState from "@/components/ui/EmptyState";
import ExcelIcon from "@/lib/icons/Excel.icon";
import { fetchExpenses } from "@/services/expense.service";
import { Expense } from "@/types/expense";
import toast from "react-hot-toast";
import { PaginationMeta } from "@/types/pagination";
import { Pagination } from "@/components/ui/Pagination";
import ExpenseDetails from "@/components/expense/modals/ExpenseDetails";
import { formatMoney } from "@/lib/utils/money.util";

const ExpensesPage = () => {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [dateFilter, setDateFilter] = useState<string>(getDateByLabel("today"));
  const [isCreateExpenseOpen, setIsCreateExpenseOpen] = useState(false);
  const [search, setSearch] = useState<string>("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchData(1);
  }, [activeTab, search, dateFilter]);

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
      const { items, meta } = await fetchExpenses({
        date: dateFilter,
        page: newPage,
        limit,
        search: search || undefined,
      });

      setExpenses(items);
      setMeta(meta);
      setPage(meta.page);
    } catch (error) {
      toast.error("Failed to fetch expense records. Please try again later.");
    }
  };

  const onSave = () => {
    fetchData(1);
  };

  const handleRowClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDetailsOpen(true);
  };

  const tableColumns = [
    {
      key: "date",
      header: "Date",
      render: (expense: Expense) => (
        <div className="text-sm text-gray-900">
          {formatDate(new Date(expense.date), "MMM DD, YYYY")}
        </div>
      ),
    },
    {
      key: "vendor",
      header: "Vendor",
      render: (expense: Expense) => (
        <div className="font-semibold text-gray-900">
          {expense.vendor?.name || "—"}
        </div>
      ),
    },
    {
      key: "expense_type",
      header: "Expense Type",
      render: (expense: Expense) => (
        <div className="text-sm text-gray-900">
          {expense.expense_type?.name || "—"}
        </div>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (expense: Expense) => (
        <div className="font-semibold text-gray-900">
          {formatMoney(expense.amount)}
        </div>
      ),
    },
    {
      key: "payment_method",
      header: "Payment Method",
      render: (expense: Expense) => (
        <div className="text-sm text-gray-700">
          {expense.payment_method || "—"}
        </div>
      ),
    },
    {
      key: "note",
      header: "Note",
      render: (expense: Expense) =>
        expense.note ? (
          <span className="text-sm text-gray-700 line-clamp-1">
            {expense.note}
          </span>
        ) : (
          <span className="text-sm text-gray-400">—</span>
        ),
    },
    {
      key: "action",
      header: "Action",
      className: "text-right",
      render: () => (
        <ChevronRight className="w-5 h-5 text-gray-400 inline" />
      ),
    },
  ];

  const headerActions = (
    <>
      <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
        <ExcelIcon />
        Export Excel
      </Button>
      <Button variant="primary" onClick={openCreateExpense}>
        Create Expense
      </Button>
    </>
  );

  const renderMobileCard = (expense: Expense) => (
    <div
      onClick={() => handleRowClick(expense)}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-900 mb-1 truncate">
          {expense.expense_type?.name || "Expense"}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{expense.vendor?.name || "—"}</span>
          <span>•</span>
          <span>{formatDate(new Date(expense.date), "MMM DD, YYYY")}</span>
        </div>
        {expense.payment_method && (
          <div className="text-sm text-gray-500 mt-1">
            {expense.payment_method}
          </div>
        )}
      </div>
      <div className="text-xl font-bold text-gray-900 ml-4">
        {formatMoney(expense.amount)}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <PageHeader title="Expenses" actions={headerActions} />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search expenses..."
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
            <div className="hidden sm:block">
              <DataTable
                data={expenses}
                columns={tableColumns}
                onRowClick={handleRowClick}
                emptyMessage="No expense records found"
              />
            </div>

            <div className="sm:hidden">
              <DataCard
                data={expenses}
                renderItem={renderMobileCard}
                emptyMessage="No expense records found"
              />
            </div>
          </div>

          {meta && (
            <Pagination meta={meta} onPageChange={onPageChange} />
          )}
        </Card>
      </div>

      {isCreateExpenseOpen && (
        <CreateExpense onClose={closeCreateExpense} onSave={onSave} />
      )}

      {selectedExpense && (
        <ExpenseDetails
          expense={selectedExpense}
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedExpense(null);
          }}
          onSave={onSave}
        />
      )}
    </div>
  );
};

export default ExpensesPage;

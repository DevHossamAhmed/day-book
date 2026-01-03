/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  ChevronRight,
  Trash2,
  Printer,
  Download,
  Image,
  FileText,
  Video,
} from "lucide-react";
import { formatDate, getDateByLabel } from "@/lib/utils/date.util";
import CreateSalary from "@/components/salary/modals/CreateSalary";
import PageTitle from "@/components/ui/PageTitle";
import { PaymentMethod } from "@/data/payment-method";
import { fetchGetIdNameList } from "@/services/user.service";
import { useAsyncData } from "@/hooks/useAsyncData";
import toast from "react-hot-toast";
import { exportToExcel } from "@/lib/utils/excel.util";
import PageLoading from "@/components/ui/PageLoading";
import { fetchSalaries, exportSalaries } from "@/services/salary.service";
import { Salary } from "@/types/salary";
import { PaginationMeta } from "@/types/pagination";
import { Pagination } from "@/components/ui/Pagination";
import { formatMoney } from "@/lib/utils/money.util";
import PageActions from "@/components/ui/PageActions";
import ExportButton from "@/components/ui/ExportButton";
import FilterButton from "@/components/ui/FilterButton";
import FilterPanel, { FilterField } from "@/components/ui/FilterPanel";
import DateFilterTabs from "@/components/ui/DateFilterTabs";
import SidePanel from "@/components/ui/SidePanel";

const SalaryPage = () => {
  const [activeTab, setActiveTab] = useState<string>("Today");
  const [dateFilter, setDateFilter] = useState<string>(getDateByLabel("today"));
  const [isCreateSalaryOpen, setIsCreateSalaryOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState<Salary | null>(null);
  const [search, setSearch] = useState<string>("");
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>();
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(10);
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  
  // Filter states
  const [filterFromDate, setFilterFromDate] = useState<string>("");
  const [filterToDate, setFilterToDate] = useState<string>("");
  const [filterEmployeeId, setFilterEmployeeId] = useState<string>("");
  const [filterPaymentMethod, setFilterPaymentMethod] = useState<string>("");
  const [filterAmountMin, setFilterAmountMin] = useState<string>("");
  const [filterAmountMax, setFilterAmountMax] = useState<string>("");

  // Fetch members for filters
  const {
    data: membersData,
    isLoading: isLoadingMembers,
  } = useAsyncData({
    fetchFn: async () => {
      const res = await fetchGetIdNameList();
      return res.data;
    },
  });

  const members = membersData || [];

  React.useEffect(() => {
    fetchData(1);
  }, [activeTab, search, dateFilter, filterFromDate, filterToDate, filterEmployeeId, filterPaymentMethod, filterAmountMin, filterAmountMax]);

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
      if (filterEmployeeId) params.employee_id = filterEmployeeId;
      if (filterPaymentMethod) params.payment_method = filterPaymentMethod;
      if (filterAmountMin) params.amount_min = filterAmountMin;
      if (filterAmountMax) params.amount_max = filterAmountMax;

      const { items, meta } = await fetchSalaries(params);

      setSalaries(items);
      setMeta(meta);
      setPage(meta.page);
    } catch (error) {
      toast.error("Failed to fetch salary records. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const onPageChange = (newPage: number) => {
    fetchData(newPage);
  };

  const onSave = () => {
    fetchData(1);
  };
  const setDateToFilter = (value: string) => {
    setActiveTab(value);
    setDateFilter(getDateByLabel(value.toLowerCase()));
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
      if (filterEmployeeId) params.employee_id = filterEmployeeId;
      if (filterPaymentMethod) params.payment_method = filterPaymentMethod;
      if (filterAmountMin) params.amount_min = filterAmountMin;
      if (filterAmountMax) params.amount_max = filterAmountMax;

      const data = await exportSalaries(params);
      
      const exportData = data.map((salary) => ({
        "Payment Date": formatDate(new Date(salary.payment_date), "YYYY-MM-DD"),
        "Employee": salary.employee?.first_name && salary.employee?.last_name 
          ? `${salary.employee.first_name} ${salary.employee.last_name}` 
          : "—",
        "Salary Amount": formatMoney(salary.salary_amount),
        "Deductions": salary.deductions ? formatMoney(salary.deductions) : "—",
        "Deduction Reason": salary.deduction_reason || "—",
        "Period": salary.period || "—",
        "Payment Method": salary.payment_method || "—",
        "Status": salary.status || "—",
        "Note": salary.note || "—",
        "Added By": salary.added_by_fullname || "—",
      }));

      exportToExcel(exportData, `salaries-${formatDate(new Date(), "YYYY-MM-DD")}`);
      toast.success("Salary records exported successfully!");
    } catch (error) {
      toast.error("Failed to export salary records. Please try again later.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleClearFilters = () => {
    setFilterFromDate("");
    setFilterToDate("");
    setFilterEmployeeId("");
    setFilterPaymentMethod("");
    setFilterAmountMin("");
    setFilterAmountMax("");
  };

  const activeFilterCount = [
    filterFromDate,
    filterToDate,
    filterEmployeeId,
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
      label: "Employee",
      value: filterEmployeeId,
      onChange: setFilterEmployeeId,
      options: [
        { value: "", label: "All Employees" },
        ...members.map((member) => ({
          value: String(member.id),
          label: member.full_name,
        })),
      ],
      disabled: isLoadingMembers,
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

  const handleDownloadMedia = async (media: any, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const link = document.createElement('a');
      link.href = media.url;
      link.download = media.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('File downloaded successfully');
    } catch (error) {
      toast.error('Failed to download file');
      console.error('Download error:', error);
    }
  };

  const formatFileSize = (bytes: string): string => {
    const size = parseInt(bytes);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
      return <Image size={20} className="text-blue-500" />;
    } else if (mimeType.startsWith('video/')) {
      return <Video size={20} className="text-purple-500" />;
    } else {
      return <FileText size={20} className="text-gray-500" />;
    }
  };

  const handleRowClick = (salary: Salary) => {
    setSelectedSalary(salary);
    setIsDetailsOpen(true);
  };

  return (
    <div>
      <PageTitle 
        title="Salary"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Salary" }
        ]}
      />

      <PageActions
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search salary..."
        actions={
          <>
            <ExportButton onClick={handleExportExcel} isExporting={isExporting} />
            <button
              onClick={() => setIsCreateSalaryOpen(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Create Salary
            </button>
          </>
        }
      />

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
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

        {/* Salaries List */}
        <div className="p-6">
          {isLoading ? (
            <PageLoading />
          ) : (
            <div className="space-y-3">
              {salaries.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  No salary records found
                </div>
              ) : (
                salaries.map((salary) => (
                  <div
                    key={salary.id}
                    onClick={() => handleRowClick(salary)}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {salary.employee?.first_name && salary.employee?.last_name
                            ? `${salary.employee.first_name} ${salary.employee.last_name}`
                            : salary.employee?.first_name || "Employee"}
                        </h3>
                        <div className="flex items-center gap-2 text-sm">
                          {salary.employee?.designation && (
                            <span className="text-gray-600">
                              {salary.employee.designation}
                            </span>
                          )}
                          {salary.payment_date && (
                            <span className="text-gray-600">
                              {formatDate(new Date(salary.payment_date), "MMM DD, YYYY")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {salary.payment_method && (
                        <span className="text-sm font-medium text-gray-600">
                          {salary.payment_method}
                        </span>
                      )}
                      <div className="text-xl font-bold text-gray-900">
                        {formatMoney(salary.salary_amount - (salary.deductions || 0))}
                      </div>
                      <ChevronRight size={20} className="text-gray-400 ml-2" />
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

      {/* Create Salary Modal */}
      {isCreateSalaryOpen && (
        <CreateSalary
          onClose={() => setIsCreateSalaryOpen(false)}
          onSave={onSave}
        />
      )}

      {/* Salary Details Side Panel */}
      {selectedSalary && (
        <SidePanel
          isOpen={isDetailsOpen}
          onClose={() => {
            setIsDetailsOpen(false);
            setSelectedSalary(null);
          }}
          title="Salary Details"
          maxWidth="2xl"
          footer={
            <div className="flex items-center justify-between gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium">
                <Trash2 size={18} />
                Delete
              </button>
              <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                <Printer size={18} />
                Print
              </button>
            </div>
          }
        >
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Employee Info Card */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {selectedSalary.employee?.first_name && selectedSalary.employee?.last_name
                        ? `${selectedSalary.employee.first_name} ${selectedSalary.employee.last_name}`
                        : selectedSalary.employee?.first_name || "Employee"}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      {selectedSalary.employee?.designation || "—"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Employee ID# {selectedSalary.employee_id || "—"}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    {selectedSalary.employee?.joining_date && (
                      <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="text-gray-600 font-medium">
                          Joining Date
                        </span>
                        <span className="text-gray-900 font-semibold">
                          {formatDate(
                            selectedSalary.employee.joining_date instanceof Date 
                              ? selectedSalary.employee.joining_date 
                              : new Date(selectedSalary.employee.joining_date), 
                            "Do MMMM, YYYY"
                          )}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">
                        Pay Period
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {selectedSalary.period || "—"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">
                        Payment Date
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {selectedSalary.payment_date 
                          ? formatDate(new Date(selectedSalary.payment_date), "Do MMMM, YYYY")
                          : "—"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Payment Method</span>
                      <span className="text-gray-900 font-semibold">
                        {selectedSalary.payment_method || "—"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Status</span>
                      <span className={`font-semibold ${
                        selectedSalary.status === "paid" 
                          ? "text-green-600" 
                          : selectedSalary.status === "overdue"
                          ? "text-red-600"
                          : "text-orange-500"
                      }`}>
                        {selectedSalary.status || "—"}
                      </span>
                    </div>
                  </div>

                  {/* Earning & Deduction */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Earning</p>
                        <p className="text-lg font-semibold text-gray-900">
                          Total
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-2">Deduction</p>
                        <p className="text-lg font-semibold text-gray-900">
                          Total
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-gray-200">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Salary</span>
                        <span className="text-gray-900 font-semibold">
                          {formatMoney(selectedSalary.salary_amount)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {selectedSalary.deduction_reason || "Deduction"}
                        </span>
                        <span className="text-red-600 font-semibold">
                          {selectedSalary.deductions ? formatMoney(selectedSalary.deductions) : "—"}
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">Net Amount</span>
                      <span className="text-2xl font-bold text-gray-900">
                        {formatMoney(selectedSalary.salary_amount - (selectedSalary.deductions || 0))}
                      </span>
                    </div>
                  </div>

                  {/* Additional Info */}
                  {selectedSalary.note && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3">
                        Note
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {selectedSalary.note}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column - Attachment */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">
                    Attachments
                  </h4>
                  {selectedSalary.media && selectedSalary.media.length > 0 ? (
                      <div className="space-y-3">
                        {selectedSalary.media.map((mediaItem) => (
                            <div
                              key={mediaItem.id}
                              className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors"
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                {getFileIcon(mediaItem.file_mime_type)}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">
                                    {mediaItem.file_name}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-500">
                                      {formatFileSize(mediaItem.file_size)}
                                    </span>
                                    <span className="text-xs text-gray-400">•</span>
                                    <span className="text-xs text-gray-500">
                                      {mediaItem.file_mime_type}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={(e) => handleDownloadMedia(mediaItem, e)}
                                className="flex items-center gap-2 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors ml-4 flex-shrink-0"
                              >
                                <Download size={16} />
                                Download
                              </button>
                            </div>
                          ))
                        }
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 text-sm">
                        No attachments available
                      </div>
                    )}
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-xs text-gray-500 border-t pt-4 mt-6 col-span-2">
            <p>
              This document has been automatically generated by Day Book.
            </p>
            <p>Therefore, a signature is not required.</p>
          </div>
        </SidePanel>
      )}
    </div>
  );
};

export default SalaryPage;

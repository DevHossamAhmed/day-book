"use client";
import React, { useEffect, useState } from "react";
import CreateMember from "@/components/members/modals/CreateMember";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";
import { fetchMembers, exportMembers } from "@/services/user.service";
import { Member } from "@/types/member";
import toast from "react-hot-toast";
import { formatMoney } from "@/lib/utils/money.util";
import { formatDate } from "@/lib/utils/date.util";
import { exportToExcel } from "@/lib/utils/excel.util";
import PageTitle from "@/components/ui/PageTitle";
import PageLoading from "@/components/ui/PageLoading";

const MembersManagement = () => {
  const [isOpenCreateMember, setOpenCreateMember] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState<string>("");
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const openCreateMember = () => setOpenCreateMember(true);
  const closeCreateMember = () => setOpenCreateMember(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchMembers(search);
      setMembers(res.data);
    } catch (error) {
      toast.error("Failed to fetch members. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSave = async () => {
    await fetchData();
  };

  const handleExportExcel = async () => {
    try {
      setIsExporting(true);
      const data = await exportMembers();
      
      const exportData = data.map((member) => ({
        "First Name": member.first_name,
        "Last Name": member.last_name,
        "Full Name": `${member.first_name} ${member.last_name}`,
        "Email": member.email,
        "Joining Date": member.joining_date ? formatDate(new Date(member.joining_date), "YYYY-MM-DD") : "—",
        "Salary": member.salary_amount ? formatMoney(member.salary_amount) : "—",
        "Designation": member.designation || "—",
        "Role": member.role || "—",
        "Additional Info": member.additional_info || "—",
        "Created At": member.created_at ? formatDate(new Date(member.created_at), "YYYY-MM-DD HH:mm:ss") : "—",
        "Updated At": member.updated_at ? formatDate(new Date(member.updated_at), "YYYY-MM-DD HH:mm:ss") : "—",
      }));

      exportToExcel(exportData, `members-${formatDate(new Date(), "YYYY-MM-DD")}`);
      toast.success("Members exported successfully!");
    } catch (error) {
      toast.error("Failed to export members. Please try again later.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div>
      <PageTitle 
        title="Members"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Members" }
        ]}
      />
      <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <input
                type="text"
                placeholder="Search members..."
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
                onClick={openCreateMember}
                className="px-6 py-3 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Create Member
              </button>
            </div>
          </div>

          {/* Desktop Table */}
          {isLoading ? (
            <div className="bg-[var(--color-overviewTab)] rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <PageLoading />
            </div>
          ) : (
            <div className="hidden sm:block bg-[var(--color-overviewTab)] rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[var(--color-overviewTab)]">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold ">
                      Member
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold ">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold ">
                      Joining Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold ">
                      Salary
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold ">
                      Designation
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {members.map((member) => {
                    return (
                      <tr
                        key={member.id}
                        className={[
                          "group transition-colors cursor-pointer  focus-within:bg-gray-50",
                        ].join(" ")}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-semibold ">
                                {member.first_name} {member.last_name}
                              </div>

                              {member.additional_info ? (
                                <div className="text-sm text-gray-500 line-clamp-1">
                                  {member.additional_info}
                                </div>
                              ) : (
                                <div className="text-sm text-gray-400">—</div>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          {member.email ? (
                            <span className="text-sm ">
                              {member.email}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {member.joining_date ? (
                            <span className="text-sm ">
                              {formatDate(member.joining_date)}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {member.salary_amount !== undefined &&
                            member.salary_amount !== null ? (
                            <span className="text-sm font-medium ">
                              {formatMoney(member.salary_amount)}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {member.designation ? (
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm ">
                              {member.designation}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Mobile Cards */}
          {!isLoading && (
            <div className="sm:hidden bg-[var(--color-overviewTab)] rounded-2xl border border-gray-200 overflow-hidden shadow-sm divide-y divide-gray-200">
            {members.map((member) => {
              return (
                <button
                  key={member.id}
                  type="button"
                  className={[
                    "w-full text-left p-4 space-y-2 transition-colors hover:bg-gray-50 active:bg-gray-100",
                  ].join(" ")}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold ">
                        {member.first_name} {member.last_name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {member.email || "No email"}
                      </div>
                    </div>

                    <span className="text-gray-400">→</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-gray-500">
                      Joined:{" "}
                      <span className="">
                        {member.joining_date ? formatDate(member.joining_date) : "—"}
                      </span>
                    </div>

                    <div className="text-gray-500">
                      Salary:{" "}
                      <span className="">
                        {member.salary_amount !== undefined &&
                          member.salary_amount !== null
                          ? formatMoney(member.salary_amount)
                          : "—"}
                      </span>
                    </div>

                    <div className="text-gray-500 col-span-2">
                      Role:{" "}
                      <span className="">
                        {member.designation || "—"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
            </div>
          )}
        </div>

      {/* Create Member Modal */}
      {isOpenCreateMember && (
        <CreateMember onClose={closeCreateMember} onSave={onSave} />
      )}
    </div>
  );
};

export default MembersManagement;

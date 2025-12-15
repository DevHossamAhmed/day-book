"use client";
import React, { useEffect, useState } from "react";
import CreateMember from "@/components/members/modals/CreateMember";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";
import { fetchMembers } from "@/services/user.service";
import { Member } from "@/types/member";
import toast from "react-hot-toast";

const MembersManagement = () => {
  const [isOpenCreateMember, setOpenCreateMember] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([]);
  const [search, setSearch] = useState<string>("");

  const openCreateMember = () => setOpenCreateMember(true);
  const closeCreateMember = () => setOpenCreateMember(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetchData = async () => {
    try {
      const res = await fetchMembers(search);
      setMembers(res.data);
    } catch (error) {
      toast.error("Failed to fetch members. Please try again later.");
    }
  };

  const onSave = async () => {
    await fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Members</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                className="px-6 py-3 border border-green-600 text-green-700 rounded-lg hover:bg-green-50 font-medium flex items-center gap-2"
              >
                <ExcelIcon />
                Export Excel
              </button>

              <button
                onClick={openCreateMember}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Create Member
              </button>
            </div>
          </div>

          {/* Members List */}
          <div className="hidden sm:block bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Member
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Joining Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Salary
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Designation
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          {member.first_name} {member.last_name}
                        </div>
                        {member.additional_info && (
                          <div className="text-sm text-gray-500">
                            {member.additional_info}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {member.email ? (
                          <span className="text-sm text-gray-700">
                            {member.email}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {member.joining_date ? (
                          <span className="text-sm text-gray-700">
                            {member.joining_date}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {member.salary_amount !== undefined ? (
                          <span className="text-sm text-gray-700">
                            {member.salary_amount}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {member.designation ? (
                          <span className="text-sm text-gray-700">
                            {member.designation}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-400">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="sm:hidden bg-white rounded-lg divide-y divide-gray-200">
            {members.map((member) => (
              <div key={member.id} className="p-4 space-y-1">
                <div className="font-semibold text-gray-900">
                  {member.first_name} {member.last_name}
                </div>
                <div className="text-sm text-gray-600">
                  {member.email || "No email"}
                </div>
                {member.joining_date && (
                  <div className="text-sm text-gray-500">
                    Joined: {member.joining_date}
                  </div>
                )}
                {member.designation && (
                  <div className="text-sm text-gray-500">
                    Role: {member.designation}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Member Modal */}
      {isOpenCreateMember && (
        <CreateMember onClose={closeCreateMember} onSave={onSave} />
      )}
    </div>
  );
};

export default MembersManagement;

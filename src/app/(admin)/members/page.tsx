"use client";
import React, { useState } from "react";
import CreateMember from "@/components/members/modals/CreateMember";
import SearchIcon from "@/lib/icons/Search.icon";
import ExcelIcon from "@/lib/icons/Excel.icon";

const MembersManagement = () => {
  const [isOpenCreateMember, setOpenCreateMember] = useState<boolean>(false);

  const openCreateMember = () => setOpenCreateMember(true);
  const closeCreateMember = () => setOpenCreateMember(false);

  const onSave = () => {
    // Refresh or update the members list after adding a new member
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="p-6 space-y-1"></div>
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

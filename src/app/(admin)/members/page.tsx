"use client";
import React, { useState } from "react";
import { Plus, MoreVertical } from "lucide-react";
import CreateMember from "@/components/members/modals/CreateMember";

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
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Members</h1>
        </div>
        {/* Actions */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => openCreateMember()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium shadow-sm"
          >
            <Plus size={20} />
            Create Member
          </button>
          <button className="bg-white border border-gray-200 p-2.5 rounded-lg hover:bg-gray-50">
            <MoreVertical size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Members List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="p-6 space-y-1"></div>
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

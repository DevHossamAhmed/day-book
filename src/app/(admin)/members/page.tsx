"use client";
import React, { useState } from "react";
import { Search, Trash2, ChevronDown, Calendar } from "lucide-react";
import Link from "next/link";

const MembersManagement = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [members, setMembers] = useState([
    { id: 1, name: "Anthony Fu", avatar: "👨‍💼", role: "Sales" },
    { id: 2, name: "Baptiste Leproux", avatar: "👨‍💻", role: "Sales" },
    { id: 3, name: "Benjamin Canac", avatar: "👨‍🎨", role: "Payments" },
    { id: 4, name: "Farnabaz", avatar: "🎭", role: "Payments" },
    { id: 5, name: "Hugo Richard", avatar: "👨‍🔬", role: "Payments" },
    { id: 6, name: "Sarah Moriceau", avatar: "👩‍💼", role: "Manager" },
    { id: 7, name: "Sébastien Chopin", avatar: "👨‍💼", role: "Admin" },
  ]);

  const [formData, setFormData] = useState({
    employeeName: "",
    designation: "",
    salaryAmount: "",
    salaryCycle: "",
    joiningDate: "",
    additionalInfo: "",
    active: true,
    role: "",
    hideOptions: [],
  });

  const roles = ["Admin", "Account Manager", "Sales Person", "HR", "Employee"];
  const hideOptions = [
    "Dashboard",
    "Sales",
    "Expenses",
    "Bills",
    "Salary",
    "Members",
  ];

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const handleRoleChange = (id: number, newRole: string) => {
    setMembers(
      members.map((member) =>
        member.id === id ? { ...member, role: newRole } : member
      )
    );
  };

  const handleAddMember = () => {
    if (formData.employeeName && formData.role) {
      const newMember = {
        id: members.length + 1,
        name: formData.employeeName,
        avatar: "👤",
        role: formData.role,
      };
      setMembers([...members, newMember]);
      setFormData({
        employeeName: "",
        designation: "",
        salaryAmount: "",
        salaryCycle: "",
        joiningDate: "",
        additionalInfo: "",
        active: true,
        role: "",
        hideOptions: [],
      });
      setShowAddForm(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCheckboxChange = (field: string, value: string) => {
    if (field === "hideOptions") {
      //@ts-expect-error:value
      const newHideOptions = formData.hideOptions.includes(value)
        ? formData.hideOptions.filter((item) => item !== value)
        : [...formData.hideOptions, value];
      //@ts-expect-error:hideOptions
      setFormData({ ...formData, hideOptions: newHideOptions });
    } else if (field === "role") {
      setFormData({ ...formData, role: value });
    }
  };

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link href="/dashboard">
              <span className="text-gray-600 cursor-pointer hover:text-gray-900">
                Dashboard
              </span>
            </Link>
            <ChevronDown className="w-4 h-4 rotate-[-90deg] text-gray-400" />
            <Link href="/members">
              <span className="text-gray-600 cursor-pointer hover:text-gray-900">
                Member
              </span>
            </Link>
            <ChevronDown className="w-4 h-4 rotate-[-90deg] text-gray-400" />
            <span className="text-gray-900">Add Member</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold mb-2">Add Employee</h1>
          <p className="text-gray-600 mb-8">
            Invite new members by email address.
          </p>

          <div className="flex gap-8">
            {/* Left Form Section */}
            <div className="flex-1 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Employee Name
                </label>
                <input
                  type="text"
                  value={formData.employeeName}
                  onChange={(e) =>
                    handleInputChange("employeeName", e.target.value)
                  }
                  placeholder="Jhon Deniyal"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Designation
                </label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) =>
                    handleInputChange("designation", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Salary Amount
                </label>
                <input
                  type="text"
                  value={formData.salaryAmount}
                  onChange={(e) =>
                    handleInputChange("salaryAmount", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Salary Cycle
                </label>
                <div className="relative">
                  <select
                    value={formData.salaryCycle}
                    onChange={(e) =>
                      handleInputChange("salaryCycle", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select cycle</option>
                    <option value="monthly">Monthly</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                  </select>
                  <ChevronDown className="absolute left-auto right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Joining Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) =>
                      handleInputChange("joiningDate", e.target.value)
                    }
                    placeholder="Select date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Calendar className="absolute left-auto right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Additional Info
                </label>
                <textarea
                  value={formData.additionalInfo}
                  onChange={(e) =>
                    handleInputChange("additionalInfo", e.target.value)
                  }
                  //@ts-expect-error:rows
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <button
                onClick={handleAddMember}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Add
              </button>
            </div>

            {/* Right Options Section */}
            <div className="w-80 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-sm font-medium text-gray-900">
                    Active
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      To make inactive disable the button
                    </span>
                    <button
                      onClick={() =>
                        handleInputChange("active", !formData.active)
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.active ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          formData.active ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Role
                </label>
                <div className="space-y-2">
                  {roles.map((role) => (
                    <label
                      key={role}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.role === role}
                        onChange={() => handleCheckboxChange("role", role)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{role}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-3">
                  Hide
                </label>
                <div className="space-y-2">
                  {hideOptions.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={
                          //@ts-expect-error:option
                          formData.hideOptions.includes(option)
                        }
                        onChange={() =>
                          handleCheckboxChange("hideOptions", option)
                        }
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Members</h1>
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Add member
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search or type command..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="absolute left-auto right-12 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
            ⌘K
          </span>
        </div>

        {/* Members List */}
        <div className="space-y-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between py-4 border-b border-gray-200 last:border-0"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-xl">
                  {member.avatar}
                </div>
                <span className="font-medium text-gray-900">{member.name}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <select
                    value={member.role}
                    onChange={(e) =>
                      handleRoleChange(member.id, e.target.value)
                    }
                    className="appearance-none px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                  >
                    <option value="Sales">Sales</option>
                    <option value="Payments">Payments</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                    <option value="HR">HR</option>
                  </select>
                  <ChevronDown className="absolute left-auto right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                <button
                  onClick={() => handleDeleteMember(member.id)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MembersManagement;

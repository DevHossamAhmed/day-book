"use client";
import React, { useState } from "react";
import BankAccount from "@/components/settings/tabs/BankAccount";
import Notification from "@/components/settings/tabs/Notification";
import Vendor from "@/components/settings/tabs/Vendor";
import Store from "@/components/settings/tabs/Store";
import Company from "@/components/settings/tabs/Company";

const CompanySettings = () => {
  const [activeTab, setActiveTab] = useState("company");

  const tabs = [
    { id: "company", label: "Company Details" },
    { id: "stores", label: "Stores" },
    { id: "vendors", label: "Vendors" },
    { id: "bank", label: "Bank Accounts" },
    { id: "notifications", label: "Notifications" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-medium transition-colors relative ${
                  activeTab === tab.id
                    ? "text-white bg-blue-600 rounded-t-lg"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {activeTab === "company" && <Company />}
        {activeTab === "stores" && <Store />}
        {activeTab === "vendors" && <Vendor />}
        {activeTab === "bank" && <BankAccount />}
        {activeTab === "notifications" && <Notification />}
      </div>
    </div>
  );
};

export default CompanySettings;

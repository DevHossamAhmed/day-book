"use client";
import React, { useState } from "react";
import BankAccount from "@/components/settings/tabs/BankAccount";
import Notification from "@/components/settings/tabs/Notification";
import Vendor from "@/components/settings/tabs/Vendor";
import Store from "@/components/settings/tabs/Store";
import Company from "@/components/settings/tabs/Company";
import ExpenseType from "@/components/settings/tabs/ExpenseType";
import PageTitle from "@/components/ui/PageTitle";

const CompanySettings = () => {
  const [activeTab, setActiveTab] = useState("company");

  const tabs = [
    { id: "company", label: "Company Details" },
    { id: "stores", label: "Stores" },
    { id: "vendors", label: "Vendors" },
    { id: "bank", label: "Bank Accounts" },
    { id: "expense-types", label: "Expense Type" },
    { id: "notifications", label: "Notifications" },
  ];

  return (
    <div>
      <PageTitle 
        title="Settings"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Settings" }
        ]}
      />

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200 -mx-6 -mt-6 mb-6">
        <div className="px-6">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-1 py-4 font-semibold text-sm transition-all relative whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Content Area */}
      <div>
        {activeTab === "company" && <Company />}
        {activeTab === "stores" && <Store />}
        {activeTab === "vendors" && <Vendor />}
        {activeTab === "bank" && <BankAccount />}
        {activeTab === "expense-types" && <ExpenseType />}
        {activeTab === "notifications" && <Notification />}
      </div>
    </div>
  );
};

export default CompanySettings;

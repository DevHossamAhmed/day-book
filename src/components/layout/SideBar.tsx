"use client";

import Image from "next/image";
import React from "react";
import Logo from "../../../public/assets/images/Logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiDashboardLine } from "react-icons/ri";
import { PiMoneyFill } from "react-icons/pi";
import { LuNotepadText, LuUserPlus } from "react-icons/lu";
import { GiNotebook } from "react-icons/gi";
import { RiWallet2Line } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/dashboard") {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          h-screen w-[320px] bg-[var(--color-sideBar)]  shadow-lg dark:shadow-2xl dark:shadow-black/20 flex flex-col fixed top-0 left-0 z-[9999]
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo Section */}
        <div className="px-6 py-5 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
          <Image
            src={Logo}
            alt="Logo"
            width={160}
            height={45}
            className="w-auto h-auto"
            priority
          />
          <button
            onClick={onClose}
            className="lg:hidden p-1 transition-colors duration-200"
            style={{ color: "var(--color-sidebar-close)" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-sidebar-text-hover)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-sidebar-close)"}
          >
            <IoMdClose className="text-[24px]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto scrollbar-thin">
          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                  isActive("/dashboard")
                    ? "font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                style={{
                  backgroundColor: isActive("/dashboard") ? "#1520eb" : "transparent",
                  color: isActive("/dashboard") ? "#ffffff" : "var(--color-sidebar-text)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/dashboard")) {
                    e.currentTarget.style.color = "var(--color-sidebar-text-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/dashboard")) {
                    e.currentTarget.style.color = "var(--color-sidebar-text)";
                  }
                }}
                onClick={onClose}
              >
                <RiDashboardLine className="text-[20px]" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/daily-records"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                  isActive("/daily-records")
                    ? "font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                style={{
                  backgroundColor: isActive("/daily-records") ? "#1520eb" : "transparent",
                  color: isActive("/daily-records") ? "#ffffff" : "var(--color-sidebar-text)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/daily-records")) {
                    e.currentTarget.style.color = "var(--color-sidebar-text-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/daily-records")) {
                    e.currentTarget.style.color = "var(--color-sidebar-text)";
                  }
                }}
                onClick={onClose}
              >
                <PiMoneyFill className="text-[20px]" />
                <span>Daily Records</span>
              </Link>
            </li>
            <li>
              <Link
                href="/income"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                  isActive("/income")
                    ? "font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                style={{
                  backgroundColor: isActive("/income") ? "#1520eb" : "transparent",
                  color: isActive("/income") ? "#ffffff" : "var(--color-sidebar-text)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/income")) {
                    e.currentTarget.style.color = "var(--color-sidebar-text-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/income")) {
                    e.currentTarget.style.color = "var(--color-sidebar-text)";
                  }
                }}
                onClick={onClose}
              >
                <PiMoneyFill className="text-[20px]" />
                <span>Income</span>
              </Link>
            </li>
            <li>
              <Link
                href="/expenses"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                  isActive("/expenses")
                    ? "font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                style={{
                  backgroundColor: isActive("/expenses") ? "#1520eb" : "transparent",
                  color: isActive("/expenses") ? "#ffffff" : "var(--color-sidebar-text)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/expenses")) {
                    e.currentTarget.style.color = "var(--color-sidebar-text-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/expenses")) {
                    e.currentTarget.style.color = "var(--color-sidebar-text)";
                  }
                }}
                onClick={onClose}
              >
                <LuNotepadText className="text-[20px]" />
                <span>Expenses</span>
              </Link>
            </li>
            <li>
              <Link
                href="/planned-payments"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                  isActive("/planned-payments")
                    ? "font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                style={{
                  backgroundColor: isActive("/planned-payments") ? "#1520eb" : "transparent",
                  color: isActive("/planned-payments") ? "#ffffff" : "var(--color-sidebar-text)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/planned-payments")) {
                    e.currentTarget.style.color = "var(--color-sidebar-text-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/planned-payments")) {
                    e.currentTarget.style.color = "var(--color-sidebar-text)";
                  }
                }}
                onClick={onClose}
              >
                <GiNotebook className="text-[20px]" />
                <span>Planned Payments</span>
              </Link>
            </li>
            <li>
              <Link
                href="/salary"
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                  isActive("/salary")
                    ? "font-semibold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                style={{
                  backgroundColor: isActive("/salary") ? "#1520eb" : "transparent",
                  color: isActive("/salary") ? "#ffffff" : "var(--color-sidebar-text)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive("/salary")) {
                    e.currentTarget.style.color = "var(--color-sidebar-text-hover)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive("/salary")) {
                    e.currentTarget.style.color = "var(--color-sidebar-text)";
                  }
                }}
                onClick={onClose}
              >
                <RiWallet2Line className="text-[20px]" />
                <span>Salary</span>
              </Link>
            </li>
          </ul>

          {/* Support Section */}
          <div className="mt-8">
            <h2 
              className="px-4 text-[11px] font-semibold tracking-wider mb-3"
              style={{ color: "var(--color-sidebar-heading)" }}
            >
              SUPPORT
            </h2>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/members"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                    isActive("/members")
                      ? "font-semibold"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  style={{
                    backgroundColor: isActive("/members") ? "#1520eb" : "transparent",
                    color: isActive("/members") ? "#ffffff" : "var(--color-sidebar-text)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive("/members")) {
                      e.currentTarget.style.color = "var(--color-sidebar-text-hover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/members")) {
                      e.currentTarget.style.color = "var(--color-sidebar-text)";
                    }
                  }}
                  onClick={onClose}
                >
                  <LuUserPlus className="text-[20px]" />
                  <span>Members</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/settings"
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all duration-200 ${
                    isActive("/settings")
                      ? "font-semibold"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  style={{
                    backgroundColor: isActive("/settings") ? "#1520eb" : "transparent",
                    color: isActive("/settings") ? "#ffffff" : "var(--color-sidebar-text)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive("/settings")) {
                      e.currentTarget.style.color = "var(--color-sidebar-text-hover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive("/settings")) {
                      e.currentTarget.style.color = "var(--color-sidebar-text)";
                    }
                  }}
                  onClick={onClose}
                >
                  <IoSettingsOutline className="text-[20px]" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        {/* Upgrade Section */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className=" p-4 rounded-lg border border-gray-200 dark:border-blue-800/30">
            <h3 
              className="font-bold text-[15px] mb-2"
              style={{ color: "var(--color-sidebar-card-title)" }}
            >
              Need an upgrade?
            </h3>
            <p 
              className="text-[13px] mb-4"
              style={{ color: "var(--color-sidebar-card-text)" }}
            >
              Our plans are designed for your team.
            </p>
            <button 
              className="w-full py-2.5 rounded-lg text-white font-medium text-[14px] transition-colors duration-200 shadow-sm hover:shadow-md"
              style={{ backgroundColor: "var(--color-primary)" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-primary-600)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--color-primary)"}
            >
              Purchase Plan
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
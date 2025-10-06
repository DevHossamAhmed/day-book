import Image from "next/image";
import React from "react";
import Logo from "../../../public/assets/images/Logo.png";
import Link from "next/link";
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
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/10 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          h-screen w-[320px] bg-white border-r border-gray-200 flex flex-col fixed top-0 left-0 z-50
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="px-6 py-5 flex items-center justify-between">
          <Image
            src={Logo}
            alt="Logo"
            width={160}
            height={45}
            className="w-auto h-auto"
          />
          <button
            onClick={onClose}
            className="lg:hidden text-gray-600 hover:text-gray-800 p-1"
          >
            <IoMdClose className="text-[24px]" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium hover:bg-gray-50 hover:text-[#1520eb] transition-all duration-200"
                onClick={onClose}
              >
                <RiDashboardLine className="text-[20px]" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/daily-records"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium hover:bg-gray-50 hover:text-[#1520eb] transition-all duration-200"
                onClick={onClose}
              >
                <PiMoneyFill className="text-[20px]" />
                <span>Daily Records</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium hover:bg-gray-50 hover:text-[#1520eb] transition-all duration-200"
                onClick={onClose}
              >
                <PiMoneyFill className="text-[20px]" />
                <span>Income</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium hover:bg-gray-50 hover:text-[#1520eb] transition-all duration-200"
                onClick={onClose}
              >
                <LuNotepadText className="text-[20px]" />
                <span>Expenses</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium hover:bg-gray-50 hover:text-[#1520eb] transition-all duration-200"
                onClick={onClose}
              >
                <GiNotebook className="text-[20px]" />
                <span>Planned Payments</span>
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium hover:bg-gray-50 hover:text-[#1520eb] transition-all duration-200"
                onClick={onClose}
              >
                <RiWallet2Line className="text-[20px]" />
                <span>Salary</span>
              </Link>
            </li>
          </ul>

          <div className="mt-8">
            <h2 className="px-4 text-gray-400 text-[11px] font-semibold tracking-wider mb-3">
              SUPPORT
            </h2>
            <ul className="space-y-1">
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium hover:bg-gray-50 hover:text-[#1520eb] transition-all duration-200"
                  onClick={onClose}
                >
                  <LuUserPlus className="text-[20px]" />
                  <span>Members</span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium hover:bg-gray-50 hover:text-[#1520eb] transition-all duration-200"
                  onClick={onClose}
                >
                  <IoSettingsOutline className="text-[20px]" />
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="p-4">
          <div className="bg-[#f7f9fa] p-4 rounded-lg">
            <h3 className="font-bold text-[15px] text-gray-800 mb-2">
              Need an upgrade?
            </h3>
            <p className="text-[13px] text-gray-500 mb-4">
              Our plans are designed for your team.
            </p>
            <button className="w-full bg-[#1520eb] py-2.5 rounded-lg text-white font-medium text-[14px] hover:bg-[#0f16c7] transition-colors duration-200">
              Purchase Plan
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
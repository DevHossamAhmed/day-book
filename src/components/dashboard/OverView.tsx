import React from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const OverView = () => {
  return (
    <>
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-3">
        <h2 className="text-lg sm:text-xl font-semibold">Overview</h2>
        
        <div className="flex flex-col xs:flex-row gap-3 w-full sm:w-auto">
          <div className="flex gap-[15px] bg-[#e2e6e9] p-1 rounded-md w-full xs:w-auto">
            <p className="bg-white p-1 rounded-md text-[13px] sm:text-[14px] flex-1 xs:flex-none text-center cursor-pointer">
              Weekly
            </p>
            <p className="text-[#667085] p-1 text-[13px] sm:text-[14px] flex-1 xs:flex-none text-center cursor-pointer hover:text-gray-900">
              Monthly
            </p>
            <p className="text-[#667085] p-1 text-[13px] sm:text-[14px] flex-1 xs:flex-none text-center cursor-pointer hover:text-gray-900">
              Yearly
            </p>
          </div>
          
          <button className="bg-white border px-3 py-2 rounded-md text-[13px] sm:text-[14px] flex items-center justify-center gap-1 hover:bg-gray-50 transition-colors">
            <HiOutlineAdjustmentsHorizontal className="text-[16px]" />
            Filter
          </button>
        </div>
      </div>

      <div className="w-full px-3 sm:w-[95%] lg:w-[90%] mx-auto mt-4 sm:mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-4 rounded-lg border lg:border-0 lg:border-r lg:rounded-none">
            <h2 className="text-[13px] sm:text-[14px] text-gray-600 mb-2">
              Total Transactions
            </h2>
            <p className="text-[24px] sm:text-[28px] lg:text-[30px] font-bold flex flex-wrap items-center gap-2">
              $20,450.87
              <span className="bg-green-200 rounded-md text-[11px] sm:text-[12px] text-green-700 font-bold px-1.5 py-0.5">
                +2.5%
              </span>
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border lg:border-0 lg:border-r lg:rounded-none">
            <h2 className="text-[13px] sm:text-[14px] text-gray-600 mb-2">
              Total Online Sales
            </h2>
            <p className="text-[24px] sm:text-[28px] lg:text-[30px] font-bold flex flex-wrap items-center gap-2">
              $6,135
              <span className="bg-green-200 rounded-md text-[11px] sm:text-[12px] text-green-700 font-bold px-1.5 py-0.5">
                +9.5%
              </span>
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border lg:border-0 lg:border-r lg:rounded-none">
            <h2 className="text-[13px] sm:text-[14px] text-gray-600 mb-2">
              Total Offline Sales
            </h2>
            <p className="text-[24px] sm:text-[28px] lg:text-[30px] font-bold flex flex-wrap items-center gap-2">
              $10,225
              <span className="bg-red-200 rounded-md text-[11px] sm:text-[12px] text-red-700 font-bold px-1.5 py-0.5">
                -1.6%
              </span>
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border lg:border-0 lg:rounded-none">
            <h2 className="text-[13px] sm:text-[14px] text-gray-600 mb-2">
              Total Payments
            </h2>
            <p className="text-[24px] sm:text-[28px] lg:text-[30px] font-bold flex flex-wrap items-center gap-2">
              $4,090
              <span className="bg-green-200 rounded-md text-[11px] sm:text-[12px] text-green-700 font-bold px-1.5 py-0.5">
                +3.5%
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverView;
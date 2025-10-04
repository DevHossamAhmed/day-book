import React from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
import Image from "next/image";
import User from "../../../public/assets/images/user.png";

interface HeaderBarProps {
  onMenuClick: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onMenuClick }) => {
  return (
    <div className="fixed top-0 right-0 z-[999] bg-white border-b border-gray-200 left-0 lg:left-[320px]">
      <div className="w-full flex justify-between lg:justify-end items-center py-2.5 px-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-700 hover:text-[#1520eb] p-2 -ml-2"
        >
          <HiMenuAlt2 className="text-[26px]" />
        </button>

        <div className="flex gap-1.5 lg:pr-[30px] items-center">
          <div className="flex gap-3 md:gap-4">
            <div className="cursor-pointer hover:text-[#1520eb] transition-colors">
              <MdOutlineDarkMode className="text-[19px]" />
            </div>
            <div className="relative cursor-pointer hover:text-[#1520eb] transition-colors">
              <p className="w-[5px] h-[5px] bg-red-400 absolute -top-1 right-0 rounded-full"></p>
              <IoMdNotificationsOutline className="text-[19px]" />
            </div>
          </div>
          <div className="flex items-center cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md transition-colors ml-2">
            <Image
              src={User}
              alt="User"
              width={30}
              height={30}
              className="rounded-full mr-[7px]"
            />
            <h2 className="text-[15px] font-medium hidden sm:block">mahmoud</h2>
            <IoIosArrowDown className="pl-[2px] pt-[2px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
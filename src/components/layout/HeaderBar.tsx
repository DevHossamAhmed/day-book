"use client";
import React, { useState, useRef, useEffect } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import NotificationDropdown from "@/components/ui/NotificationDropdown";
import { Notification } from "@/types/notification";
import Avatar from "@/components/ui/Avatar";

interface HeaderBarProps {
  onMenuClick: () => void;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ onMenuClick }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  const userFullName = (session?.user as any)?.name || "User";

  // Mock notifications - Replace with actual API call
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "New expense added",
      message: "A new expense record has been created successfully.",
      type: "success",
      isRead: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Payment reminder",
      message: "You have a planned payment due tomorrow.",
      type: "warning",
      isRead: false,
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 3,
      title: "System update",
      message: "Your account has been updated successfully.",
      type: "info",
      isRead: true,
      createdAt: new Date(Date.now() - 86400000).toISOString(),
    },
  ]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.link) {
      router.push(notification.link);
    }
    setIsNotificationOpen(false);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });
      router.push("/auth/signin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleProfileClick = () => {
    router.push("/profile");
    setIsDropdownOpen(false);
  };

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
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="cursor-pointer hover:text-[#1520eb] transition-colors relative"
              >
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
                <IoMdNotificationsOutline className="text-[19px]" />
              </button>
              <NotificationDropdown
                notifications={notifications}
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
                onMarkAsRead={handleMarkAsRead}
                onMarkAllAsRead={handleMarkAllAsRead}
                onNotificationClick={handleNotificationClick}
              />
            </div>
          </div>
          <div className="relative ml-2" ref={dropdownRef}>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md transition-colors"
            >
              <Avatar
                src={(session?.user as any)?.image || "/assets/images/user.png"}
                alt={userFullName}
                name={userFullName}
                size="md"
                className="mr-[7px]"
              />
              <h2 className="text-[15px] font-medium hidden sm:block">
                {userFullName}
              </h2>
              <IoIosArrowDown
                className={`pl-[2px] pt-[2px] transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={handleProfileClick}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <IoSettingsOutline className="text-[18px]" />
                  <span>Profile Settings</span>
                </button>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <IoLogOutOutline className="text-[18px]" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
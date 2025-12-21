"use client";
import React, { useState, useRef, useEffect } from "react";
import { IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
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
    <div className="fixed top-0 right-0 z-[999] bg-white border-b border-gray-200 shadow-sm left-0 lg:left-[320px]">
      <div className="w-full flex justify-between lg:justify-end items-center py-2.5 px-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-gray-700 hover:text-[#1520eb] p-2 -ml-2"
        >
          <HiMenuAlt2 className="text-[26px]" />
        </button>

        <div className="flex gap-3 lg:pr-[30px] items-center">
          {/* Enhanced Notification Icon */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className={`relative p-2.5 rounded-lg transition-all duration-200 group ${
                isNotificationOpen
                  ? "bg-blue-50 text-[#1520eb]"
                  : "hover:bg-gray-100 text-gray-700 hover:text-[#1520eb]"
              }`}
              aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
            >
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold px-1.5 shadow-lg ring-2 ring-white animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
              {isNotificationOpen ? (
                <IoMdNotifications className="text-[22px] transition-transform duration-200" />
              ) : (
                <IoMdNotificationsOutline className={`text-[22px] transition-all duration-200 ${
                  unreadCount > 0 ? "animate-pulse" : ""
                }`} />
              )}
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

          {/* Enhanced Avatar Section */}
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center cursor-pointer px-3 py-1.5 rounded-lg transition-all duration-200 ${
                isDropdownOpen
                  ? "bg-gray-50 ring-2 ring-blue-100"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="relative mr-3">
                <Avatar
                  src={(session?.user as any)?.image || "/assets/images/user.png"}
                  alt={userFullName}
                  name={userFullName}
                  size="md"
                  className={`transition-transform duration-200 ${
                    isDropdownOpen ? "ring-2 ring-blue-500 ring-offset-2" : ""
                  }`}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="hidden sm:block">
                <h2 className="text-[15px] font-semibold text-gray-900">
                  {userFullName}
                </h2>
                <p className="text-xs text-gray-500">Online</p>
              </div>
              <IoIosArrowDown
                className={`ml-2 text-gray-500 transition-all duration-200 ${
                  isDropdownOpen ? "rotate-180 text-[#1520eb]" : ""
                }`}
              />
            </div>

            {/* Enhanced Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 overflow-hidden">
                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">{userFullName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{(session?.user as any)?.email || "user@example.com"}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                  >
                    <IoSettingsOutline className="text-[18px] text-gray-500 group-hover:text-[#1520eb] transition-colors" />
                    <span className="font-medium">Profile Settings</span>
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                  >
                    <IoLogOutOutline className="text-[18px] group-hover:scale-110 transition-transform" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
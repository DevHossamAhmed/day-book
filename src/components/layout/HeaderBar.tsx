/* eslint-disable @typescript-eslint/no-explicit-any */
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
import ThemeToggle from "@/components/ui/ThemeToggle";

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
    <div className="fixed top-0 right-0 z-[999] bg-[var(--color-header)] border-b border-gray-200 dark:border-gray-700 shadow-sm left-0 lg:left-[320px] duration-200">
      <div className="w-full flex justify-between lg:justify-end items-center py-2.5 px-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 duration-200 transition-colors"
          style={{ color: "var(--color-header-menu-icon)" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-header-text-hover)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-header-menu-icon)"}
        >
          <HiMenuAlt2 className="text-[26px]" />
        </button>

        <div className="flex gap-3 lg:pr-[30px] items-center">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Enhanced Notification Icon */}
          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className={`relative p-2.5 rounded-lg transition-all duration-200 group ${
                isNotificationOpen
                  ? "bg-blue-50 dark:bg-blue-900/30"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              style={{
                color: isNotificationOpen
                  ? "var(--color-primary)"
                  : "var(--color-header-notification-text)",
              }}
              onMouseEnter={(e) => {
                if (!isNotificationOpen) {
                  e.currentTarget.style.color = "var(--color-header-text-hover)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isNotificationOpen) {
                  e.currentTarget.style.color = "var(--color-header-notification-text)";
                }
              }}
              aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
            >
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] bg-red-500 dark:bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-semibold px-1.5 shadow-lg ring-2 ring-white dark:ring-gray-800 animate-pulse">
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
                  ? "bg-gray-50 dark:bg-gray-700/50 ring-2 ring-blue-100 dark:ring-blue-500/30"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
              }`}
            >
              <div className="relative mr-3">
                <Avatar
                  src={(session?.user as any)?.image || "/assets/images/user.png"}
                  alt={userFullName}
                  name={userFullName}
                  size="md"
                  className={`transition-transform duration-200 ${
                    isDropdownOpen ? "ring-2 ring-blue-500 dark:ring-blue-400 ring-offset-2 dark:ring-offset-gray-800" : ""
                  }`}
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 dark:bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
              </div>
              <div className="hidden sm:block">
                <h2 
                  className="text-[15px] font-semibold"
                  style={{ color: "var(--color-header-user-name)" }}
                >
                  {userFullName}
                </h2>
                <p 
                  className="text-xs"
                  style={{ color: "var(--color-header-user-status)" }}
                >
                  Online
                </p>
              </div>
              <IoIosArrowDown
                className={`ml-2 transition-all duration-200 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                style={{
                  color: isDropdownOpen
                    ? "var(--color-primary)"
                    : "var(--color-header-arrow)",
                }}
              />
            </div>

            {/* Enhanced Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[var(--color-header)] border-b border-gray-200 dark:border-gray-700 rounded-xl shadow-xl dark:shadow-2xl dark:shadow-black/20 border border-gray-200 dark:border-gray-700 py-2 z-50 overflow-hidden">
                <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-b border-gray-100 dark:border-gray-700">
                  <p 
                    className="text-sm font-semibold"
                    style={{ color: "var(--color-header-user-name)" }}
                  >
                    {userFullName}
                  </p>
                  <p 
                    className="text-xs mt-0.5"
                    style={{ color: "var(--color-header-user-status)" }}
                  >
                    {(session?.user as any)?.email || "user@example.com"}
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={handleProfileClick}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                    style={{ color: "var(--color-header-dropdown-text)" }}
                  >
                    <IoSettingsOutline 
                      className="text-[18px] transition-colors"
                      style={{ color: "var(--color-header-dropdown-icon)" }}
                      onMouseEnter={(e) => e.currentTarget.style.color = "var(--color-primary)"}
                      onMouseLeave={(e) => e.currentTarget.style.color = "var(--color-header-dropdown-icon)"}
                    />
                    <span className="font-medium">Profile Settings</span>
                  </button>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
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
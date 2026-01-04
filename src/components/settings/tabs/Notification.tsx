import { useState } from "react";

export default function Notification() {
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: false,
    weeklyDigest: false,
    productUpdates: true,
    importantUpdates: true,
  });

  return (
    <>
      <div className="bg-[var(--color-overviewTab)] rounded-lg p-8 space-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between py-4 border-b border-gray-200">
            <label className="text-sm font-medium ">Email</label>
            <button
              onClick={() =>
                setNotifications({
                  ...notifications,
                  email: !notifications.email,
                })
              }
              className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${
                notifications.email ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-[var(--color-overviewTab)] transition-transform ${
                  notifications.email ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-4">
            <label className="text-sm font-medium ">Desktop</label>
            <button
              onClick={() =>
                setNotifications({
                  ...notifications,
                  desktop: !notifications.desktop,
                })
              }
              className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${
                notifications.desktop ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-[var(--color-overviewTab)] transition-transform ${
                  notifications.desktop ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold  mb-6">
            Account updates
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between py-4">
              <label className="text-sm font-medium ">
                Weekly digest
              </label>
              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    weeklyDigest: !notifications.weeklyDigest,
                  })
                }
                className={`relative inline-flex h-6 cursor-pointer w-11 items-center rounded-full transition-colors ${
                  notifications.weeklyDigest ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-[var(--color-overviewTab)] transition-transform ${
                    notifications.weeklyDigest
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-4">
              <label className="text-sm font-medium ">
                Product updates
              </label>
              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    productUpdates: !notifications.productUpdates,
                  })
                }
                className={`relative inline-flex cursor-pointer h-6 w-11 items-center rounded-full transition-colors ${
                  notifications.productUpdates ? "bg-green-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-[var(--color-overviewTab)] transition-transform ${
                    notifications.productUpdates
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-4">
              <label className="text-sm font-medium ">
                Important updates
              </label>
              <button
                onClick={() =>
                  setNotifications({
                    ...notifications,
                    importantUpdates: !notifications.importantUpdates,
                  })
                }
                className={`relative inline-flex h-6 w-11 cursor-pointer items-center rounded-full transition-colors ${
                  notifications.importantUpdates
                    ? "bg-green-500"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-[var(--color-overviewTab)] transition-transform ${
                    notifications.importantUpdates
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

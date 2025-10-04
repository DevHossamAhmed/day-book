"use client";
import React, { useEffect, useRef, useState } from "react";
import { FiMoreVertical, FiArrowUp, FiArrowDown } from "react-icons/fi";

const RightSide = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [activeTab, setActiveTab] = useState("daily");

  useEffect(() => {
    const loadChartJS = async () => {
      //@ts-expect-error:rightside
      if (typeof window !== "undefined" && !window.Chart) {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          initChart();
        };
        //@ts-expect-error:rightside
      } else if (window.Chart) {
        initChart();
      }
    };

    const initChart = () => {
      if (chartInstance.current) {
        //@ts-expect-error:rightside
        chartInstance.current.destroy();
      }

      if (chartRef.current) {
        //@ts-expect-error:rightside
        const ctx = chartRef.current.getContext("2d");
        //@ts-expect-error:rightside
        chartInstance.current = new window.Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            datasets: [
              {
                data: [150, 350, 200, 300, 180],
                backgroundColor: "#0ea5e9",
                borderRadius: 8,
                barThickness: 40,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                enabled: true,
                backgroundColor: "#1e293b",
                padding: 12,
                bodyFont: {
                  size: 13,
                  weight: "bold",
                },
                displayColors: false,
                callbacks: {
                  title: () => "",
                  //@ts-expect-error:rightside
                  label: (context) => `${context.parsed.y}`,
                },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                border: { display: false },
                ticks: {
                  color: "#94a3b8",
                  font: { size: 12 },
                },
              },
              y: {
                min: 0,
                max: 400,
                ticks: {
                  stepSize: 100,
                  color: "#94a3b8",
                  font: { size: 11 },
                  //@ts-expect-error:rightside
                  callback: (value) => value,
                },
                grid: {
                  color: "#f1f5f9",
                  drawBorder: false,
                },
                border: { display: false },
              },
            },
          },
        });
      }
    };

    loadChartJS();

    return () => {
      if (chartInstance.current) {
        //@ts-expect-error:rightside
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="w-full space-y-6">
      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-gray-900 font-bold text-lg sm:text-xl">
            Product Performance
          </h2>
          <button className="text-gray-400 hover:text-gray-600">
            <FiMoreVertical size={20} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab("daily")}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === "daily"
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Daily Sales
          </button>
          <button
            onClick={() => setActiveTab("online")}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === "online"
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            Online Sales
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeTab === "users"
                ? "bg-gray-900 text-white shadow-sm"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            New Users
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="bg-gray-50 rounded-2xl p-3 sm:p-4">
            <div className="text-gray-600 text-xs sm:text-sm mb-2">Online</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <FiArrowUp className="text-emerald-500" size={14} />
                <span className="text-xl sm:text-2xl font-bold text-gray-900">790</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-3 sm:p-4">
            <div className="text-gray-600 text-xs sm:text-sm mb-2">Offline</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <FiArrowDown className="text-red-500" size={14} />
                <span className="text-xl sm:text-2xl font-bold text-gray-900">572</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 text-xs sm:text-sm">Average Daily Sales</span>
            <div className="flex items-center gap-1">
              <FiArrowDown className="text-red-500" size={14} />
              <span className="text-red-500 text-xs sm:text-sm font-medium">0.52%</span>
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900">$2,950</div>
        </div>

        <div className="h-48 sm:h-64">
          <canvas ref={chartRef}></canvas>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-gray-900 font-bold text-lg sm:text-xl">Activities</h2>
          <button className="text-gray-400 hover:text-gray-600">
            <FiMoreVertical size={20} />
          </button>
        </div>

        <div className="space-y-4 sm:space-y-5">
          <div className="flex gap-3 sm:gap-4">
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Francisco Grbbs"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <div className="bg-emerald-50 text-emerald-600 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[10px] sm:text-xs font-medium flex items-center gap-1 sm:gap-1.5">
                  <svg
                    width="10"
                    height="10"
                    className="sm:w-3 sm:h-3"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                  </svg>
                  New invoice
                </div>
              </div>
              <div className="text-gray-900 text-xs sm:text-sm">
                <span className="font-semibold">Francisco Grbbs</span>
                <span className="text-gray-500"> created invoice</span>
              </div>
              <div className="text-gray-900 font-medium text-xs sm:text-sm mt-0.5">
                PQ-4491C
              </div>
              <div className="text-gray-400 text-[10px] sm:text-xs mt-1">Just Now</div>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <img
              src="https://i.pravatar.cc/150?img=5"
              alt="Courtney Henry"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-gray-900 text-xs sm:text-sm">
                <span className="font-semibold">Courtney Henry</span>
                <span className="text-gray-500"> created invoice</span>
              </div>
              <div className="text-gray-900 font-medium text-xs sm:text-sm mt-0.5">
                HK-234G
              </div>
              <div className="text-gray-400 text-[10px] sm:text-xs mt-1">15 minutes ago</div>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <img
              src="https://i.pravatar.cc/150?img=9"
              alt="Bessie Cooper"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-gray-900 text-xs sm:text-sm">
                <span className="font-semibold">Bessie Cooper</span>
                <span className="text-gray-500"> created invoice</span>
              </div>
              <div className="text-gray-900 font-medium text-xs sm:text-sm mt-0.5">
                LH-2891C
              </div>
              <div className="text-gray-400 text-[10px] sm:text-xs mt-1">5 months ago</div>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <img
              src="https://i.pravatar.cc/150?img=8"
              alt="Theresa Web"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-gray-900 text-xs sm:text-sm">
                <span className="font-semibold">Theresa Web</span>
                <span className="text-gray-500"> created invoice</span>
              </div>
              <div className="text-gray-900 font-medium text-xs sm:text-sm mt-0.5">
                CK-125NH
              </div>
              <div className="text-gray-400 text-[10px] sm:text-xs mt-1">2 weeks ago</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSide;
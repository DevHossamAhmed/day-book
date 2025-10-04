"use client";
import React, { useEffect, useRef } from "react";
import { FiMoreVertical } from "react-icons/fi";

const LeftSide = () => {
  const forecastChartRef = useRef(null);
  const onlineChartRef = useRef(null);
  const offlineChartRef = useRef(null);
  const chartInstances = useRef([]);

  useEffect(() => {
    const loadChartJS = async () => {
      //@ts-expect-error:Chart
      if (typeof window !== "undefined" && !window.Chart) {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
          initCharts();
        };
        //@ts-expect-error:Chart
      } else if (window.Chart) {
        initCharts();
      }
    };

    const initCharts = () => {
      //@ts-expect-error:destroy
      chartInstances.current.forEach((chart) => chart?.destroy());
      chartInstances.current = [];

      if (onlineChartRef.current) {
        //@ts-expect-error:getContext
        const ctx = onlineChartRef.current.getContext("2d");
        //@ts-expect-error:Chart
        const chart = new window.Chart(ctx, {
          type: "line",
          data: {
            labels: ["", "", "", "", "", "", "", ""],
            datasets: [
              {
                data: [45, 52, 38, 48, 42, 55, 45, 38],
                borderColor: "#ef4444",
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
            },
            scales: {
              x: { display: false },
              y: { display: false },
            },
          },
        });
        //@ts-expect-error:chart
        chartInstances.current.push(chart);
      }

      if (offlineChartRef.current) {
        //@ts-expect-error:getContext
        const ctx = offlineChartRef.current.getContext("2d");

        //@ts-expect-error:chart
        const chart = new window.Chart(ctx, {
          type: "line",
          data: {
            labels: ["", "", "", "", "", "", "", ""],
            datasets: [
              {
                data: [35, 42, 48, 45, 52, 58, 62, 65],
                borderColor: "#10b981",
                borderWidth: 2,
                tension: 0.4,
                pointRadius: 0,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: { enabled: false },
            },
            scales: {
              x: { display: false },
              y: { display: false },
            },
          },
        });
        //@ts-expect-error:chart
        chartInstances.current.push(chart);
      }

      if (forecastChartRef.current) {
        //@ts-expect-error:chart
        const ctx = forecastChartRef.current.getContext("2d");
        //@ts-expect-error:chart
        const chart = new window.Chart(ctx, {
          type: "line",
          data: {
            labels: [
              "0k",
              "5k",
              "10k",
              "15k",
              "20k",
              "25k",
              "30k",
              "35k",
              "40k",
              "45k",
              "50k",
              "55k",
              "60k",
            ],
            datasets: [
              {
                data: [20, 28, 42, 38, 45, 35, 52, 100, 35, 48, 42, 65, 28],
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderWidth: 2.5,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: "#3b82f6",
                fill: true,
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
                backgroundColor: "#3b82f6",
                padding: 12,
                bodyFont: {
                  size: 14,
                  weight: "bold",
                },
                displayColors: false,
                callbacks: {
                  title: () => "",
                  //@ts-expect-error:chart
                  label: (context) => `${context.parsed.y}%`,
                },
              },
            },
            scales: {
              x: {
                grid: { display: false },
                border: { display: false },
                ticks: {
                  color: "#9ca3af",
                  font: { size: 11 },
                },
              },
              y: {
                min: 0,
                max: 100,
                ticks: {
                  stepSize: 20,
                  color: "#9ca3af",
                  font: { size: 11 },
                  //@ts-expect-error:chart
                  callback: (value) => `${value}%`,
                },
                grid: {
                  color: "#f3f4f6",
                  drawBorder: false,
                },
                border: { display: false },
              },
            },
            interaction: {
              intersect: false,
              mode: "index",
            },
          },
        });
        //@ts-expect-error:chart
        chartInstances.current.push(chart);
      }
    };

    loadChartJS();

    return () => {
      //@ts-expect-error:chart
      chartInstances.current.forEach((chart) => chart?.destroy());
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-gray-700 font-semibold text-lg mb-2">
                Online Sales
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">2,500</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-red-500 text-sm font-medium">0.31%</span>
                <span className="text-gray-500 text-sm">than last Week</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <FiMoreVertical size={20} />
            </button>
          </div>

          <div className="h-16">
            <canvas ref={onlineChartRef}></canvas>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-gray-700 font-semibold text-lg mb-2">
                Offline Sales
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">3,768</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-emerald-500 text-sm font-medium">
                  +3.85%
                </span>
                <span className="text-gray-500 text-sm">than last Week</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <FiMoreVertical size={20} />
            </button>
          </div>

          <div className="h-16">
            <canvas ref={offlineChartRef}></canvas>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-gray-900 font-semibold text-xl">Forecast</h3>
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </select>
        </div>

        <div className="h-80">
          <canvas ref={forecastChartRef}></canvas>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-gray-900 font-semibold text-xl mb-6">
          Daily Summary
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                  Close Date
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                  Online Sales
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                  Offline Sales
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                  Total Sales
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                  Total Payments
                </th>
                <th className="text-left py-4 px-4 text-sm font-medium text-gray-600">
                  Net Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 text-sm text-gray-700">
                    October 30, 2017
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                    $473.85
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                    $473.85
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                    $473.85
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                    $473.85
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                    $473.85
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;

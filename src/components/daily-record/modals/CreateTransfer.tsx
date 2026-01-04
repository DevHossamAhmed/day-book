import { ChevronRight, Save, X } from "lucide-react";

type Props = {
    onClose: () => void;
};

export default function CreateTransfer({ onClose }: Props) {
    const closeDailog = () => {
        onClose();
    }
    return (
        <div
            className="fixed inset-0 flex items-center justify-end z-[9999]"
            onClick={() => closeDailog()}
        >
            <div
                className="bg-[var(--color-overviewTab)] w-full max-w-md h-full shadow-2xl animate-slide-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col h-full">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold ">
                            Transfer Cash
                        </h2>
                        <button
                            onClick={() => closeDailog()}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X size={20} className="text-gray-600" />
                        </button>
                    </div>

                    {/* Modal Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Date Field */}
                        <div>
                            <label className="block text-sm font-semibold  mb-2">
                                Date
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Select date"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="absolute right-3 top-3 text-gray-400">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* From Account Field */}
                        <div>
                            <div className="relative">
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[var(--color-overviewTab)] ">
                                    <option value="cash-sale">Cash in Sale Counter</option>
                                    <option value="cash-bank">Cash in Bank</option>
                                    <option value="other">Other</option>
                                </select>
                                <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                                    <ChevronRight size={20} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        {/* Transfer Arrow */}
                        <div className="flex justify-center">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    className="text-gray-600"
                                >
                                    <path
                                        d="M10 4L10 16M10 16L6 12M10 16L14 12"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* To Account Field */}
                        <div>
                            <div className="relative">
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-[var(--color-overviewTab)] ">
                                    <option value="undeposited">Undeposited Fund</option>
                                    <option value="cash-sale">Cash in Sale Counter</option>
                                    <option value="cash-bank">Cash in Bank</option>
                                    <option value="other">Other</option>
                                </select>
                                <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                                    <ChevronRight size={20} className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        {/* Amount Field */}
                        <div>
                            <label className="block text-sm font-semibold  mb-2">
                                Amount
                            </label>
                            <input
                                type="text"
                                placeholder="Select date"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <p className="text-sm text-blue-600 font-medium mt-2">
                                21,000 Available in Cash Counter
                            </p>
                        </div>

                        {/* Attachment Field */}
                        <div>
                            <label className="block text-sm font-semibold  mb-2">
                                Attachment
                            </label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
                                <div className="flex flex-col items-center gap-2">
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        className="text-gray-400"
                                    >
                                        <rect
                                            x="8"
                                            y="12"
                                            width="24"
                                            height="20"
                                            rx="2"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        />
                                        <circle cx="15" cy="19" r="2" fill="currentColor" />
                                        <path
                                            d="M32 26L27 21L20 28"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <p className="text-sm text-gray-500 font-medium">
                                        Drag & Drop Receipt
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info Field */}
                        <div>
                            <label className="block text-sm font-semibold  mb-2">
                                Additional Info
                            </label>
                            <textarea
                                placeholder="Receipt Info (optional)"
                                //@ts-expect-error:row
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="p-6 border-t border-gray-200 ">
                        <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
                            <Save size={18} />
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
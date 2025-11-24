import React from 'react';
import { X, Trash2, Printer } from 'lucide-react';

interface EntryDetailsProps {
  isOpen: boolean;
  onClose: () => void;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/5 bg-opacity-50 z-[9998]" 
        onClick={onClose}
      />
      <div className="fixed inset-0 flex items-center justify-end z-[9999] pointer-events-none">
        <div 
          className="bg-white w-full max-w-2xl h-full shadow-2xl animate-slide-in overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Entry Details</h1>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors">
                <Trash2 size={18} />
                Delete
              </button>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Date and Amount */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">21/09/2025</p>
                <h2 className="text-xl font-semibold text-gray-900">Cash in Bank</h2>
              </div>
              <div className="text-3xl font-bold text-blue-600">$21,500</div>
            </div>

            {/* Note Section */}
            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Note</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  This is an additional information. If available this section will show otherwise it will be hidden.
                </p>
              </div>
            </div>

            {/* Attachment Section */}
            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Attachment</h3>
              <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="bg-gray-50 rounded p-4">
                  {/* Document Preview */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-5 h-5 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        PDF
                      </div>
                      <span className="text-xs font-semibold text-gray-700">
                        Written Tests - Recruitment - 2025 (94:Draft)
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-3">
                      It is reported that Written Test of Warshaat candidates for the recruitment posts of RCS 2 for 10 Assistant Role Inspector, Corporal, LDC, UDO, Assistant, Lab Attendant, Stenotypist, and others is to be conducted on dates mentioned below at mentioned places.
                    </p>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-gray-200">
                          <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Date / Day</th>
                          <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Shift</th>
                          <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Post</th>
                          <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Batch</th>
                          <th className="border border-gray-300 px-2 py-1 text-left font-semibold">Test Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1">
                            <div className="font-semibold">07-04-2025</div>
                            <div className="text-gray-600">(Day 1)</div>
                          </td>
                          <td className="border border-gray-300 px-2 py-1">Morning</td>
                          <td className="border border-gray-300 px-2 py-1">AM</td>
                          <td className="border border-gray-300 px-2 py-1">Batch – 1</td>
                          <td className="border border-gray-300 px-2 py-1">9 AM</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-2 py-1"></td>
                          <td className="border border-gray-300 px-2 py-1">Afternoon</td>
                          <td className="border border-gray-300 px-2 py-1">Corporal</td>
                          <td className="border border-gray-300 px-2 py-1">Batch – 1</td>
                          <td className="border border-gray-300 px-2 py-1">2 PM</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1">
                            <div className="font-semibold">09-04-2025</div>
                            <div className="text-gray-600">(Day 2)</div>
                          </td>
                          <td className="border border-gray-300 px-2 py-1">Morning</td>
                          <td className="border border-gray-300 px-2 py-1">AM</td>
                          <td className="border border-gray-300 px-2 py-1">Batch – 2</td>
                          <td className="border border-gray-300 px-2 py-1">9 AM</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-2 py-1"></td>
                          <td className="border border-gray-300 px-2 py-1">Afternoon</td>
                          <td className="border border-gray-300 px-2 py-1">Corporal</td>
                          <td className="border border-gray-300 px-2 py-1">Batch – 2</td>
                          <td className="border border-gray-300 px-2 py-1">2 PM</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1">
                            <div className="font-semibold">10-04-2025</div>
                            <div className="text-gray-600">(Day 3)</div>
                          </td>
                          <td className="border border-gray-300 px-2 py-1">Morning</td>
                          <td className="border border-gray-300 px-2 py-1">LDC</td>
                          <td className="border border-gray-300 px-2 py-1">-</td>
                          <td className="border border-gray-300 px-2 py-1">9 AM</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-2 py-1"></td>
                          <td className="border border-gray-300 px-2 py-1">Afternoon</td>
                          <td className="border border-gray-300 px-2 py-1">Corporal</td>
                          <td className="border border-gray-300 px-2 py-1">Batch – 3</td>
                          <td className="border border-gray-300 px-2 py-1">2 PM</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1">
                            <div className="font-semibold">11-04-2025</div>
                            <div className="text-gray-600">(Day 4)</div>
                          </td>
                          <td className="border border-gray-300 px-2 py-1">Afternoon</td>
                          <td className="border border-gray-300 px-2 py-1">Assistant</td>
                          <td className="border border-gray-300 px-2 py-1">-</td>
                          <td className="border border-gray-300 px-2 py-1">2 PM</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-2 py-1">
                            <div className="font-semibold">12-04-2025</div>
                          </td>
                          <td className="border border-gray-300 px-2 py-1">Morning</td>
                          <td className="border border-gray-300 px-2 py-1">Lab Attendant</td>
                          <td className="border border-gray-300 px-2 py-1">-</td>
                          <td className="border border-gray-300 px-2 py-1">9 AM</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-2 py-1">
                            <div className="text-gray-600">(Day 5)</div>
                          </td>
                          <td className="border border-gray-300 px-2 py-1">Afternoon</td>
                          <td className="border border-gray-300 px-2 py-1">Stenotypist</td>
                          <td className="border border-gray-300 px-2 py-1">-</td>
                          <td className="border border-gray-300 px-2 py-1">1 PM</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-2 py-1"></td>
                          <td className="border border-gray-300 px-2 py-1">Evening</td>
                          <td className="border border-gray-300 px-2 py-1">Nursing Assistant</td>
                          <td className="border border-gray-300 px-2 py-1">-</td>
                          <td className="border border-gray-300 px-2 py-1">5 PM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-xs text-gray-500 mb-4">
              This document has been automatically generated by Day Book. Therefore, a signature is not required.
            </div>
          </div>

          {/* Print Button */}
          <div className="flex justify-end p-6 border-t border-gray-200">
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              <Printer size={20} />
              Print
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default EntryDetails;
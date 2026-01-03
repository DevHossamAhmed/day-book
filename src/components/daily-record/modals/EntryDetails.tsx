import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { Balance } from '@/types/balance';
import { formatMoney } from '@/lib/utils/money.util';

interface BalanceDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  balance: Balance;
}

const BalanceDetails: React.FC<BalanceDetailsProps> = ({ isOpen, onClose, balance }) => {
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
                <p className="text-sm text-gray-500 mb-1">{balance.date}</p>
                <h2 className="text-xl font-semibold text-gray-900">{balance.source}</h2>
              </div>
              <div className="text-3xl font-bold text-blue-600">{formatMoney(balance.amount)}</div>
            </div>

            {/* Note Section */}
            <div className="mb-8">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Note</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">
                  {balance.note}
                </p>
              </div>
            </div>
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

BalanceDetails.displayName = 'BalanceDetails';

export default BalanceDetails;
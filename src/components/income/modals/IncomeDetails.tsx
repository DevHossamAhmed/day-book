import React, { useState } from 'react';
import { X, Trash2, Edit } from 'lucide-react';
import { Income } from '@/types/income';
import { formatMoney } from '@/lib/utils/money.util';
import { destroy } from '@/services/income.service';
import toast from 'react-hot-toast';
import UpdateIncome from './UpdateIncome';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    income: Income;
    onSave?: () => void;
};

export default function IncomeDetails({ isOpen, onClose, income, onSave }: Props) {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    if (!isOpen) return null;

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this income record?')) {
            return;
        }

        try {
            setIsDeleteLoading(true);
            await destroy(income.id);
            toast.success('Income record deleted successfully');
            onSave?.();
            onClose();
        } catch (error) {
            toast.error('Failed to delete income record');
        } finally {
            setIsDeleteLoading(false);
        }
    };

    const handleUpdate = () => {
        setIsUpdateOpen(true);
    };

    const handleUpdateClose = () => {
        setIsUpdateOpen(false);
    };

    const handleUpdateSave = () => {
        onSave?.();
        setIsUpdateOpen(false);
        onClose();
    };

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
                        <h1 className="text-2xl font-bold text-gray-900">Income Details</h1>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleUpdate}
                                className="flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                <Edit size={18} />
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={isDeleteLoading}
                                className="flex items-center gap-2 px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                            >
                                <Trash2 size={18} />
                                {isDeleteLoading ? 'Deleting...' : 'Delete'}
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
                                <p className="text-sm text-gray-500 mb-1">{income.date}</p>
                                <h2 className="text-xl font-semibold text-gray-900">{income.source}</h2>
                                <div className="mt-2 space-y-1">
                                    {income.sales_person_fullname && (
                                        <p className="text-sm text-gray-500">Sales Person: {income.sales_person_fullname}</p>
                                    )}
                                    {income.payment_method && (
                                        <p className="text-sm text-gray-500">Payment Method: {income.payment_method}</p>
                                    )}
                                    {income.added_by_fullname && (
                                        <p className="text-sm text-gray-500">Added by: {income.added_by_fullname}</p>
                                    )}
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-blue-600">{formatMoney(income.amount)}</div>
                        </div>

                        {/* Note Section */}
                        {income.note && (
                            <div className="mb-8">
                                <h3 className="text-base font-semibold text-gray-900 mb-3">Note</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-700">
                                        {income.note}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Update Income Modal */}
            {isUpdateOpen && (
                <UpdateIncome
                    income={income}
                    onClose={handleUpdateClose}
                    onSave={handleUpdateSave}
                />
            )}

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
}

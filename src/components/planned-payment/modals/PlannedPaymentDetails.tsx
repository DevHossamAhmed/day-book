import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { PlannedPayment } from '@/types/planned-payment';
import { formatMoney } from '@/lib/utils/money.util';
import { formatDate } from '@/lib/utils/date.util';
import { destroy } from '@/services/planned-payment.service';
import toast from 'react-hot-toast';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    payment: PlannedPayment;
    onSave?: () => void;
};

export default function PlannedPaymentDetails({ isOpen, onClose, payment, onSave }: Props) {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);

    if (!isOpen) return null;

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this planned payment?')) {
            return;
        }

        try {
            setIsDeleteLoading(true);
            await destroy(payment.id);
            toast.success('Planned payment deleted successfully');
            onSave?.();
            onClose();
        } catch (error) {
            toast.error('Failed to delete planned payment');
        } finally {
            setIsDeleteLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid":
                return "text-green-600";
            case "overdue":
                return "text-red-600";
            default:
                return "text-orange-500";
        }
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
                        <h1 className="text-2xl font-bold text-gray-900">Planned Payment Details</h1>
                        <div className="flex items-center gap-3">
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
                                <p className="text-sm text-gray-500 mb-1">
                                    {payment.due_date ? formatDate(new Date(payment.due_date), "Do MMMM, YYYY") : ""}
                                </p>
                                <h2 className="text-xl font-semibold text-gray-900">{payment.purpose || "Planned Payment"}</h2>
                                <div className="mt-2 space-y-1">
                                    {payment.vendor_name && (
                                        <p className="text-sm text-gray-500">Vendor: {payment.vendor_name}</p>
                                    )}
                                    {payment.payment_method && (
                                        <p className="text-sm text-gray-500">Payment Method: {payment.payment_method}</p>
                                    )}
                                    <p className={`text-sm font-medium ${getStatusColor(payment.status)}`}>
                                        Status: {payment.status}
                                    </p>
                                    {payment.added_by_fullname && (
                                        <p className="text-sm text-gray-500">Added by: {payment.added_by_fullname}</p>
                                    )}
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-blue-600">{formatMoney(payment.amount)}</div>
                        </div>

                        {/* Note Section */}
                        {payment.note && (
                            <div className="mb-8">
                                <h3 className="text-base font-semibold text-gray-900 mb-3">Note</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-700">
                                        {payment.note}
                                    </p>
                                </div>
                            </div>
                        )}
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
}





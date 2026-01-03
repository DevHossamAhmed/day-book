import React, { useState } from 'react';
import { X, Trash2, Edit, Download, Image, FileText, Video } from 'lucide-react';
import { Expense } from '@/types/expense';
import { Media } from '@/types/media';
import { formatMoney } from '@/lib/utils/money.util';
import { destroy } from '@/services/expense.service';
import toast from 'react-hot-toast';
import UpdateExpense from './UpdateExpense';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    expense: Expense;
    onSave?: () => void;
};

export default function ExpenseDetails({ isOpen, onClose, expense, onSave }: Props) {
    const [isDeleteLoading, setIsDeleteLoading] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);

    if (!isOpen) return null;

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this expense record?')) {
            return;
        }

        try {
            setIsDeleteLoading(true);
            await destroy(expense.id);
            toast.success('Expense record deleted successfully');
            onSave?.();
            onClose();
        } catch (error) {
            toast.error('Failed to delete expense record');
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

    const handleDownloadMedia = async (media: Media, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            // Fetch the file directly from the URL
            const response = await fetch(media.url);
            if (!response.ok) throw new Error('Failed to fetch file');

            // Create a blob URL and trigger download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = media.file_name;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            toast.success('File downloaded successfully');
        } catch (error) {
            toast.error('Failed to download file');
            console.error('Download error:', error);
        }
    };

    const formatFileSize = (bytes: string): string => {
        const size = parseInt(bytes);
        if (size < 1024) return `${size} B`;
        if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
    };

    const getFileIcon = (mimeType: string) => {
        if (mimeType.startsWith('image/')) {
            return <Image size={20} className="text-blue-500" />;
        } else if (mimeType.startsWith('video/')) {
            return <Video size={20} className="text-purple-500" />;
        } else {
            return <FileText size={20} className="text-gray-500" />;
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
                        <h1 className="text-2xl font-bold text-gray-900">Expense Details</h1>
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
                                <p className="text-sm text-gray-500 mb-1">{expense.date}</p>
                                <h2 className="text-xl font-semibold text-gray-900">{expense.expense_type?.name || "Expense"}</h2>
                                <div className="mt-2 space-y-1">
                                    {expense.vendor?.name && (
                                        <p className="text-sm text-gray-500">Vendor: {expense.vendor.name}</p>
                                    )}
                                    {expense.payment_method && (
                                        <p className="text-sm text-gray-500">Payment Method: {expense.payment_method}</p>
                                    )}
                                    {expense.added_by_fullname && (
                                        <p className="text-sm text-gray-500">Added by: {expense.added_by_fullname}</p>
                                    )}
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-blue-600">{formatMoney(expense.amount)}</div>
                        </div>

                        {/* Note Section */}
                        {expense.note && (
                            <div className="mb-8">
                                <h3 className="text-base font-semibold text-gray-900 mb-3">Note</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <p className="text-sm text-gray-700">
                                        {expense.note}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Media Section */}
                        {expense.media && expense.media.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-base font-semibold text-gray-900 mb-3">Media</h3>
                                <div className="space-y-3">
                                    {expense.media.map((mediaItem) => (
                                        <div
                                            key={mediaItem.id}
                                            className="flex items-center justify-between bg-gray-50 rounded-lg p-4 border border-gray-200 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 flex-1 min-w-0">
                                                {getFileIcon(mediaItem.file_mime_type)}
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {mediaItem.file_name}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-xs text-gray-500">
                                                            {formatFileSize(mediaItem.file_size)}
                                                        </span>
                                                        <span className="text-xs text-gray-400">•</span>
                                                        <span className="text-xs text-gray-500">
                                                            {mediaItem.file_mime_type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={(e) => handleDownloadMedia(mediaItem, e)}
                                                className="flex items-center gap-2 px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors ml-4 flex-shrink-0"
                                            >
                                                <Download size={16} />
                                                Download
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Update Expense Modal */}
            {isUpdateOpen && (
                <UpdateExpense
                    expense={expense}
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

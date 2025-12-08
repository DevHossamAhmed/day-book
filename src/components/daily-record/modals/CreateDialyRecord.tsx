import ErrorMessage from "@/components/ui/ErrorMessage";
import Loading from "@/components/ui/Loading";
import { sources } from "@/data/sources";
import { store } from "@/services/balance.service";
import { CreateRecordValidationSchema } from "@/validations/daily-record.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, X, Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
    onClose: () => void;
    onSave: () => void;
};

export default function CreateDailyRecord({ onClose, onSave }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(CreateRecordValidationSchema),
    });

    const closeDailog = () => {
        onClose();
    }

    const onSubmit = async (data: any) => {
        try {
            setServerErrors([]);
            setIsLoading(true);

            await store({type: "added", ...data});
            
            toast.success("Record added successfully!");
            reset();
            onSave();
            closeDailog();
        } catch (error) {
            if (error instanceof Error && 'response' in error && (error as any).response?.data?.message) {
                setServerErrors((error as any).response.data.message);
            } else {
                setServerErrors(['An unexpected error occurred. Please try again later.']);
            }
        } finally { setIsLoading(false); }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-end z-[9999]"
            onClick={() => closeDailog()}
        >
            <div
                className="bg-white w-full max-w-md h-full shadow-2xl animate-slide-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col h-full">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">
                                Create Entry
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
                            {serverErrors.length > 0 && (
                                <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg space-y-1 mb-4">
                                    {serverErrors.map((err, index) => (
                                        <p key={index} className="text-sm">
                                            • {err}
                                        </p>
                                    ))}
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Date
                                </label>
                                <div className="relative">
                                    <input
                                        {...register("date")}
                                        type="date"
                                        placeholder="Select date"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                {errors.date && (
                                    <ErrorMessage message={errors.date.message} />
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Source
                                </label>
                                <div className="relative">
                                    <select {...register("source")} className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                                        <option value="">Select Source</option>
                                        {sources.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                                        <ChevronRight size={20} className="rotate-90" />
                                    </div>
                                    {errors.source && (
                                        <ErrorMessage message={errors.source.message} />
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Amount
                                </label>
                                <input
                                    type="text"
                                    {...register("amount")}
                                    placeholder="Enter amount"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {errors.amount && (
                                    <ErrorMessage message={errors.amount.message} />
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Note
                                </label>
                                <textarea
                                    {...register("note")}
                                    placeholder="Receipt Info (optional)"
                                    //@ts-expect-error:row
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                                {errors.note && (
                                    <ErrorMessage message={errors.note.message} />
                                )}
                            </div>
                        </div>
                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-200 bg-gray-50">
                            <div className="flex gap-3">
                                <button
                                    disabled={isLoading}
                                    onClick={() => closeDailog()}
                                    className="flex-1 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                >
                                    Save and New
                                </button>
                                <button disabled={isLoading} type="submit" className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <Loading />
                                    ) : (
                                        <>
                                            <Save size={18} />
                                            Save
                                        </>
                                    )}

                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
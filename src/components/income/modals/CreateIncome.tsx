import Loading from "@/components/ui/Loading";
import { store } from "@/services/income.service";
import { CreateIncomeValidationSchema } from "@/validations/income.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Save, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
    onClose: () => void;
    onSave: () => void;
};

export default function CreateIncome({ onClose, onSave }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(CreateIncomeValidationSchema),
    });

    const closeDailog = () => {
        onClose();
    }

    const onSubmit = async (data: any) => {
        try {
            setServerErrors([]);
            setIsLoading(true);

            await store(data);

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
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/5 bg-opacity-50 z-[*999]"
                onClick={() => closeDailog()}
            />
            <div className="fixed top-0 right-0 h-full w-[560px] bg-white shadow-2xl z-[999999] flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Create Income</h2>
                    <button
                        onClick={() => closeDailog()}
                        className="p-1 hover:bg-gray-100 rounded-lg"
                    >
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Date</label>
                            <div className="relative flex justify-between">
                                <input
                                    type="text"
                                    placeholder="Select date"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Channel</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                    <option value=""></option>
                                </select>
                                <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Sales Person</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                    <option value=""></option>
                                </select>
                                <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Amount</label>
                            <input
                                type="text"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Payment Method</label>
                            <div className="relative">
                                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                                    <option value=""></option>
                                </select>
                                <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">Note</label>
                            <textarea
                                placeholder="Receipt Info (optional)"
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            />
                        </div>
                    </div>
                    <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
                        <button disabled={isLoading} className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
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
                </form>
            </div>
        </>
    )
}
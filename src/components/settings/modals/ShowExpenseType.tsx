import { X, Save } from "lucide-react";
import { ExpenseType } from "@/types/expense-type";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateExpenseTypeValidationSchema } from "@/validations/expense-type.validation";
import { update as updateExpenseType } from "@/services/expense-type.service";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Loading from "@/components/ui/Loading";
import ValidationServerErrors from "@/components/ui/ValidationServerErrors";
import toast from "react-hot-toast";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
    onClose: () => void;
    isOpen: boolean;
    expenseType: ExpenseType;
    onSave?: () => void;
};
export default function ShowExpenseType({ onClose, isOpen, expenseType, onSave }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(CreateExpenseTypeValidationSchema),
        defaultValues: {
            name: expenseType.name || "",
        },
    });

    useEffect(() => {
        if (isOpen && expenseType) {
            reset({
                name: expenseType.name || "",
            });
        }
    }, [expenseType, isOpen, reset]);

    const closeDailog = () => {
        onClose();
    };

    const submit = async (data: any) => {
        setServerErrors([]);
        setIsLoading(true);
        try {
            await updateExpenseType(expenseType.id, data);
            toast.success("Expense Type updated successfully.");
            if (onSave) await onSave();
            closeDailog();
        } catch (error) {
            if (
                error instanceof Error &&
                "response" in error &&
                (error as any).response?.data?.errors
            ) {
                setServerErrors((error as any).response.data.errors);
            } else if (
                error instanceof Error &&
                "response" in error &&
                (error as any).response?.data?.message
            ) {
                setServerErrors(
                  Array.isArray((error as any).response.data.message)
                    ? (error as any).response.data.message
                    : [(error as any).response.data.message]
                );
            } else {
                setServerErrors([
                    "An unexpected error occurred. Please try again later.",
                ]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    const formattedDate = expenseType.created_at
        ? dayjs(expenseType.created_at).tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm")
        : "";

    return (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-end z-9999" onClick={() => closeDailog()}>
            <div className="bg-white shadow-xl w-full max-w-2xl h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">{expenseType.name}</h2>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            {expenseType.added_by_fullname && (
                                <span>Added by: {expenseType.added_by_fullname}</span>
                            )}
                            {formattedDate && (
                                <span>Created at: {formattedDate}</span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => closeDailog()}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="p-6 space-y-6 pb-32">
                        {serverErrors.length > 0 && (
                            <ValidationServerErrors errors={serverErrors} />
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Expense Type Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.name ? "border-red-300" : "border-gray-300"
                                }`}
                            />
                            <ErrorMessage message={errors.name?.message as string} />
                        </div>
                    </div>
                    <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white z-10">
                        <button
                            disabled={isLoading}
                            onClick={() => closeDailog()}
                            type="button"
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Save
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import ValidationServerErrors from "@/components/ui/ValidationServerErrors";
import { update } from "@/services/expense.service";
import { CreateExpenseValidationSchema } from "@/validations/expense.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Save, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PaymentMethod } from "@/data/payment-method";
import { fetchGetIdNameList as fetchVendorIdNameList } from "@/services/vendor.service";
import { VendorIdNameList } from "@/types/vendor";
import { Expense } from "@/types/expense";
import { fetchGetIdNameList as fetchExpenseTypeIdNameList } from "@/services/expense-type.service";
import { ExpenseTypeIdNameList } from "@/types/expense-type";

type Props = {
    onClose: () => void;
    onSave: () => void;
    expense: Expense;
};

export default function UpdateExpense({ onClose, onSave, expense }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<string[]>([]);
    const [vendors, setVendors] = useState<VendorIdNameList[]>([]);
    const [expenseTypes, setExpenseTypes] = useState<ExpenseTypeIdNameList[]>([]);
    const [isLoadingVendors, setIsLoadingVendors] = useState(true);
    const [isLoadingExpenseTypes, setIsLoadingExpenseTypes] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        resolver: zodResolver(CreateExpenseValidationSchema),
    });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (expense && vendors.length > 0 && expenseTypes.length > 0) {
            // Format date for input (YYYY-MM-DD)
            const dateValue = expense.date ? new Date(expense.date).toISOString().split('T')[0] : '';
            setValue("date", dateValue);
            setValue("vendor_id", expense.vendor_id?.toString() || "");
            setValue("expense_type_id", expense.expense_type_id?.toString() || "");
            setValue("amount", expense.amount.toString());
            setValue("payment_method", expense.payment_method as any);
            setValue("note", expense.note || "");
        }
    }, [expense, vendors, expenseTypes, setValue]);

    const fetchData = async () => {
        try {
            setIsLoadingVendors(true);
            setIsLoadingExpenseTypes(true);
            const [vendorsRes, expenseTypesRes] = await Promise.all([
                fetchVendorIdNameList(),
                fetchExpenseTypeIdNameList()
            ]);
            setVendors(vendorsRes.data);
            setExpenseTypes(expenseTypesRes.data);
        } catch (error) {
            toast.error("Failed to fetch data. Please try again later.");
        } finally {
            setIsLoadingVendors(false);
            setIsLoadingExpenseTypes(false);
        }
    };

    const closeDailog = () => {
        onClose();
    }

    const submit = async (data: any) => {
        setServerErrors([]);
        setIsLoading(true);
        try {
            const payload = {
                ...data,
            };

            await update(expense.id, payload);
            toast.success("Expense record updated successfully!");
            onSave();
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

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/5 bg-opacity-50 z-[*999]"
                onClick={() => closeDailog()}
            />
            <div className="fixed top-0 right-0 h-full w-[560px] bg-white shadow-2xl z-[999999] flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">Update Expense</h2>
                    <button
                        onClick={() => closeDailog()}
                        className="p-1 hover:bg-gray-100 rounded-lg"
                    >
                        <X size={24} className="text-gray-600" />
                    </button>
                </div>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="p-6 space-y-6">
                        {serverErrors.length > 0 && (
                            <ValidationServerErrors errors={serverErrors} />
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                {...register("date")}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.date ? "border-red-300" : "border-gray-300"
                                }`}
                            />
                            <ErrorMessage message={errors.date?.message as string} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Vendor <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    {...register("vendor_id")}
                                    disabled={isLoadingVendors}
                                    className={`w-full px-4 py-3 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.vendor_id ? "border-red-300" : "border-gray-300"
                                    } ${isLoadingVendors ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                                >
                                    <option value="">{isLoadingVendors ? "Loading..." : "Select vendor"}</option>
                                    {vendors.map((vendor) => (
                                        <option key={vendor.id} value={vendor.id}>
                                            {vendor.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                            <ErrorMessage message={errors.vendor_id?.message as string} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Expense Type <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    {...register("expense_type_id")}
                                    disabled={isLoadingExpenseTypes}
                                    className={`w-full px-4 py-3 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.expense_type_id ? "border-red-300" : "border-gray-300"
                                    } ${isLoadingExpenseTypes ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                                >
                                    <option value="">{isLoadingExpenseTypes ? "Loading..." : "Select expense type"}</option>
                                    {expenseTypes.map((expenseType) => (
                                        <option key={expenseType.id} value={expenseType.id}>
                                            {expenseType.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                            <ErrorMessage message={errors.expense_type_id?.message as string} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Amount <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("amount")}
                                placeholder="Enter amount"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                    errors.amount ? "border-red-300" : "border-gray-300"
                                }`}
                            />
                            <ErrorMessage message={errors.amount?.message as string} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Payment Method <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    {...register("payment_method")}
                                    className={`w-full px-4 py-3 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                                        errors.payment_method ? "border-red-300" : "border-gray-300"
                                    }`}
                                >
                                    <option value="">Select payment method</option>
                                    {PaymentMethod.map((method) => (
                                        <option key={method} value={method}>
                                            {method}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                            <ErrorMessage message={errors.payment_method?.message as string} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Note
                            </label>
                            <textarea
                                {...register("note")}
                                placeholder="Receipt Info (optional)"
                                //@ts-expect-error:rows
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                            <ErrorMessage message={errors.note?.message as string} />
                        </div>
                    </div>
                    <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white z-10">
                        <button
                            type="button"
                            onClick={closeDailog}
                            disabled={isLoading}
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
                                    Update
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

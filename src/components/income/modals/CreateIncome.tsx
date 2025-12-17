import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import ValidationServerErrors from "@/components/ui/ValidationServerErrors";
import { store } from "@/services/income.service";
import { CreateIncomeValidationSchema } from "@/validations/income.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PaymentMethod } from "@/data/payment-method";
import { fetchGetIdNameList } from "@/services/user.service";
import { MemberIdNameList } from "@/types/member";
import { fetchStoreIdNameList } from "@/services/store.service";
import { StoreIdNameList } from "@/types/store";

type Props = {
    onClose: () => void;
    onSave: () => void;
};

export default function CreateIncome({ onClose, onSave }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<string[]>([]);
    const [members, setMembers] = useState<MemberIdNameList[]>([]);
    const [stores, setStores] = useState<StoreIdNameList[]>([]);
    const [isLoadingMembers, setIsLoadingMembers] = useState(true);
    const [isLoadingStores, setIsLoadingStores] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(CreateIncomeValidationSchema),
        defaultValues: {
            date: new Date().toISOString().split('T')[0], // Set today's date as default
        }
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoadingMembers(true);
            setIsLoadingStores(true);
            const [membersRes, storesRes] = await Promise.all([
                fetchGetIdNameList(),
                fetchStoreIdNameList()
            ]);
            setMembers(membersRes.data);
            setStores(storesRes.data);
        } catch (error) {
            toast.error("Failed to fetch data. Please try again later.");
        } finally {
            setIsLoadingMembers(false);
            setIsLoadingStores(false);
        }
    };

    const closeDailog = () => {
        onClose();
    }

    const submit = async (data: any, close = true) => {
        setServerErrors([]);
        setIsLoading(true);
        try {
            // Find the selected sales person's full name
            const selectedMember = members.find(
                (member) => member.id === Number(data.sales_person_id)
            );


            // Add sales_person_fullname to the payload
            const payload = {
                ...data,
                sales_person_fullname: selectedMember?.full_name || "",
            };

            await store(payload);
            toast.success("Income record added successfully!");
            if (onSave) await onSave();
            if (close) {
                closeDailog();
            } else {
                reset({
                    date: new Date().toISOString().split('T')[0],
                });
            }
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
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-end z-9999">
            <div className="bg-white shadow-xl w-full max-w-2xl h-full overflow-y-auto">
                <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                    <h2 className="text-xl font-semibold text-gray-900">Create Income</h2>
                    <button
                        onClick={() => closeDailog()}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Close modal"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit((d) => submit(d, true))}>
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
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.date ? "border-red-300" : "border-gray-300"
                                    }`}
                            />
                            <ErrorMessage message={errors.date?.message as string} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Store <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    {...register("store_id")}
                                    disabled={isLoadingStores}
                                    className={`w-full px-4 py-3 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                                        errors.store_id ? "border-red-300" : "border-gray-300"
                                    } ${isLoadingStores ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                                >
                                    <option value="">{isLoadingStores ? "Loading..." : "Select store"}</option>
                                    {stores.map((store) => (
                                        <option key={store.id} value={store.id}>
                                            {store.name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                            <ErrorMessage message={errors.store_id?.message as string} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Sales Person <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    {...register("sales_person_id")}
                                    disabled={isLoadingMembers}
                                    className={`w-full px-4 py-3 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.sales_person_id ? "border-red-300" : "border-gray-300"
                                        } ${isLoadingMembers ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                                >
                                    <option value="">{isLoadingMembers ? "Loading..." : "Select"}</option>
                                    {members.map((member) => (
                                        <option key={member.id} value={member.id}>
                                            {member.full_name}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                            <ErrorMessage
                                message={errors.sales_person_id?.message as string}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Amount <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("amount")}
                                placeholder="Enter amount"
                                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.amount ? "border-red-300" : "border-gray-300"
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
                                    className={`w-full px-4 py-3 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${errors.payment_method ? "border-red-300" : "border-gray-300"
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
                            disabled={isLoading}
                            onClick={handleSubmit((d) => submit(d, false))}
                            type="button"
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loading />
                            ) : (
                                "Save and New"
                            )}
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
    )
}
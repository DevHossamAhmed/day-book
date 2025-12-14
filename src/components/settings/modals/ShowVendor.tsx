import { X, Save } from "lucide-react";
import { Vendor } from "@/types/vendor";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateVendorValidationSchema } from "@/validations/vendor.validation";
import { update as updateVendor } from "@/services/vendor.service";
import ErrorMessage from "@/components/ui/ErrorMessage";
import Loading from "@/components/ui/Loading";
import toast from "react-hot-toast";

dayjs.extend(utc);
dayjs.extend(timezone);

type Props = {
    onClose: () => void;
    isOpen: boolean;
    vendor: Vendor;
    onSave?: () => void;
};
export default function ShowVendor({ onClose, isOpen, vendor, onSave }: Props) {
    const [isLoading, setIsLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<string[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(CreateVendorValidationSchema),
        defaultValues: {
            name: vendor.name || "",
            contact_person: vendor.contact_person || "",
            phone: vendor.phone || "",
            email: vendor.email || "",
            address: vendor.address || "",
            note: vendor.note || "",
        },
    });

    useEffect(() => {
        if (isOpen && vendor) {
            reset({
                name: vendor.name || "",
                contact_person: vendor.contact_person || "",
                phone: vendor.phone || "",
                email: vendor.email || "",
                address: vendor.address || "",
                note: vendor.note || "",
            });
        }
    }, [vendor, isOpen, reset]);

    const closeDailog = () => {
        onClose();
    };

    const submit = async (data: any) => {
        setServerErrors([]);
        setIsLoading(true);
        try {
            await updateVendor(vendor.id, data);
            toast.success("Vendor updated successfully.");
            if (onSave) await onSave();
            closeDailog();
        } catch (error) {
            if (
                error instanceof Error &&
                "response" in error &&
                (error as any).response?.data?.message
            ) {
                setServerErrors((error as any).response.data.message);
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

    const formattedDate = vendor.created_at
        ? dayjs(vendor.created_at).tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm")
        : "";

    return (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-end z-9999" onClick={() => closeDailog()}>
            <div className="bg-white shadow-xl w-full max-w-2xl h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
                    <div>
                        <h2 className="text-xl font-semibold text-gray-900">{vendor.name}</h2>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            {vendor.added_by_fullname && (
                                <span>Added by: {vendor.added_by_fullname}</span>
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
                            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg space-y-1 mb-4">
                                {serverErrors.map((err, index) => (
                                    <p key={index} className="text-sm">
                                        • {err}
                                    </p>
                                ))}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Vendor Name*
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <ErrorMessage message={errors.name?.message as string} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Contact Person*
                            </label>
                            <input
                                type="text"
                                {...register("contact_person")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <ErrorMessage
                                message={errors.contact_person?.message as string}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Phone*
                            </label>
                            <input
                                type="tel"
                                {...register("phone")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <ErrorMessage message={errors.phone?.message as string} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Email*
                            </label>
                            <input
                                type="email"
                                {...register("email")}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <ErrorMessage message={errors.email?.message as string} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Address
                            </label>
                            <textarea
                                {...register("address")}
                                placeholder="Address (optional)"
                                //@ts-expect-error:rows
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            />
                            <ErrorMessage message={errors.address?.message as string} />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Note
                            </label>
                            <textarea
                                {...register("note")}
                                placeholder="Note (optional)"
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
                            onClick={() => closeDailog()}
                            type="button"
                            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
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
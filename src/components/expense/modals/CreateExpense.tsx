import ValidationServerErrors from "@/components/ui/ValidationServerErrors";
import SidePanel from "@/components/ui/SidePanel";
import FormField from "@/components/ui/form/FormField";
import TextInput from "@/components/ui/form/TextInput";
import Select from "@/components/ui/form/Select";
import Textarea from "@/components/ui/form/Textarea";
import DateInput from "@/components/ui/form/DateInput";
import FileUpload from "@/components/ui/form/FileUpload";
import Button from "@/components/ui/Button";
import { store } from "@/services/expense.service";
import { CreateExpenseValidationSchema } from "@/validations/expense.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PaymentMethod } from "@/data/payment-method";
import { fetchGetIdNameList as fetchVendorIdNameList } from "@/services/vendor.service";
import { VendorIdNameList } from "@/types/vendor";
import { fetchGetIdNameList as fetchExpenseTypeIdNameList } from "@/services/expense-type.service";
import { ExpenseTypeIdNameList } from "@/types/expense-type";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { useAsyncData } from "@/hooks/useAsyncData";

type Props = {
    onClose: () => void;
    onSave: () => void;
};

export default function CreateExpense({ onClose, onSave }: Props) {
    const [attachments, setAttachments] = useState<File[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(CreateExpenseValidationSchema),
        defaultValues: {
            date: new Date().toISOString().split("T")[0],
        },
    });

    // Fetch vendors
    const {
        data: vendorsData,
        isLoading: isLoadingVendors,
    } = useAsyncData({
        fetchFn: async () => {
            const res = await fetchVendorIdNameList();
            return res.data;
        },
    });

    // Fetch expense types
    const {
        data: expenseTypesData,
        isLoading: isLoadingExpenseTypes,
    } = useAsyncData({
        fetchFn: async () => {
            const res = await fetchExpenseTypeIdNameList();
            return res.data;
        },
    });

    const vendors = vendorsData || [];
    const expenseTypes = expenseTypesData || [];

    const { handleSubmit: submitForm, isLoading, serverErrors } =
        useFormSubmission({
            onSubmit: async (data: any) => {
                await store({ ...data, attachments });
            },
            onSuccess: () => {
                onSave();
            },
            successMessage: "Expense record added successfully!",
        });

    const onSubmit = async (data: any) => {
        await submitForm(data);
        setAttachments([]);
        onClose();
    };

    const onSaveAndNew = async (data: any) => {
        await submitForm(data);
        reset({
            date: new Date().toISOString().split("T")[0],
        });
        setAttachments([]);
    };

    const footer = (
        <div className="flex justify-end gap-3">
            <Button
                variant="outline"
                onClick={handleSubmit(onSaveAndNew)}
                disabled={isLoading}
                isLoading={isLoading}
            >
                Save and New
            </Button>
            <Button
                type="submit"
                variant="primary"
                icon={<Save className="w-5 h-5" />}
                disabled={isLoading}
                isLoading={isLoading}
            >
                Save
            </Button>
        </div>
    );

    return (
        <SidePanel
            isOpen={true}
            onClose={onClose}
            title="Create Expense"
            footer={footer}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-6">
                    {serverErrors.length > 0 && (
                        <ValidationServerErrors errors={serverErrors} />
                    )}

                    <FormField
                        label="Date"
                        required
                        error={errors.date?.message as string}
                    >
                        <DateInput
                            register={register("date")}
                            error={!!errors.date}
                        />
                    </FormField>

                    <FormField
                        label="Vendor"
                        required
                        error={errors.vendor_id?.message as string}
                    >
                        <Select
                            register={register("vendor_id")}
                            options={vendors.map((v) => ({
                                value: v.id,
                                label: v.name,
                            }))}
                            placeholder="Select vendor"
                            error={!!errors.vendor_id}
                            isLoading={isLoadingVendors}
                        />
                    </FormField>

                    <FormField
                        label="Expense Type"
                        required
                        error={errors.expense_type_id?.message as string}
                    >
                        <Select
                            register={register("expense_type_id")}
                            options={expenseTypes.map((et) => ({
                                value: et.id,
                                label: et.name,
                            }))}
                            placeholder="Select expense type"
                            error={!!errors.expense_type_id}
                            isLoading={isLoadingExpenseTypes}
                        />
                    </FormField>

                    <FormField
                        label="Amount"
                        required
                        error={errors.amount?.message as string}
                    >
                        <TextInput
                            register={register("amount")}
                            placeholder="Enter amount"
                            error={!!errors.amount}
                        />
                    </FormField>

                    <FormField
                        label="Payment Method"
                        required
                        error={errors.payment_method?.message as string}
                    >
                        <Select
                            register={register("payment_method")}
                            options={PaymentMethod.map((method) => ({
                                value: method,
                                label: method,
                            }))}
                            placeholder="Select payment method"
                            error={!!errors.payment_method}
                        />
                    </FormField>

                    <FormField label="Note" error={errors.note?.message as string}>
                        <Textarea
                            register={register("note")}
                            placeholder="Receipt Info (optional)"
                            rows={4}
                        />
                    </FormField>

                    <FormField label="Attachments">
                        <FileUpload
                            value={attachments}
                            onChange={setAttachments}
                        />
                    </FormField>
                </div>
            </form>
        </SidePanel>
    );
}

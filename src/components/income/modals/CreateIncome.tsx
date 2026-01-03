/* eslint-disable @typescript-eslint/no-explicit-any */
import ValidationServerErrors from "@/components/ui/ValidationServerErrors";
import SidePanel from "@/components/ui/SidePanel";
import FormField from "@/components/ui/form/FormField";
import TextInput from "@/components/ui/form/TextInput";
import Select from "@/components/ui/form/Select";
import Textarea from "@/components/ui/form/Textarea";
import DateInput from "@/components/ui/form/DateInput";
import FileUpload from "@/components/ui/form/FileUpload";
import Button from "@/components/ui/Button";
import { store } from "@/services/income.service";
import { CreateIncomeValidationSchema } from "@/validations/income.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PaymentMethod } from "@/data/payment-method";
import { useFormSubmission } from "@/hooks/useFormSubmission";
import { MemberIdNameList } from "@/types/member";
import { StoreIdNameList } from "@/types/store";

type Props = {
    onClose: () => void;
    onSave: () => void;
    members: MemberIdNameList[];
    stores: StoreIdNameList[];
    isLoadingMembers?: boolean;
    isLoadingStores?: boolean;
};

export default function CreateIncome({
    onClose,
    onSave,
    members,
    stores,
    isLoadingMembers = false,
    isLoadingStores = false,
}: Props) {
    const [attachments, setAttachments] = useState<File[]>([]);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(CreateIncomeValidationSchema),
        defaultValues: {
            date: new Date().toISOString().split("T")[0],
        },
    });

    const { handleSubmit: submitForm, isLoading, serverErrors } =
        useFormSubmission({
            onSubmit: async (data: any) => {
                const selectedMember = members.find(
                    (member) => member.id === Number(data.sales_person_id)
                );
                const payload = {
                    ...data,
                    sales_person_fullname: selectedMember?.full_name || "",
                    attachments,
                };
                await store(payload);
            },
            onSuccess: () => {
                onSave();
            },
            successMessage: "Income record added successfully!",
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
                icon={<Save className="w-5 h-5" />}
                disabled={isLoading}
                isLoading={isLoading}
            >
                Save and New
            </Button>
            <Button
                type="submit"
                variant="primary"
                onClick={handleSubmit(onSubmit)}
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
            title="Create Income"
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
                        label="Store"
                        required
                        error={errors.store_id?.message as string}
                    >
                        <Select
                            register={register("store_id")}
                            options={stores.map((s) => ({
                                value: s.id,
                                label: s.name,
                            }))}
                            placeholder="Select store"
                            error={!!errors.store_id}
                            isLoading={isLoadingStores}
                        />
                    </FormField>

                    <FormField
                        label="Sales Person"
                        required
                        error={errors.sales_person_id?.message as string}
                    >
                        <Select
                            register={register("sales_person_id")}
                            options={members.map((m) => ({
                                value: m.id,
                                label: m.full_name,
                            }))}
                            placeholder="Select sales person"
                            error={!!errors.sales_person_id}
                            isLoading={isLoadingMembers}
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
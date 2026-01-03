"use client";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import ValidationServerErrors from "@/components/ui/ValidationServerErrors";
import { CreateSalaryValidationSchema } from "@/validations/salary.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Save, X, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { PaymentMethod } from "@/data/payment-method";
import { fetchGetIdNameList } from "@/services/user.service";
import { MemberIdNameList } from "@/types/member";
import FormField from "@/components/ui/form/FormField";
import FileUpload from "@/components/ui/form/FileUpload";
import { store } from "@/services/salary.service";

type Props = {
  onClose: () => void;
  onSave: () => void;
};

export default function CreateSalary({ onClose, onSave }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [members, setMembers] = useState<MemberIdNameList[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [attachments, setAttachments] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CreateSalaryValidationSchema),
    defaultValues: {
      payment_date: new Date().toISOString().split("T")[0],
      period: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoadingMembers(true);
      const membersRes = await fetchGetIdNameList();
      setMembers(membersRes.data);
    } catch (error) {
      toast.error("Failed to fetch employees. Please try again later.");
    } finally {
      setIsLoadingMembers(false);
    }
  };

  const closeDialog = () => {
    reset({
      payment_date: new Date().toISOString().split("T")[0],
      period: new Date().toISOString().split("T")[0],
    });
    setAttachments([]);
    setServerErrors([]);
    onClose();
  };

  const submit = async (data: any, close = true) => {
    setServerErrors([]);
    setIsLoading(true);
    try {
      await store({ ...data, attachments });
      toast.success("Salary record added successfully!");
      if (onSave) await onSave();
      
      // Reset form to default values
      reset({
        employee_id: "",
        salary_amount: "",
        deductions: "",
        deduction_reason: "",
        payment_date: new Date().toISOString().split("T")[0],
        period: new Date().toISOString().split("T")[0],
        payment_method: "",
        status: "",
        note: "",
      });
      setAttachments([]);
      setServerErrors([]);
      
      if (close) {
        closeDialog();
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
          <h2 className="text-xl font-semibold text-gray-900">Create Salary</h2>
          <button
            onClick={() => closeDialog()}
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

            {/* Employee */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Employee <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  {...register("employee_id")}
                  disabled={isLoadingMembers}
                  className={`w-full px-4 py-3 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.employee_id ? "border-red-300" : "border-gray-300"
                  } ${isLoadingMembers ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                >
                  <option value="">
                    {isLoadingMembers ? "Loading..." : "Select employee"}
                  </option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.full_name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage message={errors.employee_id?.message as string} />
            </div>

            {/* Salary Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Salary Amount <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("salary_amount")}
                placeholder="Enter amount"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.salary_amount ? "border-red-300" : "border-gray-300"
                }`}
              />
              <ErrorMessage
                message={errors.salary_amount?.message as string}
              />
            </div>

            {/* Deductions and Deduction Reason */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Deductions
                </label>
                <input
                  type="text"
                  {...register("deductions")}
                  placeholder="Enter amount"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.deductions ? "border-red-300" : "border-gray-300"
                  }`}
                />
                <ErrorMessage message={errors.deductions?.message as string} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Deduction Reason
                </label>
                <input
                  type="text"
                  {...register("deduction_reason")}
                  placeholder="Enter reason"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.deduction_reason
                      ? "border-red-300"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  message={errors.deduction_reason?.message as string}
                />
              </div>
            </div>

            {/* Payment Date and Period */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Payment Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    {...register("payment_date")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.payment_date ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                <ErrorMessage
                  message={errors.payment_date?.message as string}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Period <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    {...register("period")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.period ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                <ErrorMessage message={errors.period?.message as string} />
              </div>
            </div>

            {/* Payment Method */}
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
              <ErrorMessage
                message={errors.payment_method?.message as string}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  {...register("status")}
                  className={`w-full px-4 py-3 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${
                    errors.status ? "border-red-300" : "border-gray-300"
                  }`}
                >
                  <option value="">Select status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="paid">Paid</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage message={errors.status?.message as string} />
            </div>

            {/* Note */}
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

            {/* Attachments */}
            <FormField label="Attachments">
              <FileUpload
                value={attachments}
                onChange={setAttachments}
              />
            </FormField>
          </div>
          <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white z-10">
            <button
              disabled={isLoading}
              onClick={handleSubmit((d) => submit(d, false))}
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loading /> : "Save and New"}
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

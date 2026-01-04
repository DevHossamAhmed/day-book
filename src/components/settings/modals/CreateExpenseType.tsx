/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorMessage from "@/components/ui/ErrorMessage";
import Loading from "@/components/ui/Loading";
import ValidationServerErrors from "@/components/ui/ValidationServerErrors";
import { CreateExpenseTypeValidationSchema } from "@/validations/expense-type.validation";
import { store as storeExpenseType } from "@/services/expense-type.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  onClose: () => void;
  onSave: () => void;
};
export default function CreateExpenseType({ onClose, onSave }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CreateExpenseTypeValidationSchema),
  });

  const closeDailog = () => {
    onClose();
  };

  const submit = async (data: any, close = true) => {
    setServerErrors([]);
    setIsLoading(true);
    try {
      await storeExpenseType(data);
      toast.success("Expense Type saved successfully.");
      if (onSave) await onSave();
      if (close) {
        closeDailog();
      } else {
        reset();
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
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-end z-9999">
      <div className="bg-[var(--color-overviewTab)] shadow-xl w-full max-w-2xl h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-[var(--color-overviewTab)]">
          <h2 className="text-xl font-semibold ">Create Expense Type</h2>
          <button
            onClick={() => closeDailog()}
            className="text-gray-400 hover:text-gray-600"
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
              <label className="block text-sm font-medium  mb-2">
                Expense Type Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter expense type name"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? "border-red-300" : "border-gray-300"
                }`}
              />
              <ErrorMessage message={errors.name?.message as string} />
            </div>
          </div>
          <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-[var(--color-overviewTab)] z-10">
            <button
              disabled={isLoading}
              onClick={handleSubmit((d) => submit(d, false))}
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="px-6 py-3 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

import { Save, X } from "lucide-react";
import { useState } from "react";
import Loading from "../../ui/Loading";
import ErrorMessage from "../../ui/ErrorMessage";
import { store as storeBank } from "@/services/bank.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CreateBankAccountValidationSchema } from "@/validations/bank-account.validation";

type Props = {
  onClose: () => void;
  onSave?: () => Promise<void> | void;
};

export default function CreateBankAccount({ onClose, onSave }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CreateBankAccountValidationSchema),
  });

  const closeDailog = () => {
    onClose();
  };

  const submit = async (data: any, close = true) => {
    setServerErrors([]);
    setIsLoading(true);
    try {
      await storeBank(data);
      toast.success("Bank account saved");
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
  return (
    <div
      className="fixed inset-0  bg-opacity-50 flex items-center justify-end z-9999"
      onClick={() => closeDailog()}
    >
      <div
        className="bg-white shadow-xl w-full max-w-2xl h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-20">
          <h2 className="text-xl font-semibold text-gray-900">
            Create Bank Account
          </h2>
          <button
            onClick={() => closeDailog()}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit((d) => submit(d, true))}>
          <div className="p-6 space-y-6 pb-32">
            {serverErrors.length > 0 && (
              <div className="space-y-1">
                {serverErrors.map((s, i) => (
                  <ErrorMessage key={i} message={s} />
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Bank Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="Bank Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage message={errors.name?.message as string} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Account Number
              </label>
              <input
                {...register("account_number")}
                type="text"
                placeholder="Account Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage
                message={errors.account_number?.message as string}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                IBAN
              </label>
              <input
                {...register("iban")}
                type="text"
                placeholder="IBAN"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage message={errors.iban?.message as string} />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Note
              </label>
              <textarea
                {...register("note")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white z-10">
            <button
              disabled={isLoading}
              onClick={handleSubmit((d) => submit(d, false))}
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Save and New
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

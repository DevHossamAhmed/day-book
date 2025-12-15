import ErrorMessage from "@/components/ui/ErrorMessage";
import Loading from "@/components/ui/Loading";
import { store } from "@/services/user.service";
import { CreateMemberValidationSchema } from "@/validations/member.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Save, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  onClose: () => void;
  onSave: () => void;
};

export default function CreateMember({ onClose, onSave }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CreateMemberValidationSchema),
  });

  const closeDailog = () => {
    onClose();
  };

  const resetForm = () => {
    reset();
    setServerErrors([]);
  };

  const submit = async (data: any, close = true) => {
    setServerErrors([]);
    setIsLoading(true);
    try {
      await store(data);
      toast.success("Member saved successfully.");
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
      } else if (error instanceof Error &&
        "response" in error &&
        (error as any).response?.data?.error) {
        setServerErrors([(error as any).response?.data?.error]);
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
        className="bg-white shadow-xl w-full max-w-md h-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">Create Member</h2>
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
              <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-lg space-y-1 mb-4">
                {serverErrors.map((err, index) => (
                  <p key={index} className="text-sm">
                    • {err}
                  </p>
                ))}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  First Name*
                </label>
                <input
                  type="text"
                  id="first_name"
                  placeholder="Enter First Name"
                  {...register("first_name")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                />
                {errors.first_name && (
                  <ErrorMessage message={errors.first_name.message} />
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="last_name"
                  placeholder="Enter Last Name"
                  {...register("last_name")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                />
                {errors.last_name && (
                  <ErrorMessage message={errors.last_name.message} />
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Joining Date*
              </label>
              <div className="relative">
                <input
                  {...register("joining_date")}
                  type="date"
                  placeholder="Select date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <ErrorMessage
                message={errors.joining_date?.message as string}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Designation*
              </label>
              <input
                type="text"
                {...register("designation")}
                placeholder="Enter Designation"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage message={errors.designation?.message as string} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Salary Cycle*
              </label>
              <div className="relative">
                <select
                  {...register("salary_cycle")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select cycle</option>
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                </select>
                <ChevronDown className="absolute left-auto right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage message={errors.salary_cycle?.message as string} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Salary Amount*
              </label>
              <input
                type="text"
                {...register("salary_amount")}
                placeholder="Enter Salary amount"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage
                message={errors.salary_amount?.message as string}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Role*
              </label>
              <div className="relative">
                <select
                  {...register("role")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Account Manager">Account Manager</option>
                  <option value="Sales Person">Sales Person</option>
                  <option value="HR">HR</option>
                  <option value="Employee">Employee</option>
                </select>
                <ChevronDown className="absolute left-auto right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage message={errors.role?.message as string} />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm text-gray-900 placeholder-gray-400"
                placeholder="Enter your email"
              />
              {errors.email && (
                <ErrorMessage message={errors.email.message} />
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm text-gray-900 placeholder-gray-400"
                placeholder="Enter your password"
              />
              {errors.password && (
                <ErrorMessage message={errors.password.message} />
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Info
              </label>
              <textarea
                {...register("additional_info")}
                placeholder="Additional Info (optional)"
                //@ts-expect-error:row
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <ErrorMessage
                message={errors.additional_info?.message as string}
              />
            </div>
          </div>
          {/* Modal Footer */}
          <div className="p-6 border-t border-gray-200 flex justify-end gap-3 sticky bottom-0 bg-white z-10">
            <button
              disabled={isLoading}
              onClick={handleSubmit((d) => submit(d, false))}
              type="button"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  Save and New
                </>
              )}

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

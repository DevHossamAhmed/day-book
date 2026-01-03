import ErrorMessage from "@/components/ui/ErrorMessage";
import Loading from "@/components/ui/Loading";
import { CreateStoreValidationSchema } from "@/validations/store.validation";
import { store as storeStore } from "@/services/store.service";
import { fetchGetIdNameList } from "@/services/user.service";
import { MemberIdNameList } from "@/types/member";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  onClose: () => void;
  onSave: () => void;
};

export default function CreateStore({ onClose, onSave }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [members, setMembers] = useState<MemberIdNameList[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CreateStoreValidationSchema),
  });

  const closeDailog = () => {
    onClose();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetchGetIdNameList();
      setMembers(res.data);
    } catch (error) {
      toast.error("Failed to fetch members. Please try again later.");
    }
  };

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

      await storeStore(payload);
      toast.success("Store saved successfully.");
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
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-end z-9999">
      <div className="bg-white shadow-xl w-full max-w-2xl h-full overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">
            Create Source Channel
          </h2>
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
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Store Name*
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Enter store name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage message={errors.name?.message as string} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Sales Person*
              </label>
              <div className="relative">
                <select
                  {...register("sales_person_id")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  {members.map((member) => {
                    return (
                      <option key={member.id} value={member.id}>
                        {member.full_name}
                      </option>
                    );
                  })}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                message={errors.sales_person_id?.message as string}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Default Currency*
              </label>
              <div className="relative">
                <select
                  {...register("default_currency")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select</option>
                  <option value="usd">USD</option>
                  <option value="eur">EUR</option>
                  <option value="sar">SAR</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage
                message={errors.default_currency?.message as string}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Description (optional)"
                //@ts-expect-error:rows
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <ErrorMessage message={errors.description?.message as string} />
            </div>
          </div>
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

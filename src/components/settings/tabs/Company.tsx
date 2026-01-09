/* eslint-disable @typescript-eslint/no-explicit-any */
import ErrorMessage from "@/components/ui/ErrorMessage";
import Loading from "@/components/ui/Loading";
import { UpdateCompanyValidationSchema } from "@/validations/company.validation";
import { updateCompany, fetchOrganization } from "@/services/organization.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Save } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import FetchDataFromServer from "@/components/ui/FetchDataFromServer";
import ValidationServerErrors from "@/components/ui/ValidationServerErrors";

export default function Company() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [serverErrors, setServerErrors] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(UpdateCompanyValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      cr_number: "",
      tax_configuration: "",
      default_currency: "",
      financial_year_period: "",
      timezone: "",
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsFetching(true);
    try {
      const response = await fetchOrganization();
      const orgData = response.data;

      reset({
        name: orgData.name || "",
        email: orgData.email || "",
        address: orgData.address || "",
        cr_number: orgData.cr_number || "",
        tax_configuration: orgData.tax_configuration || "",
        default_currency: orgData.default_currency || "",
        financial_year_period: orgData.financial_year_period || "",
        timezone: orgData.timezone || "",
      });

    } catch (error) {
      toast.error("Failed to fetch organization details. Please try again later.");
    } finally {
      setIsFetching(false);
    }
  };


  const submit = async (data: any) => {
    setServerErrors([]);
    setIsLoading(true);
    try {
      await updateCompany(data);
      toast.success("Company settings updated successfully.");
      await fetchData();
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

  if (isFetching) {
    return (
      <FetchDataFromServer model="organization" />
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <div className="bg-[var(--color-overviewTab)] rounded-lg p-8 space-y-6">
          {serverErrors.length > 0 && (
            <ValidationServerErrors errors={serverErrors} />
          )}

          <div className="grid grid-cols-3 gap-6 items-start">
            <label className="text-sm font-medium ">
              Company Name<span className="text-red-500">*</span>
            </label>
            <div className="col-span-2">
              <input
                type="text"
                {...register("name")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage message={errors.name?.message as string} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 items-start">
            <label className="text-sm font-medium ">
              Email<span className="text-red-500">*</span>
            </label>
            <div className="col-span-2">
              <input
                type="text"
                {...register("email")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage message={errors.email?.message as string} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 items-start">
            <label className="text-sm font-medium ">Address</label>
            <div className="col-span-2">
              <textarea
                {...register("address")}
                //@ts-expect-error:rows
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <ErrorMessage message={errors.address?.message as string} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 items-start">
            <label className="text-sm font-medium ">
              CR number
            </label>
            <div className="col-span-2">
              <input
                type="text"
                {...register("cr_number")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage message={errors.cr_number?.message as string} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 items-start">
            <label className="text-sm font-medium ">
              Tax configuration
            </label>
            <div className="col-span-2">
              <input
                type="text"
                {...register("tax_configuration")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <ErrorMessage
                message={errors.tax_configuration?.message as string}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 items-start">
            <label className="text-sm font-medium ">
              Default Currency
            </label>
            <div className="col-span-2 relative">
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
              <ErrorMessage
                message={errors.default_currency?.message as string}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 items-start">
            <label className="text-sm font-medium ">
              Financial Year Start/End
            </label>
            <div className="col-span-2 relative">
              <select
                {...register("financial_year_period")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="jan-dec">January - December</option>
                <option value="apr-mar">April - March</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <ErrorMessage
                message={errors.financial_year_period?.message as string}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 items-start">
            <label className="text-sm font-medium ">Time Zone</label>
            <div className="col-span-2 relative">
              <select
                {...register("timezone")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select</option>
                <option value="gmt">GMT</option>
                <option value="est">EST</option>
                <option value="pst">PST</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <ErrorMessage message={errors.timezone?.message as string} />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-gray-200">
            <button
              disabled={isLoading}
              type="submit"
              className="px-6 py-3 bg-blue-600 cursor-pointer text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2"
            >
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

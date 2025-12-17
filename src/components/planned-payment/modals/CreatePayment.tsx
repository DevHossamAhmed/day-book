"use client";
import React, { useEffect, useState } from "react";
import { X, Calendar, ChevronDown, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreatePlannedPaymentValidationSchema } from "@/validations/planned-payment.validation";
import ErrorMessage from "@/components/ui/ErrorMessage";
import ValidationServerErrors from "@/components/ui/ValidationServerErrors";
import Loading from "@/components/ui/Loading";
import { PaymentMethod } from "@/data/payment-method";
import { fetchGetIdNameList } from "@/services/vendor.service";
import { VendorIdNameList } from "@/types/vendor";
import { store } from "@/services/planned-payment.service";
import toast from "react-hot-toast";

type Props = {
  onClose: () => void;
  onSave: () => void;
};

export default function CreatePayment({ onClose, onSave }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [vendors, setVendors] = useState<VendorIdNameList[]>([]);
  const [isLoadingVendors, setIsLoadingVendors] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(CreatePlannedPaymentValidationSchema),
    defaultValues: {
      due_date: new Date().toISOString().split("T")[0],
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoadingVendors(true);
      const vendorsRes = await fetchGetIdNameList();
      setVendors(vendorsRes.data);
    } catch (error) {
      toast.error("Failed to fetch vendors. Please try again later.");
    } finally {
      setIsLoadingVendors(false);
    }
  };

  const closeDialog = () => {
    onClose();
  };

  const submit = async (data: any, close = true) => {
    setServerErrors([]);
    setIsLoading(true);
    try {
      await store(data);
      toast.success("Planned payment created successfully!");
      if (onSave) await onSave();
      if (close) {
        closeDialog();
      } else {
        reset({
          due_date: new Date().toISOString().split("T")[0],
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
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/5 bg-opacity-50 z-40"
        onClick={closeDialog}
      />

      {/* Side Panel */}
      <div className="fixed top-0 right-0 h-full w-[560px] bg-white shadow-2xl z-9999 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Create Planned Payment
          </h2>
          <button
            onClick={closeDialog}
            className="p-1 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit((d) => submit(d, true))}>
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {serverErrors.length > 0 && (
              <ValidationServerErrors errors={serverErrors} />
            )}

            {/* Vendor */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Vendor <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  {...register("vendor_id")}
                  disabled={isLoadingVendors}
                  className={`w-full px-4 py-3 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.vendor_id ? "border-red-300" : "border-gray-300"
                    } ${isLoadingVendors ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                >
                  <option value="">
                    {isLoadingVendors ? "Loading..." : "Select vendor"}
                  </option>
                  {vendors.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <ErrorMessage message={errors.vendor_id?.message as string} />
            </div>

            {/* Purpose */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Purpose <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("purpose")}
                placeholder="Enter purpose"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.purpose ? "border-red-300" : "border-gray-300"
                  }`}
              />
              <ErrorMessage message={errors.purpose?.message as string} />
            </div>

            {/* Amount */}
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

            {/* Due Date and Payment Method */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    {...register("due_date")}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.due_date ? "border-red-300" : "border-gray-300"
                      }`}
                  />
                  <Calendar className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
                <ErrorMessage message={errors.due_date?.message as string} />
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
                <ErrorMessage
                  message={errors.payment_method?.message as string}
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  {...register("status")}
                  className={`w-full px-4 py-3 border rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white ${errors.status ? "border-red-300" : "border-gray-300"
                    }`}
                >
                  <option value="">Select status</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
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
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <ErrorMessage message={errors.note?.message as string} />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3 sticky bottom-0 bg-white z-10">
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
    </>
  );
}

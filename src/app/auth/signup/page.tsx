"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { listProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import { ChevronRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { CreateOrganizationValidationSchema } from "@/validations/organization.validation";
import { Store } from "@/services/organization.service";
import toast from "react-hot-toast";
import axios from "axios";
import { CapitalizeFirst } from "@/lib/utils/string.util";
import { useRouter } from "next/navigation";

const SignupPage = () => {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(CreateOrganizationValidationSchema),
  });

  useEffect(() => {
    async function fetchProducts() {
      const res = await listProducts();
      setProducts(res || []);
    }
    fetchProducts();
  }, []);

  const onSubmit = async (form: any) => {
    try {
      setIsLoading(true);
      await Store({ ...form, plan_id: 1 });
      toast.success(`Organization created successfully.`);
      router.push("/auth/signin");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          toast.error(`${CapitalizeFirst(error.response?.data?.error)}.` || "Something went wrong.");
        } else {
          toast.error("Failed to store organization. Please try again later.");
        }
      } else {
        toast.error("Unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex p-9">
      <div className="hidden lg:flex lg:w-1/2 bg-black items-center justify-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-8 z-10 px-8">
              <h1 className="text-white text-[18px] font-medium max-w-md mx-auto leading-relaxed">
                Start your daily income and expenses records in one place
              </h1>
              <div className="relative max-w-2xl mx-auto">
                {/* Dashboard preview image placeholder */}
                <Image
                  src="/assets/images/leftsideLogin2.png"
                  alt="Dashboard Preview"
                  width={800}
                  height={600}
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md px-4">
          <div className="mb-12">
            <div className="flex items-center justify-start gap-2.5 mb-2">
              <Image
                src="/assets/images/Logo.png"
                alt="Company Logo"
                width={160}
                height={45}
                className="ml-[-50px] w-auto h-auto"
                priority
              />
            </div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Get started
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Product
                </label>
                <div className="relative">
                  <select
                    {...register("product_id")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                  >
                    <option value="0">Select Product</option>
                    {products.map((product) => (
                      <option key={product.id} value={Number(product.id)}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                    <ChevronRight size={20} className="rotate-90" />
                  </div>
                </div>
                <ErrorMessage message={errors.product_id?.message} />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company name
                </label>
                <input
                  type="text"
                  id="company"
                  {...register("name")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm text-gray-900 placeholder-gray-400"
                  placeholder="Enter your company name as per document"
                />
                <ErrorMessage message={errors.name?.message} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    placeholder="Enter First Name"
                    {...register("first_name")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                  />
                  <ErrorMessage message={errors.first_name?.message} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    placeholder="Enter Last Name"
                    {...register("last_name")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                  />
                  <ErrorMessage message={errors.last_name?.message} />
                </div>
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
                <ErrorMessage message={errors.email?.message} />
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
                <ErrorMessage message={errors.password?.message} />
              </div>
              <div>
                <div className="flex items-start pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("agree_terms")}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600 cursor-pointer mt-0.5"
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2.5 text-sm text-gray-600 cursor-pointer"
                  >
                    By signing up, you agree to our{" "}
                    <a href="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>
                    .
                  </label>
                </div>
                <ErrorMessage message={errors.agree_terms?.message} />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 mt-6
               }`}
              >
                {isLoading ? <Loading /> : "Continue"}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Do you have an account?{" "}
              <a
                href="/auth/signin"
                className="text-blue-600 hover:underline font-semibold"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

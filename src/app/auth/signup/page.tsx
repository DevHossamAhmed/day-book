"use client"
import React, { useEffect, useState } from "react";
import logo from "../../../../public/assets/images/Logo.png";
import sidePic from "../../../../public/assets/images/leftsideLogin2.png";
import Image from "next/image";
import { listProducts } from "@/services/product.service";
import { Product } from "@/types/product";
import { ChevronRight } from "lucide-react";
import { set, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/components/ui/Loading";
import ErrorMessage from "@/components/ui/ErrorMessage";

const formSchema = z.object({
  product: z.string().min(1, "Please select a product"),
  company: z.string().min(2, "Company name is required"),
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().min(2, "Last name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Min 6 characters"),
  agree_terms: z.boolean().refine(val => val === true, {
    message: "You must agree to the Terms of Service",
  }),
});

const SignupPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    async function fetchProducts() {
      const res = await listProducts();
      setProducts(res || []);
    }
    fetchProducts();
  }, []);

  const onSubmit = (data: any) => {
    setIsLoading(true);
    console.log(data);
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
                  src={sidePic}
                  alt="Dashboard Preview"
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
              <Image src={logo} alt="Company Logo" className="ml-[-50px]"></Image>
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
                  <select  {...register("product")} className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                    <option value="">Select Product</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-3 text-gray-400 pointer-events-none">
                    <ChevronRight size={20} className="rotate-90" />
                  </div>
                </div>
                {errors.product && (
                  <ErrorMessage message={errors.product.message} />
                )}
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company name
                </label>
                <input
                  type="text"
                  id="company"
                  {...register("company")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm text-gray-900 placeholder-gray-400"
                  placeholder="Enter your company name as per document"
                />
                {errors.company && (
                  <ErrorMessage message={errors.company.message} />
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">First Name</label>
                  <input
                    type="text"
                    id="first_name"
                    placeholder="Enter First Name"
                    {...register("first_name")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                  />
                  {errors.first_name && <ErrorMessage message={errors.first_name.message} />}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Last Name</label>
                  <input
                    type="text"
                    id="last_name"
                    placeholder="Enter Last Name"
                    {...register("last_name")}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-500"
                  />
                  {errors.last_name && <ErrorMessage message={errors.last_name.message} />}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm text-gray-900 placeholder-gray-400"
                  placeholder="Enter your email"
                />
                {errors.email && <ErrorMessage message={errors.email.message} />}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
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
                <div className="flex items-start pt-2">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("agree_terms")}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600 cursor-pointer mt-0.5"
                  />
                  <label htmlFor="terms" className="ml-2.5 text-sm text-gray-600 cursor-pointer">
                    By signing up, you agree to our{" "}
                    <a href="/terms" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>
                    .
                  </label>
                </div>
                {errors.agree_terms && (
                  <ErrorMessage message={errors.agree_terms.message} />
                )}
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 mt-6
               }`}
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Do you have an account?{" "}
              <a href="/auth/signin" className="text-blue-600 hover:underline font-semibold">
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
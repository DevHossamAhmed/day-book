"use client"
import React, { useEffect, useState } from "react";
import logo from "../../../../public/assets/images/Logo.png";
import sidePic from "../../../../public/assets/images/leftsideLogin2.png";
import Image from "next/image";
import { listProducts } from "@/services/product.service";
import { Product } from "@/types/product";


const SignupPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState("This is product name");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      const res = await listProducts();
      setProducts(res || []);
    }
    fetchProducts();
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      console.log({ productName, companyName, email, password, agreeToTerms });
      setIsLoading(false);
    }, 1000);
  };

  const isFormValid = companyName.trim() !== "" && email.trim() !== "" && password.trim() !== "" && agreeToTerms;

  return (
    <div className="min-h-screen flex p-9">
      {/* Left Side - Image Background */}
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

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md px-4">
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center justify-start gap-2.5 mb-2">
              <Image src={logo} alt="Company Logo" className="ml-[-50px]"></Image>
            </div>

            <h2 className="text-3xl font-semibold text-gray-900">
              Get started
            </h2>
          </div>

          <div className="space-y-5">
            {/* Product Field */}
            <div>
              <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-2">
                Product
              </label>
              <input
                type="text"
                id="product"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-500 cursor-not-allowed"
                disabled
              />
            </div>

            {/* Company Name Field */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                Company name
              </label>
              <input
                type="text"
                id="company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm text-gray-900 placeholder-gray-400"
                placeholder="Enter your company name as per document"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm text-gray-900 placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm text-gray-900 placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start pt-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
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

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className={`w-full text-white py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 mt-6
                ${isFormValid && !isLoading
                  ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Continue"
              )}
            </button>
          </div>

          {/* Footer Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:underline font-semibold">
                Get started
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
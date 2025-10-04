"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";
import Logo from "../../../../public/assets/images/Logo.png";

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      console.log({ email, password, rememberMe });
      router.push("/dashboard");
    }, 1000);
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9ff] via-white to-[#f0f4ff] flex items-center justify-center p-4">
      <div className="w-full max-w-[480px]">
        <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 border border-gray-100">
          <div className="mb-8 flex justify-center">
            <Image
              src={Logo}
              alt="Logo"
              width={160}
              height={45}
              className="w-auto h-auto"
            />
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Sign in to your account
            </h2>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400 text-lg" />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1520eb] focus:border-transparent outline-none transition-all text-[15px]"
                  placeholder="example@company.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400 text-lg" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1520eb] focus:border-transparent outline-none transition-all text-[15px]"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <FiEyeOff className="text-lg" />
                  ) : (
                    <FiEye className="text-lg" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#1520eb] border-gray-300 rounded focus:ring-[#1520eb] cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-700 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-[#1520eb] hover:text-[#0f16c7] font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className={`w-full text-white py-3 rounded-lg font-medium text-[15px] transition-all duration-200 
                ${
                  isFormValid && !isLoading
                    ? "bg-[#1520eb] hover:bg-[#0f16c7] shadow-lg shadow-[#1520eb]/20 hover:shadow-xl hover:shadow-[#1520eb]/30 cursor-pointer"
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
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>

          </form>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          By signing in, you agree to our{" "}
          <Link href="/terms" className="text-[#1520eb] hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-[#1520eb] hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
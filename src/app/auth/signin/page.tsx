"use client";
import React, { useState } from "react";
import logo from "../../../../public/assets/images/Logo.png";
import sidePic from "../../../../public/assets/images/leftsideLogin2.png";
import Image from "next/image";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      console.log({ email, password, rememberMe });
      window.location.href = "/dashboard";
      setIsLoading(false);
    }, 1000);
  };

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  return (
    <div className="min-h-screen flex p-9">
      {/* Left Side - Image Background */}
      <div className="hidden lg:flex lg:w-1/2 bg-black/98 items-center justify-center p-16 relative overflow-hidden">
        {/* Background image would go here using Next.js Image component */}
        <div className="absolute inset-0 bg-black/40">
          {/* Placeholder for your background image */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-8 z-10 px-8">
              <h1 className="text-white text-[18px] font-medium max-w-md mx-auto leading-relaxed">
                Your daily sales and payments, organized in one place
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

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md px-4">
          {/* Logo */}
          <div className="mb-8">
            <div className="flex items-center justify-start gap-2.5 mb-2">
              <Image src={logo} alt="logo" className="ml-[-50px] "></Image>
            </div>

            <h2 className="text-3xl font-semibold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="space-y-6">
            {/* Email Field */}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm text-gray-900 placeholder-gray-400"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all text-sm text-gray-900 placeholder-gray-400"
                placeholder="Enter your password"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center pt-1">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-600 cursor-pointer"
              />
              <label
                htmlFor="remember"
                className="ml-2.5 text-sm text-gray-700 cursor-pointer"
              >
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className={`w-full text-white py-3.5 rounded-lg font-semibold text-sm transition-all duration-200 mt-4
                ${
                  isFormValid && !isLoading
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
                  Signing in...
                </span>
              ) : (
                "Continue"
              )}
            </button>

            {/* Terms Text */}
            <p className="text-center text-xs text-gray-500 pt-3">
              By signing in, you agree to our{" "}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>
              .
            </p>
          </div>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/auth/signup"
                className="text-blue-600 hover:underline font-semibold"
              >
                Get started
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

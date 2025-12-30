"use client"
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import PageTitle from "@/components/ui/PageTitle";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { ChangePasswordValidationSchema } from "@/validations/change-password.validation";
import { UpdateProfileValidationSchema } from "@/validations/update-profile.validation";
import { changePassword, updateProfile, fetchProfile } from "@/services/user.service";
import { useTheme } from "@/contexts/ThemeContext";
import { extractErrorMessages } from "@/lib/utils/error.util";

const UserProfilePage = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState("update-profile");
  
  // Update Profile State
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [profileErrors, setProfileErrors] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<string>('https://api.dicebear.com/7.x/avataaars/svg?seed=Benjamin');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileFormErrors },
    reset: resetProfileForm,
  } = useForm({
    resolver: zodResolver(UpdateProfileValidationSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      designation: "",
      additional_info: "",
    },
  });

  // Track if profile has been loaded to prevent unnecessary reloads
  const hasLoadedProfile = useRef(false);

  // Fetch current user profile data
  useEffect(() => {
    const loadProfile = async () => {
      // Prevent multiple simultaneous loads
      if (hasLoadedProfile.current || !session) return;
      
      try {
        hasLoadedProfile.current = true;
        setIsLoadingProfile(true);
        const profileData = await fetchProfile();
        
        // Populate form with fetched data
        const sessionUser = session?.user as { email?: string; name?: string } | undefined;
        resetProfileForm({
          first_name: profileData.first_name || "",
          last_name: profileData.last_name || "",
          email: profileData.email || sessionUser?.email || "",
          designation: profileData.designation || "",
          additional_info: profileData.additional_info || "",
        });
        
        // Set avatar if available
        if (profileData.avatar) {
          setAvatar(profileData.avatar);
        }
      } catch (error) {
        // If fetch fails, use session data as fallback
        const sessionUser = session?.user as { email?: string; name?: string } | undefined;
        if (sessionUser) {
          const fullName = sessionUser.name || "";
          const nameParts = fullName.split(" ");
          resetProfileForm({
            first_name: nameParts[0] || "",
            last_name: nameParts.slice(1).join(" ") || "",
            email: sessionUser.email || "",
            designation: "",
            additional_info: "",
          });
        }
        console.error("Failed to load profile:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    if (session) {
      loadProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);
  
  // Change Password State
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordFormErrors },
    reset: resetPasswordForm,
    watch: watchPassword,
  } = useForm<{
    current_password: string;
    password: string;
    confirm_password?: string;
  }>({
    resolver: zodResolver(ChangePasswordValidationSchema),
  });

  const newPasswordValue = watchPassword("password");
  
  // Appearance State - use ThemeContext
  const { theme, setTheme: setThemeFromContext } = useTheme();

  // Helper function to parse error messages
  const parseErrorMessage = useCallback((error: unknown): string[] => {
    return extractErrorMessages(error);
  }, []);

  const handleProfileUpdate = useCallback(async (data: {
    first_name: string;
    last_name: string;
    email: string;
    designation: string;
    additional_info?: string | null;
  }) => {
    try {
      setProfileErrors([]);
      setIsUpdatingProfile(true);

      await updateProfile({
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        designation: data.designation,
        additional_info: data.additional_info || null,
        avatar: avatarFile,
      });

      toast.success("Profile updated successfully!");
      
      // Clear avatar file after successful upload
      setAvatarFile(null);
      hasLoadedProfile.current = false; // Allow reload after update
      
      // Reload profile data after successful update
      try {
        const updatedProfile = await fetchProfile();
        resetProfileForm({
          first_name: updatedProfile.first_name || "",
          last_name: updatedProfile.last_name || "",
          email: updatedProfile.email || "",
          designation: updatedProfile.designation || "",
          additional_info: updatedProfile.additional_info || "",
        });
        // Update avatar preview if URL is returned
        if (updatedProfile.avatar) {
          setAvatar(updatedProfile.avatar);
        }
      } catch (error) {
        // Silently fail - profile was updated successfully
        console.error("Failed to reload profile:", error);
      }
    } catch (error) {
      const errors = parseErrorMessage(error);
      setProfileErrors(errors);
      if (errors.length > 0) {
        toast.error(errors[0]);
      }
    } finally {
      setIsUpdatingProfile(false);
    }
  }, [avatarFile, resetProfileForm, parseErrorMessage]);

  const handleAvatarUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 1024) {
      toast.error('File size must be less than 1MB');
      return;
    }

    // Store the file for upload
    setAvatarFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setAvatar(reader.result as string);
      }
    };
    reader.onerror = () => {
      toast.error('Failed to read image file');
    };
    reader.readAsDataURL(file);
  }, []);

  const tabs = useMemo(() => [
    { id: "update-profile", label: "Update Profile" },
    { id: "change-password", label: "Change Password" },
    { id: "appearance", label: "Appearance" },
  ], []);

  const handlePasswordChange = useCallback(async (data: {
    current_password: string;
    password: string;
    confirm_password?: string;
  }) => {
    try {
      setPasswordErrors([]);
      setIsChangingPassword(true);

      await changePassword({
        current_password: data.current_password,
        password: data.password,
      });

      toast.success("Password changed successfully!");
      resetPasswordForm();
    } catch (error) {
      const errors = parseErrorMessage(error);
      setPasswordErrors(errors);
      if (errors.length > 0) {
        toast.error(errors[0]);
      }
    } finally {
      setIsChangingPassword(false);
    }
  }, [resetPasswordForm, parseErrorMessage]);

  const handleAppearanceSave = useCallback(() => {
    // Theme is already saved via ThemeContext
    toast.success('Appearance settings saved successfully!');
  }, []);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const breadcrumbs = useMemo(() => [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Profile" }
  ], []);

  const themeOptions = useMemo(() => [
    { value: 'light' as const, label: 'Light', description: 'Light mode' },
    { value: 'dark' as const, label: 'Dark', description: 'Dark mode' },
  ], []);

  return (
    <div>
      <PageTitle 
        title="User Profile"
        breadcrumbs={breadcrumbs}
      />

      {/* Tabs Navigation */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 -mx-6 -mt-6 mb-6">
        <div className="px-6">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`px-1 py-4 font-semibold text-sm transition-all relative whitespace-nowrap border-b-2 ${
                    isActive
                      ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                      : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div>
        {/* Update Profile Tab */}
        {activeTab === "update-profile" && (
          <div>
            {isLoadingProfile ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6">
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">Loading profile...</p>
                  </div>
                </div>
              </div>
            ) : (
            <form onSubmit={handleProfileSubmit(handleProfileUpdate)}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-6">
                {/* Server Error Messages */}
                {profileErrors.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <ul className="list-disc list-inside space-y-1">
                      {profileErrors.map((error, index) => (
                        <li key={index} className="text-sm text-red-600 dark:text-red-400">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* First Name Field */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-32 pt-3">
                    First Name<span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1">
                    <input
                      {...registerProfile("first_name")}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Enter your first name"
                    />
                    <ErrorMessage message={profileFormErrors.first_name?.message as string} />
                  </div>
                </div>

                {/* Last Name Field */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-32 pt-3">
                    Last Name<span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1">
                    <input
                      {...registerProfile("last_name")}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Enter your last name"
                    />
                    <ErrorMessage message={profileFormErrors.last_name?.message as string} />
                  </div>
                </div>

                {/* Email Field */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-32 pt-3">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1">
                    <input
                      {...registerProfile("email")}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage message={profileFormErrors.email?.message as string} />
                  </div>
                </div>

                {/* Designation Field */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-32 pt-3">
                    Designation<span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1">
                    <input
                      {...registerProfile("designation")}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Enter your designation"
                    />
                    <ErrorMessage message={profileFormErrors.designation?.message as string} />
                  </div>
                </div>

                {/* Avatar Field */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <div className="sm:w-32">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Avatar</label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      JPG, GIF or PNG. 1MB Max.
                    </p>
                  </div>
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative">
                      <img
                        src={avatar}
                        alt="Avatar"
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                      />
                    </div>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/gif"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                      <span className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Upload Avatar
                      </span>
                    </label>
                  </div>
                </div>

                {/* Additional Info Field */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-32 pt-3">
                    Additional Info
                  </label>
                  <div className="flex-1">
                    <textarea
                      {...registerProfile("additional_info")}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                    <ErrorMessage message={profileFormErrors.additional_info?.message as string} />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdatingProfile || isLoadingProfile}
                  className={`px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                    isUpdatingProfile || isLoadingProfile
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  }`}
                >
                  {isUpdatingProfile ? "Updating Profile..." : "Save Changes"}
                </button>
              </div>
            </form>
            )}
          </div>
        )}

        {/* Change Password Tab */}
        {activeTab === "change-password" && (
          <div>
            <form onSubmit={handlePasswordSubmit(handlePasswordChange)}>
              <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-6">
                {/* Server Error Messages */}
                {passwordErrors.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <ul className="list-disc list-inside space-y-1">
                      {passwordErrors.map((error, index) => (
                        <li key={index} className="text-sm text-red-600 dark:text-red-400">
                          {error}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Current Password */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-32 pt-3">
                    Current Password<span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1">
                    <input
                      {...registerPassword("current_password")}
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Enter current password"
                    />
                    <ErrorMessage message={passwordFormErrors.current_password?.message as string} />
                  </div>
                </div>

                {/* New Password */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-32 pt-3">
                    New Password<span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1">
                    <input
                      {...registerPassword("password")}
                      type="password"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Enter new password (min. 8 characters)"
                    />
                    <ErrorMessage message={passwordFormErrors.password?.message as string} />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Must contain at least one uppercase letter, one lowercase letter, and one number
                    </p>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-32 pt-3">
                    Confirm Password<span className="text-red-500">*</span>
                  </label>
                  <div className="flex-1">
                    <input
                      type="password"
                      {...registerPassword("confirm_password", {
                        validate: (value) =>
                          value === newPasswordValue || "Passwords do not match",
                      })}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-gray-100 dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="Confirm new password"
                    />
                    <ErrorMessage
                      message={
                        passwordFormErrors.confirm_password?.message as string
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className={`px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                    isChangingPassword
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  }`}
                >
                  {isChangingPassword ? "Changing Password..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === "appearance" && (
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 space-y-6">
              {/* Theme Selection */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 sm:w-32 pt-3">
                  Theme
                </label>
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    {themeOptions.map((themeOption) => {
                      const isSelected = theme === themeOption.value;
                      
                      return (
                        <button
                          key={themeOption.value}
                          onClick={() => setThemeFromContext(themeOption.value)}
                          className={`p-4 border-2 rounded-lg transition-all ${
                            isSelected
                              ? 'border-blue-600 dark:border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 capitalize mb-1">
                            {themeOption.label}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {themeOption.description}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleAppearanceSave}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Save Appearance Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
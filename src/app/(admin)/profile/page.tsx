/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import PageTitle from "@/components/ui/PageTitle";

const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("update-profile");
  
  // Update Profile State
  const [name, setName] = useState('Benjamin Canac');
  const [email, setEmail] = useState('ben@nuxtlabs.com');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=Benjamin');
  const [hasChanges, setHasChanges] = useState(false);
  
  // Change Password State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Security/2FA State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  
  // Appearance State
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  const handleSaveChanges = () => {
    setHasChanges(false);
    // Show success message
    alert('Changes saved successfully!');
  };

  const handleAvatarUpload = (e: { target: { files: any[]; }; }) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        alert('File size must be less than 1MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        //@ts-expect-error:res
        setAvatar(reader.result);
        setHasChanges(true);
      };
      reader.readAsDataURL(file);
    }
  };
//@ts-expect-error:setter
  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setHasChanges(true);
  };

  const tabs = [
    { id: "update-profile", label: "Update Profile" },
    { id: "change-password", label: "Change Password" },
    { id: "security", label: "Security" },
    { id: "appearance", label: "Appearance" },
  ];

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    // TODO: Implement password change logic
    alert('Password changed successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSecuritySave = () => {
    // TODO: Implement 2FA toggle logic
    alert(twoFactorEnabled ? '2FA enabled successfully!' : '2FA disabled successfully!');
  };

  const handleAppearanceSave = () => {
    // TODO: Implement appearance settings save logic
    alert('Appearance settings saved successfully!');
  };

  return (
    <div>
      <PageTitle 
        title="User Profile"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Profile" }
        ]}
      />

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-gray-200 -mx-6 -mt-6 mb-6">
        <div className="px-6">
          <div className="flex gap-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-1 py-4 font-semibold text-sm transition-all relative whitespace-nowrap border-b-2 ${
                  activeTab === tab.id
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div>
        {/* Update Profile Tab */}
        {activeTab === "update-profile" && (
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
              {/* Name Field */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <label className="text-sm font-medium text-gray-700 sm:w-32 pt-3">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={handleInputChange(setName)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <label className="text-sm font-medium text-gray-700 sm:w-32 pt-3">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                  placeholder="Enter your email"
                />
              </div>

              {/* Avatar Field */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="sm:w-32">
                  <label className="text-sm font-medium text-gray-700">Avatar</label>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, GIF or PNG. 1MB Max.
                  </p>
                </div>
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative">
                    <img
                      src={avatar}
                      alt="Avatar"
                      className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                    />
                  </div>
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/gif"
                      //@ts-expect-error:onchange
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                    <span className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      Upload Avatar
                    </span>
                  </label>
                </div>
              </div>

              {/* Bio Field */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <label className="text-sm font-medium text-gray-700 sm:w-32 pt-3">
                  Bio
                </label>
                <textarea
                  value={bio}
                  onChange={handleInputChange(setBio)}
                  rows={6}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSaveChanges}
                disabled={!hasChanges}
                className={`px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                  hasChanges
                    ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    : 'bg-blue-400 cursor-not-allowed'
                }`}
              >
                Save changes
              </button>
            </div>
          </div>
        )}

        {/* Change Password Tab */}
        {activeTab === "change-password" && (
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
              {/* Current Password */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <label className="text-sm font-medium text-gray-700 sm:w-32 pt-3">
                  Current Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                  placeholder="Enter current password"
                />
              </div>

              {/* New Password */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <label className="text-sm font-medium text-gray-700 sm:w-32 pt-3">
                  New Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                  placeholder="Enter new password (min. 8 characters)"
                />
              </div>

              {/* Confirm Password */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <label className="text-sm font-medium text-gray-700 sm:w-32 pt-3">
                  Confirm Password<span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handlePasswordChange}
                disabled={!currentPassword || !newPassword || !confirmPassword}
                className={`px-6 py-3 rounded-lg font-medium text-white transition-all duration-200 ${
                  currentPassword && newPassword && confirmPassword
                    ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                    : 'bg-blue-400 cursor-not-allowed'
                }`}
              >
                Change Password
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
              {/* 2FA Section */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="sm:w-32">
                  <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                  <p className="text-xs text-gray-500 mt-1">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Enable 2FA</h3>
                      <p className="text-sm text-gray-600">
                        {twoFactorEnabled 
                          ? 'Two-factor authentication is currently enabled'
                          : 'Two-factor authentication is currently disabled'}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={twoFactorEnabled}
                        onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  {twoFactorEnabled && (
                    <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Next steps:</strong> Scan the QR code with your authenticator app to complete setup.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSecuritySave}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Save Security Settings
              </button>
            </div>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === "appearance" && (
          <div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">
              {/* Theme Selection */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <label className="text-sm font-medium text-gray-700 sm:w-32 pt-3">
                  Theme
                </label>
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-4">
                    {['light', 'dark', 'system'].map((themeOption) => (
                      <button
                        key={themeOption}
                        onClick={() => setTheme(themeOption)}
                        className={`p-4 border-2 rounded-lg transition-all ${
                          theme === themeOption
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm font-semibold text-gray-900 capitalize mb-1">
                          {themeOption}
                        </div>
                        <div className="text-xs text-gray-600">
                          {themeOption === 'system' 
                            ? 'Follow system preference'
                            : themeOption === 'light'
                            ? 'Light mode'
                            : 'Dark mode'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Language Selection */}
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <label className="text-sm font-medium text-gray-700 sm:w-32 pt-3">
                  Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900"
                >
                  <option value="en">English</option>
                  <option value="ar">Arabic</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                </select>
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